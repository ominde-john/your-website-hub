import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import VideoBackground from "./VideoBackground";

export const Layout = () => {
  const location = useLocation();
  const hideLayout = location.pathname === "/member/dashboard";

  return (
    <div className="flex flex-col min-h-screen relative">
      <VideoBackground />
      {!hideLayout && <Navbar />}
      <main className="flex-grow relative z-10">
        <Outlet />
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
};

export default Layout;
