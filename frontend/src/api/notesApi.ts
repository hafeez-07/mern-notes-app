const BASE_URL = "http://localhost:3000";

import type { CreateNote, UpdateNote } from "../types/note";

export const fetchNotes = async () => {
  const response = await fetch(`${BASE_URL}/read`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Could not fetch notes");
  }
  return response.json();
};

export const createNote = async (note: CreateNote) => {
  const response = await fetch(`${BASE_URL}/add`, {
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
  const response = await fetch(`${BASE_URL}/delete/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Couldn't delete a note");
  }

  return response.json();
};

export const deleteAll = async () => {
  const response = await fetch(`${BASE_URL}/deleteAll`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Could not delete all notes");
  }
  return response.json();
};

export const updateNote = async (id: string, note: UpdateNote) => {
  const response = await fetch(`${BASE_URL}/update/${id}`, {
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
  const response = await fetch(`${BASE_URL}/read/${id}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Could not load note");
  }
  return response.json();
};
