import { FaTrash, FaPen } from "react-icons/fa";
import type { Note } from "../types/note";
import { deleteNote, deleteAll } from "../api/notesApi";
import { toast } from "sonner";
import { useRef } from "react";
import { Link } from "react-router-dom";

type NoteProps = {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};

const Notes = ({ notes, setNotes }: NoteProps) => {
  const deleteTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deleteOneNote = async (id: string) => {
    //save notes , incase if the delete fails
    const previousNotes = [...notes];

    toast.warning("Confirm delete?", {
      description: "This will permanently delete the note",
      duration: 6000,
      action: {
        label: "delete",
        onClick: async () => {
          setNotes((prev) => prev.filter((note) => note._id != id));
          try {
            await deleteNote(id);
          } catch (err) {
            setNotes(previousNotes);
          }
          toast.success("Deleted succesfully", {
            duration: 2000,
          });
        },
      },
      cancel: {
        label: "cancel",
        onClick: () => {},
      },
    });
  };

  const deleteAllNotes = async () => {
    //when there is no notes
    if (notes.length === 0) {
      return toast.error("No notes found", {
        duration: 2000,
      });
    }

    //save prev notes
    const previousNotes = [...notes];

    toast.warning("Confirm delete?", {
      duration: 6000,
      description: "This will permanently delete all notes",
      action: {
        label: "clear all",
        onClick: () => {
          setNotes([]);
          deleteTimeout.current = setTimeout(async () => {
            try {
              await deleteAll();
            } catch (err) {
              setNotes(previousNotes);
            }
          }, 6000);

          toast("All notes deleted successfully", {
            duration: 3000,
            action: {
              label: "undo",
              onClick: () => {
                setNotes(previousNotes);
                if (deleteTimeout.current) {
                  clearTimeout(deleteTimeout.current);
                }
                toast.success("All notes restored", {
                  duration: 2000,
                });
              },
            },
          });
        },
      },
      cancel: {
        label: "cancel",
        onClick: () => {},
      },
    });
  };

  return (
    <div className="mx-auto mt-15 max-w-5xl">
      <div className="mb-3 flex justify-between">
        <h3 className="text-xl font-semibold">Your notes</h3>
        <button className="destructive-button" onClick={deleteAllNotes}>
          clear all
        </button>
      </div>

      {notes.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {notes.map((note) => (
            <div
              key={note._id}
              className="mt-5 flex flex-col space-y-3 rounded-xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black backdrop-blur-md transition-all duration-300 hover:scale-[1.02]"
            >
              <h4 className="border-zinc-700 pb-1 text-lg font-semibold">
                {note.title}
              </h4>
              <div className="line-clamp-3 grow border-zinc-700 text-sm">
                {note.body}
              </div>
              <div className="mt-auto flex justify-between text-xs">
                <div>
                  {new Date(note.updatedAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
                <div className="flex gap-3">
                  <button className="rounded transition-all duration-300 hover:cursor-pointer hover:text-blue-500">
                    <Link to={`edit/${note._id}`}>
                      <FaPen className="text-sky-400 transition duration-300 ease-in hover:text-sky-600" />
                    </Link>
                  </button>
                  <button className="rounded transition-all duration-300 hover:cursor-pointer hover:text-red-500">
                    <FaTrash
                      className="text-zinc-500 transition duration-300 ease-in hover:text-zinc-300"
                      onClick={() => deleteOneNote(note._id)}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-10 text-center text-2xl text-zinc-400">
          No notes yet. Start by creating one ✨
        </div>
      )}
    </div>
  );
};
export default Notes;
