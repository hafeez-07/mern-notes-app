import type { LoggedInUser, RegisteredUser } from "../types/user";

const API = import.meta.env.VITE_API_BASE_URL;

//register user
export const registerUser = async (user: RegisteredUser) => {
  const response = await fetch(`${API}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    //to send and receive cookies
    credentials: "include",
    body: JSON.stringify(user),
  });
  const data = await response.json();
  if (!response.ok) {
    throw data;
  }

  return data;
};

export const loginUser = async (user: LoggedInUser) => {
  const response = await fetch(`${API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "couldn't log in");
  }
  return data;
};

//logout

export const logoutUser = async () => {
  const response = await fetch(`${API}/logout`, {
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "could not log out");
  }
  return data;
};
