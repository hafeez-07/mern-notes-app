import type { CreateNote, UpdateNote } from "../types/note";

const API = import.meta.env.VITE_API_BASE_URL;

export const fetchNotes = async () => {
  const response = await fetch(`${API}/read`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Could not fetch notes");
  }
  return response.json();
};

export const createNote = async (note: CreateNote) => {
  const response = await fetch(`${API}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(note),
  });
  if (!response.ok) {
    throw new Error("Could not create note");
  }
  return response.json();
};

export const deleteNote = async (id: string) => {
  const response = await fetch(`${API}/delete/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Couldn't delete a note");
  }

  return response.json();
};

export const deleteAll = async () => {
  const response = await fetch(`${API}/deleteAll`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Could not delete all notes");
  }
  return response.json();
};

export const updateNote = async (id: string, note: UpdateNote) => {
  const response = await fetch(`${API}/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(note),
  });

  if (!response.ok) {
    throw new Error("Could not update note");
  }

  return response.json();
};

export const getNote = async (id: string) => {
  const response = await fetch(`${API}/read/${id}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Could not load note");
  }
  return response.json();
};
