import { User } from "./user";

export type RootStackParamList = {
  Main: undefined;
  Home: undefined;
  User: { user: User };
  NewPost: { user: User };
};