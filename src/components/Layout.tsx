import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import VideoBackground from "./VideoBackground";

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <VideoBackground />
      <Navbar />
      <main className="flex-grow relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
