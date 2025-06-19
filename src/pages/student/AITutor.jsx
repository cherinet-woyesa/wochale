// src/pages/student/AITutor.jsx
import { useState } from "react";
import axios from "axios";

export default function AITutor() {
  const [messages, setMessages] = useState([{ role: "assistant", content: "Hi! Ask me anything you're learning today 😊" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: newMessages,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const reply = response.data.choices[0].message;
      setMessages((prev) => [...prev, reply]);
    } catch (error) {
      console.error("OpenAI error:", error.message);
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I couldn't respond. Try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🎓 AI Tutor</h2>
      <div className="border rounded h-[400px] overflow-y-auto p-4 bg-gray-50 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-3 ${msg.role === "user" ? "text-right" : "text-left"}`}>
            <div className={`inline-block p-3 rounded ${msg.role === "user" ? "bg-blue-100" : "bg-green-100"}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <p className="text-gray-500 italic">Typing...</p>}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border p-2 rounded"
          placeholder="Ask something..."
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Send
        </button>
      </form>
    </div>
  );
}
