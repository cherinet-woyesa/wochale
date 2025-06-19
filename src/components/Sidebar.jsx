// src/components/Sidebar.jsx
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md h-full p-4">
      <h2 className="text-xl font-bold mb-6">Wochale</h2>
      <nav className="flex flex-col gap-3">
        <Link to="/student" className="text-gray-700 hover:text-blue-500">Student Dashboard</Link>
        <Link to="/tutor" className="text-gray-700 hover:text-green-500">Tutor Dashboard</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
