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

export default function TutorBookings() {
  const [classBookings, setClassBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTutorClassesAndBookings = async () => {
    try {
      // Get classes by this tutor
      const classQuery = query(collection(db, "classes"), where("tutorId", "==", auth.currentUser.uid));
      const classSnapshot = await getDocs(classQuery);

      const classes = classSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // For each class, get bookings and student info
      const results = await Promise.all(
        classes.map(async (cls) => {
          const bookingQuery = query(collection(db, "bookings"), where("classId", "==", cls.id));
          const bookingSnap = await getDocs(bookingQuery);

          const bookings = await Promise.all(
            bookingSnap.docs.map(async (b) => {
              const data = b.data();
              const studentRef = doc(db, "users", data.studentId);
              const studentSnap = await getDoc(studentRef);
              return {
                student: studentSnap.exists() ? studentSnap.data() : {},
                bookedAt: data.bookedAt?.toDate().toLocaleString(),
              };
            })
          );

          return {
            classTitle: cls.title,
            classId: cls.id,
            bookings,
          };
        })
      );

      setClassBookings(results);
    } catch (err) {
      console.error("Error fetching tutor bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutorClassesAndBookings();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">📚 My Class Bookings</h2>

      {loading ? (
        <p>Loading...</p>
      ) : classBookings.length === 0 ? (
        <p>You haven’t created or booked any classes yet.</p>
      ) : (
        classBookings.map((cls) => (
          <div key={cls.classId} className="border rounded p-4 mb-6 bg-white shadow">
            <h3 className="text-xl font-semibold">{cls.classTitle}</h3>

            {cls.bookings.length === 0 ? (
              <p className="text-gray-500 mt-2">No students have booked this class yet.</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {cls.bookings.map((b, i) => (
                  <li key={i} className="border p-2 rounded bg-gray-50">
                    👤 {b.student.name || b.student.email} <br />
                    🕒 Booked At: <span className="text-gray-600">{b.bookedAt}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}
    </div>
  );
}
