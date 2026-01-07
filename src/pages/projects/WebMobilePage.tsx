import { Helmet } from "react-helmet-async";

const WebMobilePage = () => {
  return (
    <>
      <Helmet>
        <title>Web & Mobile Dev Missions | Teksoft Community</title>
      </Helmet>

      <section className="container-custom py-20">
        <h1 className="text-4xl font-bold text-techblue mb-4">
          Web & Mobile Dev Missions
        </h1>
        <p className="text-gray-600 max-w-3xl">
          Build modern websites and mobile applications using cutting-edge
          frameworks and real client-style projects.
        </p>
      </section>
    </>
  );
};

export default WebMobilePage;
