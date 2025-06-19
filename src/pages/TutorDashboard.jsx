import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

export default function TutorDashboard() {
  const [classes, setClasses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const fetchClasses = async () => {
    const q = query(collection(db, "classes"), where("tutorId", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setClasses(data);
  };

  const handleAddClass = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "classes"), {
        tutorId: auth.currentUser.uid,
        title,
        description,
        price: Number(price),
        createdAt: new Date(),
      });
      setTitle(""); setDescription(""); setPrice("");
      fetchClasses(); // refresh list
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className="p-8">
        <Link
  to={`/chat/${booking.studentId}`}
  className="text-blue-600 underline block mt-2"
>
  Chat with Student
</Link>
      <h2 className="text-2xl font-bold mb-4">Your Classes</h2>

      <form onSubmit={handleAddClass} className="space-y-4 max-w-md mb-8">
        <input type="text" placeholder="Class Title" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 w-full" required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 w-full" required />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="border p-2 w-full" required />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Add Class</button>
      </form>

      <div className="space-y-4">
        {classes.map((cls) => (
          <div key={cls.id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{cls.title}</h3>
            <p>{cls.description}</p>
            <p className="text-gray-600">Price: ${cls.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
