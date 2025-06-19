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

export default function StudentStats() {
  const [stats, setStats] = useState({ total: 0, upcoming: 0, subjects: [] });

  const fetchStats = async () => {
    const bookingsRef = query(
      collection(db, "bookings"),
      where("studentId", "==", auth.currentUser.uid)
    );
    const snap = await getDocs(bookingsRef);
    const bookings = snap.docs.map(doc => doc.data());

    let upcoming = 0;
    const subjectMap = new Map();

    for (let b of bookings) {
      const classRef = doc(db, "classes", b.classId);
      const classSnap = await getDoc(classRef);
      if (classSnap.exists()) {
        const cls = classSnap.data();
        if (cls.title) subjectMap.set(cls.title, true);
        // Add your own upcoming logic here
        upcoming++;
      }
    }

    setStats({
      total: bookings.length,
      upcoming,
      subjects: [...subjectMap.keys()],
    });
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">📈 My Learning Stats</h2>
      <p>Total Classes Booked: {stats.total}</p>
      <p>Upcoming Classes: {stats.upcoming}</p>
      <p>Subjects Covered: {stats.subjects.join(", ") || "None"}</p>
    </div>
  );
}
