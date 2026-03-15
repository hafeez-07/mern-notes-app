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

          toast.info("All notes deleted successfully", {
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
    <div className="max-w-5xl mx-auto mt-15 ">
      <div className="flex justify-between mb-3">
        <h3 className="text-xl font-semibold">Your notes</h3>
        <button className="destructive-button" onClick={deleteAllNotes}>
          clear all
        </button>
      </div>

      {notes.length > 0 ? (
        <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                    <Link to={`edit/${note._id}`}>
                      <FaPen className="text-sm" />
                    </Link>
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
