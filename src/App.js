// src/App.js
import { Routes, Route } from "react-router-dom";
import StudentDashboard from "./pages/student/Dashboard";
import TutorDashboard from "./pages/tutor/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MyBookings from "./pages/student/MyBookings";
import AITutor from "./pages/student/AITutor";
import ProtectedRoute from "./components/ProtectedRoute";
import CalendarView from "./pages/student/CalendarView";
import TutorBookings from "./pages/tutor/TutorBookings";
import ManageClasses from "./pages/tutor/ManageClasses";
import ChatPage from "./pages/chat/ChatPage";
import StudentStats from "./pages/student/StudentStats";
import TutorStats from "./pages/tutor/TutorStats";
import TutorAssignments from "./pages/tutor/Assignments";
import StudentAssignments from "./pages/student/Assignments";
import Landing from "./pages/Landing";

function App() {
  return (
    <Routes>
      {/*<Route path="/" element={<Home />} />*/}

      {/* Auth Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/tutor/assignments"
        element={
          <ProtectedRoute allowedRoles={["tutor"]}>
            <TutorAssignments />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/assignments"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentAssignments />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/stats"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentStats />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tutor/stats"
        element={
          <ProtectedRoute allowedRoles={["tutor"]}>
            <TutorStats />
          </ProtectedRoute>
        }
      />

      <Route
        path="/chat/:partnerId"
        element={
          <ProtectedRoute allowedRoles={["student", "tutor"]}>
            <ChatPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/bookings"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <MyBookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tutor/bookings"
        element={
          <ProtectedRoute allowedRoles={["tutor"]}>
            <TutorBookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tutor/classes"
        element={
          <ProtectedRoute allowedRoles={["tutor"]}>
            <ManageClasses />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/ai"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <AITutor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/calendar"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <CalendarView />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tutor"
        element={
          <ProtectedRoute allowedRoles={["tutor"]}>
            <TutorDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
