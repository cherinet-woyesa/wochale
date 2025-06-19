import { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc
} from "firebase/firestore";

export default function TutorStats() {
  const [stats, setStats] = useState({ classes: 0, students: 0, bookings: 0, revenue: 0 });

  const fetchStats = async () => {
    const classQuery = query(collection(db, "classes"), where("tutorId", "==", auth.currentUser.uid));
    const classSnap = await getDocs(classQuery);
    const classes = classSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    let bookings = 0;
    let revenue = 0;
    const studentSet = new Set();

    for (let cls of classes) {
      const bQuery = query(collection(db, "bookings"), where("classId", "==", cls.id));
      const bSnap = await getDocs(bQuery);
      bookings += bSnap.size;
      revenue += (cls.price || 0) * bSnap.size;

      bSnap.docs.forEach((b) => studentSet.add(b.data().studentId));
    }

    setStats({
      classes: classes.length,
      students: studentSet.size,
      bookings,
      revenue,
    });
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">📊 My Tutor Stats</h2>
      <p>Total Classes Created: {stats.classes}</p>
      <p>Unique Students Taught: {stats.students}</p>
      <p>Total Bookings: {stats.bookings}</p>
      <p>Total Revenue: ${stats.revenue}</p>
    </div>
  );
}
