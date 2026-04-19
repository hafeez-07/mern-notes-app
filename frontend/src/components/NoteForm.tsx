import React, { useState } from "react";
import type { NoteType } from "../types/note";
import { createNote } from "../api/notesApi";
import { toast } from "sonner";

type Props = {
  setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>;
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
    toast.success("Added successfully", {
      duration: 2000,
    });

    setTitle("");
    setBody("");
  };

  return (
    <div className="mx-auto max-w-5xl rounded-xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-2xl">
      <h2 className="border-b border-zinc-700 px-4 sm:px-8 pt-6 pb-4 text-3xl font-semibold">
        Create a Note
      </h2>

      <form onSubmit={submitHandler} className="flex flex-col gap-2 px-4 sm:px-8 pb-8 pt-4">
        <input
          type="text"
          name="title"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          className="auth-input-field"
        />
        <textarea
          rows={3}
          name="body"
          value={body}
          onChange={textAreaHandler}
          placeholder="write your note here.."
          className="auth-input-field max-h-60  resize-none"
        ></textarea>
        <input className="submit-button" type="submit" value="Save Note" />
      </form>
    </div>
  );
};

export default NoteForm;
