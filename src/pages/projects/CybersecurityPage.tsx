import { Helmet } from "react-helmet-async";

const CybersecurityPage = () => {
  return (
    <>
      <Helmet>
        <title>Cybersecurity Squad | Teksoft Community</title>
      </Helmet>

      <section className="container-custom py-20">
        <h1 className="text-4xl font-bold text-techblue mb-4">
          Cybersecurity Squad
        </h1>
        <p className="text-gray-600 max-w-3xl">
          Learn ethical hacking, network security, digital forensics, and cyber
          defense through practical labs and simulations.
        </p>
      </section>
    </>
  );
};

export default CybersecurityPage;
