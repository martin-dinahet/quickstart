export type CurrentUser = {
  id: string;
  username: string;
  email: string;
} | null;

export type CurrentUserContextType = {
  user: CurrentUser;
  logout: () => Promise<void>;
};
