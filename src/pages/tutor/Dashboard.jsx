import { Link } from "react-router-dom";

export default function TutorDashboard() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">🧑‍🏫 Tutor Dashboard</h2>
      <div className="space-y-4">
        <Link to="/tutor/assignments" className="text-blue-600 underline block">→ Create Assignments</Link>

        <Link to="/tutor/bookings" className="text-blue-600 underline block">→ View Bookings For My Classes</Link>
        {/* Add future links here, e.g. Manage Classes, AI Lesson Plan, etc. */}
        <Link to="/tutor/stats" className="text-blue-600 underline block">→ View My Stats</Link>

        <Link to="/tutor/classes" className="text-blue-600 underline block">
  → Manage My Classes
</Link>
      </div>
    </div>
  );
}
