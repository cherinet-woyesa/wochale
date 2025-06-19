import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { db, auth } from "../../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";

export default function ChatPage() {
  const { partnerId } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [partner, setPartner] = useState(null);
  const messagesEndRef = useRef();

  const currentUser = auth.currentUser;
  const conversationId = [currentUser.uid, partnerId].sort().join("_");

  const sendMessage = async () => {
    if (!text.trim()) return;
    const chatRef = collection(db, "messages", conversationId, "chats");

    await addDoc(chatRef, {
      senderId: currentUser.uid,
      receiverId: partnerId,
      text: text.trim(),
      createdAt: serverTimestamp(),
    });

    setText("");
  };

  useEffect(() => {
    const q = query(
      collection(db, "messages", conversationId, "chats"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  }, [conversationId]);

  useEffect(() => {
    const fetchPartner = async () => {
      const ref = doc(db, "users", partnerId);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setPartner(snap.data());
      }
    };
    fetchPartner();
  }, [partnerId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">
        💬 Chat with {partner?.name || partner?.email}
      </h2>

      <div className="border p-4 rounded h-96 overflow-y-scroll bg-gray-100 mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 p-2 rounded max-w-xs ${
              msg.senderId === currentUser.uid
                ? "bg-blue-500 text-white ml-auto"
                : "bg-white text-black"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
