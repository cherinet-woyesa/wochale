import { Link } from "react-router-dom";

export function DashboardQuickLinks() {
  const links = [
    { path: "/student/stats", icon: "📊", text: "Learning Stats" },
    { path: "/student/assignments", icon: "📝", text: "Assignments" },
    { path: "/student/bookings", icon: "🗓️", text: "My Bookings" },
    { path: "/student/calendar", icon: "📅", text: "Calendar" },
    { path: "/student/ai", icon: "🤖", text: "AI Tutor" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Quick Access
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl mb-2">{link.icon}</span>
            <span className="text-sm font-medium text-center text-gray-700">
              {link.text}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}