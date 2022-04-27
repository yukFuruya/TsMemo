import firebase from "firebase"

type UserRef = {
    id: string;
    name: string;
}

export type Diary = {
    id?: string;
    title: string;
    text: string;
    score: number;
    user:  UserRef;
    createdAt: firebase.firestore.Timestamp;
    updatedAt: firebase.firestore.Timestamp;
}