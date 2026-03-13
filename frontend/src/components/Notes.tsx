import { FaTrash, FaPen } from "react-icons/fa";
import type { Note } from "../types/note";
import { deleteNote, deleteAll } from "../api/notesApi";

type NoteProps = {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};

const Notes = ({ notes, setNotes }: NoteProps) => {
  const deleteOneNote = async (id: string) => {
    //save notes , incase if the delete fails
    const previousNotes = notes;

    setNotes((prev) => prev.filter((note) => note._id != id));

    try {
      await deleteNote(id);
    } catch (err) {
      setNotes(previousNotes);
    }
  };

  const deleteAllNotes = async () => {
    //save prev notes
    const previousNotes = notes;
    setNotes([]);

    try {
      await deleteAll();
      console.log("deleted all");
    } catch (err) {
      console.log("error occured");
      setNotes(previousNotes);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-15 ">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold">Your notes</h3>
        <button className="destructive-button" onClick={deleteAllNotes}>
          clear all
        </button>
      </div>
      {notes.length > 0 ? (
        <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {notes.map((note) => (
            <div
              key={note._id}
              className="mt-5 bg-white  rounded-xl hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl  shadow-zinc-500 flex flex-col"
            >
              <h4 className=" border-b p-2 font-semibold text-lg border-zinc-300 pb-1">
                {note.title}
              </h4>
              <div className="grow line-clamp-3 p-2 border-b border-zinc-300">
                {note.body}
              </div>
              <div className="flex justify-between p-2 mt-auto">
                <div>
                  {new Date(note.updatedAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
                <div className="flex gap-1">
                  <button className=" px-1 rounded hover:cursor-pointer hover:text-blue-500 transition-all duration-300">
                    <FaPen className="text-sm" />
                  </button>
                  <button className="  px-1 rounded hover:cursor-pointer  hover:text-red-500 transition-all duration-300">
                    <FaTrash
                      className="text-sm"
                      onClick={() => deleteOneNote(note._id)}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-2xl text-zinc-400 text-center mt-10">
          No notes yet
        </div>
      )}
    </div>
  );
};
export default Notes;
