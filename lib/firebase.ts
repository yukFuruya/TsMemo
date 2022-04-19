import * as firebase from "firebase";
import "firebase/firestore";
import { User } from "../types/user";

if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: "AIzaSyBew5xlRvvVcaceN1eRt2zxbzJVkU_RomI",
    authDomain: "my-first-tsmemo-native.firebaseapp.com",
    projectId: "my-first-tsmemo-native",
    storageBucket: "my-first-tsmemo-native.appspot.com",
    messagingSenderId: "329406136992",
    appId: "1:329406136992:web:479e85eefd2d2387c43fc5",
    measurementId: "G-LPWPD3VH43",
  };
  firebase.initializeApp(firebaseConfig);
}

export const getUsers = async () => {
  const snapshot = await firebase.firestore().collection("user").get();
  const users = snapshot.docs.map((doc) => doc.data() as User);
  return users;
};
