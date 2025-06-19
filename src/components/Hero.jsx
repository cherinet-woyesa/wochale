import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 to-indigo-800 text-white py-24 md:py-32 text-center px-4 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-white animate-float"></div>
        <div className="absolute top-1/3 right-20 w-12 h-12 rounded-full bg-white animate-float-delay"></div>
        <div className="absolute bottom-20 left-1/4 w-10 h-10 rounded-full bg-white animate-float"></div>
        <div className="absolute top-1/2 right-1/3 w-14 h-14 rounded-full bg-white animate-float-delay"></div>
      </div>
      
      <div className="relative max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Master Learning with <span className="text-yellow-300">AI-Powered</span> Tutoring
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto mb-8 opacity-90">
          Personalized education from top tutors and smart AI tools. Book, chat, learn & grow!
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/signup" 
            className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-gray-100 hover:scale-105 transform transition-all duration-300"
          >
            Get Started Now
          </Link>
          <Link 
            to="/demo" 
            className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:bg-opacity-10 hover:scale-105 transform transition-all duration-300"
          >
            Try Free Demo
          </Link>
        </div>
        
        {/* Stats or social proof */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm md:text-base">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>5,000+ Happy Students</span>
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span>24/7 AI Tutor Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}