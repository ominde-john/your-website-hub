import { Helmet } from "react-helmet-async";

const DevelopersHubPage = () => {
  return (
    <>
      <Helmet>
        <title>Developers Community Hub | Teksoft Community</title>
      </Helmet>

      <section className="container-custom py-20">
        <h1 className="text-4xl font-bold text-techblue mb-4">
          Developers Community Hub
        </h1>
        <p className="text-gray-600 max-w-3xl">
          A collaborative space for developers to learn, build, share projects,
          and grow together through mentorship, open-source, and hackathons.
        </p>
      </section>
    </>
  );
};

export default DevelopersHubPage;
