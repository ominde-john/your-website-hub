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

      <section className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">
          AI & Robotics Unit
        </h1>

        <p className="text-lg text-gray-600 mb-10 max-w-3xl">
          The AI & Robotics Unit is a forward-thinking innovation group within
          Teksoft Community. We explore artificial intelligence, robotics,
          automation, and intelligent systems through research, workshops, and
          real-world projects.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-3">
              🤖 Robotics Engineering
            </h3>
            <p className="text-gray-600">
              Design and build autonomous robots, smart devices, and embedded
              systems using modern hardware and software tools.
            </p>
          </div>

          <div className="p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-3">
              🧠 Artificial Intelligence
            </h3>
            <p className="text-gray-600">
              Learn and apply machine learning, deep learning, computer vision,
              and natural language processing in real projects.
            </p>
          </div>

          <div className="p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-3">
              🚀 Innovation & Research
            </h3>
            <p className="text-gray-600">
              Collaborate on cutting-edge research, hackathons, and innovation
              challenges that solve real-world problems.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AIRoboticsPage;
