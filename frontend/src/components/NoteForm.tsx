import React, { useState } from "react";
import type { Note } from "../types/note";
import { createNote } from "../api/notesApi";

type Props = {
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};

const NoteForm = ({ setNotes }: Props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

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

    const savedNote = await createNote({ title, body });

    setNotes((prev) =>
      [...prev, savedNote].sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      ),
    );

    setTitle("");
    setBody("");
  };

  return (
    <div className="max-w-5xl border mx-auto bg-white border-white rounded-xl">
      <h2 className="text-2xl font-semibold border-b py-2 px-4 border-zinc-200">
        Create a Note
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
          className="border border-orange-400 bg-orange-500 font-semibold text-white rounded py-1 cursor-pointer"
          type="submit"
          value="Save Note"
        />
      </form>
    </div>
  );
};

export default NoteForm;
