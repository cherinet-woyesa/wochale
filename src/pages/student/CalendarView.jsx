import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { db, auth } from "../../firebase";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { format } from "date-fns";

export default function CalendarView() {
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedClasses, setSelectedClasses] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const q = query(collection(db, "bookings"), where("studentId", "==", auth.currentUser.uid));
      const snapshot = await getDocs(q);

      const bookingData = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const booking = docSnap.data();
          const classRef = doc(db, "classes", booking.classId);
          const classSnap = await getDoc(classRef);
          return {
            ...booking,
            id: docSnap.id,
            date: booking.bookedAt.toDate(),
            classInfo: classSnap.exists() ? classSnap.data() : null,
          };
        })
      );

      setBookings(bookingData);
    };

    fetchBookings();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formatted = format(date, "yyyy-MM-dd");

    const classesOnDate = bookings.filter(
      (b) => format(b.date, "yyyy-MM-dd") === formatted
    );
    setSelectedClasses(classesOnDate);
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const formatted = format(date, "yyyy-MM-dd");
      const match = bookings.some(b => format(b.date, "yyyy-MM-dd") === formatted);
      return match ? "bg-green-200 rounded-full" : null;
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">📅 My Booked Classes (Calendar View)</h2>

      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={tileClassName}
        className="mx-auto max-w-xl bg-white shadow rounded"
      />

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Classes on {format(selectedDate, "PPP")}:</h3>
        {selectedClasses.length > 0 ? (
          selectedClasses.map((cls, i) => (
            <div key={i} className="border p-4 rounded mb-4 bg-gray-50 shadow">
              <h4 className="text-lg font-bold">{cls.classInfo?.title}</h4>
              <p>{cls.classInfo?.description}</p>
              <p className="text-gray-600">Price: ${cls.classInfo?.price}</p>
            </div>
          ))
        ) : (
          <p>No classes booked on this date.</p>
        )}
      </div>
    </div>
  );
}
