import { fetchNotes } from "./api/notesApi.ts";
import { useEffect, useState } from "react";
import type { Note } from "./types/note.ts";

import Home from "./pages/Home.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout.tsx";
import EditNote from "./pages/EditNote.tsx";
import Register from "./pages/Register.tsx";
import AuthLayout from "./layout/AuthLayout.tsx";
import Landing from "./pages/Landing.tsx";
import useAuth from "../hooks/useAuth.ts";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    
    //if user is loggedout , return
    if (!user) {
      return;
    }

    const loadNotes = async () => {
      const data = await fetchNotes();
      setNotes(data);
    };
    loadNotes();
  }, [user]);

  const router = createBrowserRouter([
    {
      path: "/app",
      element: <RootLayout setNotes={setNotes} />,
      children: [
        {
          index: true,
          element: <Home notes={notes} setNotes={setNotes} />, //dashboard
        },
        {
          path: "edit/:id",
          element: <EditNote setNotes={setNotes} notes={notes} />,
        },
      ],
    },

    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <Landing />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
