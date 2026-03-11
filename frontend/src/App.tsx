import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import NoteForm from "./components/NoteForm";
import Notes from "./components/Notes";

function App() {
  return (
    <div className="flex flex-col gap-10 min-h-screen bg-linear-to-br from-zinc-300 to-zinc-200 ">
      <Navbar />
      <div className="px-4 ">
        <NoteForm />
        <Notes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
