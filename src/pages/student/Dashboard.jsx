import { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "../../components/Loader";
import { ClassCard } from "../../components/ClassCard";
import { DashboardQuickLinks } from "../../components/DashboardQuickLinks";
// import { useAuth } from "../../hooks"; // TODO: Restore when useAuth is available

export default function StudentDashboard() {
  const [classes, setClasses] = useState([]);
  const [bookedClassIds, setBookedClassIds] = useState([]);
  const [loading, setLoading] = useState(true);
  // const { currentUser } = useAuth(); // TODO: Restore when useAuth is available
  const currentUser = null; // TEMP: Remove when useAuth is available
  const navigate = useNavigate();

  const fetchClasses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "classes"));
      const data = querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() 
      }));
      setClasses(data);
    } catch (error) {
      toast.error("Failed to fetch classes");
      console.error("Error fetching classes:", error);
    }
  };

  const fetchBookings = async () => {
    if (!currentUser?.uid) return;
    
    try {
      const q = query(
        collection(db, "bookings"), 
        where("studentId", "==", currentUser.uid)
      );
      const snapshot = await getDocs(q);
      const booked = snapshot.docs.map(doc => doc.data().classId);
      setBookedClassIds(booked);
    } catch (error) {
      toast.error("Failed to fetch bookings");
      console.error("Error fetching bookings:", error);
    }
  };

  const handleBooking = async (classId) => {
    if (!currentUser) {
      toast.info("Please login to book classes");
      return navigate("/login");
    }

    if (bookedClassIds.includes(classId)) {
      return toast.info("You've already booked this class");
    }

    try {
      await addDoc(collection(db, "bookings"), {
        studentId: currentUser.uid,
        classId,
        bookedAt: new Date(),
        status: "confirmed"
      });

      toast.success("Class booked successfully!");
      fetchBookings();
    } catch (error) {
      toast.error("Failed to book class");
      console.error("Booking error:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchClasses(), fetchBookings()]);
      setLoading(false);
    };

    loadData();
  }, [currentUser]);

  if (loading) return <Loader fullScreen />;

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {currentUser?.displayName || "Student"}!
        </h1>
        <p className="text-gray-600 mt-2">
          Continue your learning journey with our expert tutors
        </p>
      </header>

      <DashboardQuickLinks />

      <section className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Available Classes
          </h2>
          <div className="text-sm text-gray-500">
            Showing {classes.length} classes
          </div>
        </div>

        {classes.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No classes available
            </h3>
            <p className="text-gray-500">
              Check back later or ask your tutor to schedule a session
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {classes.map((cls) => (
              <ClassCard
                key={cls.id}
                classData={cls}
                isBooked={bookedClassIds.includes(cls.id)}
                onBook={() => handleBooking(cls.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}