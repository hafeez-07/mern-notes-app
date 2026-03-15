import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "sonner";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      <main className=" grow bg-linear-to-bl from-zinc-300 to-zinc-200 py-8">
        <Toaster position="top-center" richColors />
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default RootLayout;
