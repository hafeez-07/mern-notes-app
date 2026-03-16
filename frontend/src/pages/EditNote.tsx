import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Note } from "../types/note";
import { updateNote, getNote } from "../api/notesApi";
import { useNavigate, useParams } from "react-router-dom";

type Props = {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};

const EditNote = ({ setNotes, notes }: Props) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    const editingNoteState = notes.find((note) => note._id === id);

    //if note exist in state (Initial render)
    if (editingNoteState) {
      setTitle(editingNoteState.title);
      setBody(editingNoteState.body);
    }
    //if it does not , after refresh
    else {
      const fetchNote = async () => {
        try {
          const note = await getNote(id);
          setTitle(note.title);
          setBody(note.body);
        } catch (err) {
          toast.error("Note not found", {
            duration: 2000,
          });
          navigate("/");
        }
      };
      fetchNote();
    }
  }, [id, notes]);

  const textAreaHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = e.target;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + 4 + "px";
    setBody(el.value);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === "" || body.trim() === "") {
      return;
    }

    const savedNote = await updateNote(id!, { title, body });

    //now find note with same id and replace

    setNotes((prev) =>
      prev
        .map((note) => (note._id === savedNote._id ? savedNote : note))
        .sort(
          (a, b) =>
            new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf(),
        ),
    );

    navigate("/");
    toast.success("updated succesfully", {
      duration: 2000,
    });
  };

  return (
    <div className="max-w-5xl bg-zinc-900 bg-zinc-900 mx-auto  rounded-xl">
      <h2 className="text-2xl font-semibold border-b py-2 px-4 border-zinc-700">
        Update Note
      </h2>

      <form onSubmit={submitHandler} className="flex flex-col gap-2  p-4 ">
        <input
          type="text"
          name="title"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
        />
        <textarea
          rows={3}
          name="body"
          value={body}
          onChange={textAreaHandler}
          placeholder="write your note here.."
          className="input-field resize-none max-h-60 "
        ></textarea>
        <input
          className="submit-button"
          type="submit"
          value="update"
        />
      </form>
    </div>
  );
};
export default EditNote;
