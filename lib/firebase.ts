import * as firebase from "firebase";
import "firebase/firestore";
import { User } from "../types/user";
import Constants from "expo-constants";

if (!firebase.apps.length) {
  firebase.initializeApp(Constants.manifest.extra.firabase);
}

export const getUsers = async () => {
  const snapshot = await firebase.firestore().collection("user").get();
  const users = snapshot.docs.map((doc) => doc.data() as User);
  return users;
};
