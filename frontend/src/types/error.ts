export type RegisterError = {
  username?: string;
  email?: string;
  password?: string;
  general?: string;
};

export type ApiError = {
  field?: string;
  error: string;
};
