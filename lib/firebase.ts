import * as firebase from "firebase";
import "firebase/firestore";
import { Diary } from "../types/diary";
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
  try {
    const snapshot = await firebase.firestore().collection("user").get();
    const users = snapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as User)
    );
    return users;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const addDiary = async (userId: string, diary: Diary) => {
  await firebase
    .firestore()
    .collection("user")
    .doc(userId)
    .collection("diarys")
    .add(diary);
};

export const getDiarys = async (targetDate: firebase.firestore.Timestamp) => {
  const diaryDocs = await firebase
    .firestore()
    .collection("user")
    .doc("R7dS60eyiSPFyrcbGLP8")
    .collection("diarys")
    .where("createdAt", ">=", targetDate)
    .where(
      "createdAt",
      "<",
      firebase.firestore.Timestamp.fromDate(
        new Date(targetDate.toMillis() + 86400000)
      )
    )
    .orderBy("createdAt", "desc")
    .get();
  return diaryDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Diary));
};

export const getDiaryDocs = async () => {
  const diaryDocs = await firebase
    .firestore()
    .collection("user")
    .doc("R7dS60eyiSPFyrcbGLP8")
    .collection("diarys")
    .get();
  return diaryDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Diary));
};
