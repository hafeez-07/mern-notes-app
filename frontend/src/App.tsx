import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import NoteForm from "./components/NoteForm";
import Notes from "./components/Notes";
import { fetchNotes } from "./api/notesApi.ts";
import { useEffect, useState } from "react";
import type { Note } from "./types/note.ts";
import { Toaster } from "sonner";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const loadNotes = async () => {
      const data = await fetchNotes();
      setNotes(data);
    };
    loadNotes();
  }, []);

  return (
    <div className="flex flex-col gap-10 min-h-screen bg-linear-to-br from-zinc-300 to-zinc-200 ">
      <Navbar />

      <div className="px-4 ">
        <Toaster position="top-center" />
        <NoteForm setNotes={setNotes} />
        <Notes notes={notes} setNotes={setNotes} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
