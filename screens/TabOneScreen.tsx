import { ShadowPropTypesIOS, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import React,{ useEffect, useState } from "react";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { Calendar } from "react-native-calendars";

import * as firebase from 'firebase';
import 'firebase/firestore';

if (!firebase.apps.length){
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

type User = {
  age: string;
  family: string;
  last: string;
}

export default function TabOneScreen(
  this: any,
  { navigation }: RootTabScreenProps<"TabOne">
) {

  const [users,setUsers] = useState<User[]>([])
  useEffect(() => {
    getFirebaseItems();
  },[])

  const getFirebaseItems = async() => {
      const snapshot = await firebase.firestore().collection("user").get();
      const users = snapshot.docs.map(doc => doc.data() as User);
      console.log(users);
      setUsers(users);
  }

  const userItems = users.map((user, index) => (
    <View style={{margin: 10}} key={index.toString()}>
      <Text>{user.age}</Text>
      <Text>{user.family}</Text>
      <Text>{user.last}</Text>
    </View>
  ));

  const onPressAdd = () => {
    navigation.navigate("NewPost"); // (3)
  };

  return (
    <View style={styles.container}>
      <Calendar
        monthFormat={"yyyy年 M月"}
        onDayPress={this.onDayPress}
        markingType={"period"}
      />
      {userItems}
      <FAB
        style={{
          position: "absolute",
          right: 16,
          bottom: 16,
        }}
        icon="plus"
        onPress={onPressAdd}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
