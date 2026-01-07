import { Helmet } from "react-helmet-async";

const GamingPage = () => {
  return (
    <>
      <Helmet>
        <title>Gaming & Innovation League | Teksoft Community</title>
      </Helmet>

      <section className="container-custom py-20">
        <h1 className="text-4xl font-bold text-techblue mb-4">
          Gaming & Innovation League
        </h1>
        <p className="text-gray-600 max-w-3xl">
          Explore game development, esports innovation, simulations, and
          interactive technology experiences.
        </p>
      </section>
    </>
  );
};

export default GamingPage;
