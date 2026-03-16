import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "sonner";
import type { Note } from "../types/note";

type Props = {
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};

const RootLayout = ({ setNotes }: Props) => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar setNotes={setNotes} />
      <main className=" grow bg-linear-to-bl from-zinc-900 to-zinc-800 text-white  py-8">
        <Toaster position="top-center" richColors />
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default RootLayout;
