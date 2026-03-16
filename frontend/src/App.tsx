import { fetchNotes } from "./api/notesApi.ts";
import { useEffect, useState } from "react";
import type { Note } from "./types/note.ts";

import Home from "./pages/Home.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout.tsx";
import EditNote from "./pages/EditNote.tsx";
import Register from "./pages/Register.tsx";
import AuthLayout from "./layout/AuthLayout.tsx";
import Login from "./pages/Login.tsx";

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
      element: <RootLayout setNotes={setNotes} />,
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

    {
      element: <AuthLayout />,
      children: [
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
