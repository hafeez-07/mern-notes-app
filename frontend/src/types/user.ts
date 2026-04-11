export type RegisteredUser = {
  fullname?: string;
  username: string;
  email: string;
  password: string;
};

export type LoggedInUser = {
  email: string;
  password: string;
};

export type User = {
  _id?: string;
  fullname: string;
  username: string;
  email: string;
  age: number;
  imageUrl?: string;
};
