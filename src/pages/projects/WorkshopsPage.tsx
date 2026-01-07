import { Helmet } from "react-helmet-async";

const WorkshopsPage = () => {
  return (
    <>
      <Helmet>
        <title>Tech Workshops & Bootcamps | Teksoft Community</title>
      </Helmet>

      <section className="container-custom py-20">
        <h1 className="text-4xl font-bold text-techblue mb-4">
          Tech Workshops & Bootcamps
        </h1>
        <p className="text-gray-600 max-w-3xl">
          Hands-on workshops, bootcamps, and intensive training programs designed
          to build real-world technical skills.
        </p>
      </section>
    </>
  );
};

export default WorkshopsPage;
