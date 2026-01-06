import { Helmet } from "react-helmet-async";

const AIRoboticsPage = () => {
  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>AI & Robotics Unit | Teksoft Community</title>
        <meta
          name="description"
          content="The AI & Robotics Unit at Teksoft Community focuses on artificial intelligence, robotics innovation, research, and hands-on projects."
        />
      </Helmet>

      {/* HERO SECTION */}
      <section
        className="relative min-h-[70vh] flex items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1581090700227-1e37b190418e')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        {/* Content */}
        <div className="relative container mx-auto px-6 py-24 text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            AI & Robotics Unit
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-3xl">
            A forward-thinking innovation unit exploring artificial intelligence,
            robotics, automation, and intelligent systems through hands-on
            research, workshops, and real-world projects.
          </p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-xl hover:scale-[1.02] transition">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-2xl font-semibold mb-3 text-white">
              Robotics Engineering
            </h3>
            <p className="text-gray-400">
              Design and build autonomous robots, smart devices, and embedded
              systems using modern hardware platforms and intelligent control
              software.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-xl hover:scale-[1.02] transition">
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="text-2xl font-semibold mb-3 text-white">
              Artificial Intelligence
            </h3>
            <p className="text-gray-400">
              Apply machine learning, deep learning, computer vision, and NLP to
              real-world challenges across multiple industries.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-xl hover:scale-[1.02] transition">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-2xl font-semibold mb-3 text-white">
              Innovation & Research
            </h3>
            <p className="text-gray-400">
              Collaborate on cutting-edge research, hackathons, and innovation
              missions that solve meaningful real-world problems.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Build the Future with Us
          </h2>
          <p className="text-lg mb-8 text-white/90">
            Join the AI & Robotics Unit and shape the next generation of
            intelligent systems.
          </p>
          <a
            href="/contact"
            className="inline-block rounded-full bg-white px-8 py-4 font-semibold text-indigo-600 hover:bg-gray-100 transition"
          >
            Get Involved
          </a>
        </div>
      </section>
    </>
  );
};

export default AIRoboticsPage;
