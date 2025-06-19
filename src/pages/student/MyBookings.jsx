import { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const q = query(
        collection(db, "bookings"),
        where("studentId", "==", auth.currentUser.uid)
      );
      const snapshot = await getDocs(q);

      const bookingsWithClassData = await Promise.all(
        snapshot.docs.map(async (bookingDoc) => {
          const bookingData = bookingDoc.data();
          const classRef = doc(db, "classes", bookingData.classId);
          const classSnap = await getDoc(classRef);

          return {
            id: bookingDoc.id,
            classId: bookingData.classId,
            bookedAt: bookingData.bookedAt?.toDate().toLocaleString(),
            classInfo: classSnap.exists() ? classSnap.data() : null,
          };
        })
      );

      setBookings(bookingsWithClassData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="p-8">
        
      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>

      {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p>You haven't booked any classes yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="border p-4 rounded shadow bg-white">
              {booking.classInfo ? (
                <>
                  <h3 className="text-xl font-semibold">{booking.classInfo.title}</h3>
                  <p className="mt-2">{booking.classInfo.description}</p>
                  <p className="text-gray-600 mt-2">Price: ${booking.classInfo.price}</p>
                  <p className="text-sm text-gray-500 mt-2">Booked At: {booking.bookedAt}</p>
                </>
              ) : (
                <p className="text-red-500">Class info not found</p>
              )}
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
