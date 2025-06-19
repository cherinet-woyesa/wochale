import { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Timestamp
} from "firebase/firestore";

export default function TutorAssignments() {
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", classId: "" });

  const fetchClasses = async () => {
    const q = query(collection(db, "classes"), where("tutorId", "==", auth.currentUser.uid));
    const snap = await getDocs(q);
    setClasses(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.classId) return alert("Fill all fields.");
    await addDoc(collection(db, "assignments"), {
      ...form,
      tutorId: auth.currentUser.uid,
      createdAt: Timestamp.now(),
    });
    alert("Assignment created!");
    setForm({ title: "", description: "", classId: "" });
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">📘 Create Assignment</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <select
          value={form.classId}
          onChange={(e) => setForm({ ...form, classId: e.target.value })}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Class</option>
          {classes.map(cls => (
            <option key={cls.id} value={cls.id}>{cls.title}</option>
          ))}
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
      </form>
    </div>
  );
}
