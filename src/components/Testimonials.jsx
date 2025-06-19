export default function Testimonials() {
  const quotes = [
    { name: "Liya, Student", quote: "The AI tutor helped me study smarter, not harder!" },
    { name: "Abdi, Tutor", quote: "Managing my classes and assignments has never been easier." },
  ];

  return (
    <section className="py-16 px-4 bg-white text-center">
      <h2 className="text-3xl font-bold mb-10">What Our Users Say</h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {quotes.map((q, i) => (
          <div key={i} className="border p-6 rounded shadow text-left">
            <p className="italic mb-2">"{q.quote}"</p>
            <p className="text-blue-600 font-semibold">{q.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
