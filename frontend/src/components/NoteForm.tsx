import React, { useState } from "react";
import type { Note } from "../types/note";
import { createNote } from "../api/notesApi";
import { toast } from "sonner";

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
      toast.error("Note title or content cannot be empty", {
        duration: 2000,
      });
      return;
    }

    const savedNote = await createNote({ title, body });

    setNotes((prev) =>
      [...prev, savedNote].sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      ),
    );
    toast.success("Added succesfully", {
      duration: 2000,
    });

    setTitle("");
    setBody("");
  };

  return (
    <div className="mx-auto max-w-5xl rounded-xl border border-zinc-900 bg-zinc-900">
      <h2 className="border-b border-zinc-700 px-4 py-2 text-2xl font-semibold">
        Create a Note
      </h2>

      <form onSubmit={submitHandler} className="flex flex-col gap-2 p-4">
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
          className="input-field max-h-60 resize-none"
        ></textarea>
        <input className="submit-button" type="submit" value="Save Note" />
      </form>
    </div>
  );
};

export default NoteForm;
