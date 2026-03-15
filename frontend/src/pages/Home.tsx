import NoteForm from "../components/NoteForm";
import Notes from "../components/Notes";
import type { Note } from "../types/note";

type Props = {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};

const Home = ({ notes, setNotes }: Props) => {
  return (
    <div>
      <NoteForm setNotes={setNotes} />
      <Notes notes={notes} setNotes={setNotes} />
    </div>
  );
};

export default Home;
