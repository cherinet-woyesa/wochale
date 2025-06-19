import { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  Timestamp,
} from "firebase/firestore";

export default function StudentAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [answerMap, setAnswerMap] = useState({});

  const fetchAssignments = async () => {
    const q = query(collection(db, "bookings"), where("studentId", "==", auth.currentUser.uid));
    const bSnap = await getDocs(q);
    const classIds = bSnap.docs.map(doc => doc.data().classId);

    const aQuery = query(collection(db, "assignments"));
    const aSnap = await getDocs(aQuery);
    const result = aSnap.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(a => classIds.includes(a.classId));

    setAssignments(result);
  };

  const handleSubmit = async (assignmentId) => {
    const answerText = answerMap[assignmentId]?.trim();
    if (!answerText) return alert("Answer is empty.");
    await addDoc(collection(db, "submissions"), {
      assignmentId,
      studentId: auth.currentUser.uid,
      answerText,
      submittedAt: Timestamp.now(),
    });
    alert("Submitted!");
    setAnswerMap({ ...answerMap, [assignmentId]: "" });
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">📑 My Assignments</h2>
      {assignments.map((a) => (
        <div key={a.id} className="border p-4 rounded mb-4 bg-white">
          <h3 className="font-semibold">{a.title}</h3>
          <p className="mb-2">{a.description}</p>
          <textarea
            placeholder="Your answer..."
            value={answerMap[a.id] || ""}
            onChange={(e) => setAnswerMap({ ...answerMap, [a.id]: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <button
            onClick={() => handleSubmit(a.id)}
            className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
          >
            Submit
          </button>
        </div>
      ))}
    </div>
  );
}
