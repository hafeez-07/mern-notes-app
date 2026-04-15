import type { User } from "../types/user";

const API = import.meta.env.VITE_API_BASE_URL;

export const fetchUser = async () => {
  const response = await fetch(`${API}/getUser`, {
    credentials: "include",
  });

  if (response.status === 401) {
    return null;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "couldn't find user");
  }
  return data;
};

export const updateUser = async (user: User) => {
  const response = await fetch(`${API}/updateUser`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || " could not update user");
  }

  return data;
};

export const uploadProfile = async (file: File) => {
  const formData = new FormData();
  formData.append("profile", file);

  const response = await fetch(`${API}/upload`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "couldn't upload profile");
  }

  return data;
};

export const deleteUser = async () => {
  const response = await fetch(`${API}/deleteUser`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Couldn't delete user");
  }
  return data;
};
