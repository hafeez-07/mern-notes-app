import { fetchNotes } from "./api/notesApi.ts";
import { useEffect, useState } from "react";
import type { Note } from "./types/note.ts";

import Home from "./pages/Home.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout.tsx";
import EditNote from "./pages/EditNote.tsx";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const loadNotes = async () => {
      const data = await fetchNotes();
      setNotes(data);
    };
    loadNotes();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home notes={notes} setNotes={setNotes} />,
        },
        {
          path: "edit/:id",
          element: <EditNote setNotes={setNotes} notes={notes} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
