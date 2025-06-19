export function ClassCard({ classData, isBooked, onBook }) {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
              {classData.category || "General"}
            </span>
            <span className="text-lg font-bold text-gray-900">
              ${classData.price}
            </span>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {classData.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {classData.description}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <span>
              {classData.duration || "60"} mins • {classData.level || "All Levels"}
            </span>
          </div>
          
          <button
            onClick={onBook}
            disabled={isBooked}
            className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
              isBooked
                ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isBooked ? "Booked ✓" : "Book Now"}
          </button>
        </div>
      </div>
    );
  }