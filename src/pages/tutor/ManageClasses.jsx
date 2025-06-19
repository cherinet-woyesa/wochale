import { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";

export default function ManageClasses() {
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", price: "" });
  const [editId, setEditId] = useState(null);

  const fetchClasses = async () => {
    const q = query(collection(db, "classes"), where("tutorId", "==", auth.currentUser.uid));
    const snapshot = await getDocs(q);
    setClasses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.price) return alert("All fields required.");

    if (editId) {
      await updateDoc(doc(db, "classes", editId), {
        ...form,
        price: parseFloat(form.price),
      });
      setEditId(null);
    } else {
      await addDoc(collection(db, "classes"), {
        ...form,
        price: parseFloat(form.price),
        tutorId: auth.currentUser.uid,
        createdAt: Timestamp.now(),
      });
    }

    setForm({ title: "", description: "", price: "" });
    fetchClasses();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      await deleteDoc(doc(db, "classes", id));
      fetchClasses();
    }
  };

  const handleEdit = (cls) => {
    setForm({ title: cls.title, description: cls.description, price: cls.price });
    setEditId(cls.id);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">📋 Manage My Classes</h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mb-10">
        <input
          type="text"
          placeholder="Class Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Class Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Price ($)"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editId ? "Update Class" : "Create Class"}
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-4">My Classes</h3>
      {classes.map((cls) => (
        <div key={cls.id} className="border p-4 mb-4 rounded bg-white shadow">
          <h4 className="font-bold text-lg">{cls.title}</h4>
          <p>{cls.description}</p>
          <p className="text-gray-600">${cls.price}</p>
          <div className="space-x-2 mt-2">
            <button onClick={() => handleEdit(cls)} className="text-blue-600 underline">
              Edit
            </button>
            <button onClick={() => handleDelete(cls.id)} className="text-red-600 underline">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
