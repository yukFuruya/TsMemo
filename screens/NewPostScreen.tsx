import { StatusBar } from "expo-status-bar";
import React, { FC, useState, useEffect, useContext } from "react";
import { Platform, StyleSheet, TextComponent, TextInput } from "react-native";
import { TextArea } from "../components/TextArea";
import { StarInput } from "../components/StarInput";
import { Text, View } from "../components/Themed";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, RootTabScreenProps } from "../types";
import { Button } from "react-native-elements";
import { addDiary } from "../lib/firebase";
import firebase, { firestore } from "firebase";
import { Diary } from "../types/diary";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

type Props = {
  // navigation: RootTabScreenProps<"TabOne">;
  navigation: StackNavigationProp<RootStackParamList, "NewPost">;
  route: RouteProp<RootStackParamList, "NewPost">;
};

export default function NewPostScreen(this: any, { navigation, route }: Props) {
  const { user } = route.params;
  const [text, setText] = useState<string>("");
  const [score, setScore] = useState<number>(3);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          onPress={() => navigation.navigate("TabOne")}
          title="CANCEL"
          icon={{
            name: "ban",
            type: "font-awesome",
            size: 15,
            color: "white",
          }}
          titleStyle={{ fontWeight: "700" }}
          buttonStyle={{
            backgroundColor: "salmon",
            borderColor: "transparent",
            borderRadius: 10,
            paddingLeft: 3,
          }}
          containerStyle={{
            width: 100,
          }}
        />
      ),
      headerRight: () => (
        <Button
          onPress={() => {
            onSubmit;
            navigation.navigate("TabOne");
          }}
          title="POST"
          icon={{
            name: "paper-plane",
            type: "font-awesome",
            size: 15,
            color: "white",
          }}
          titleStyle={{ fontWeight: "700" }}
          buttonStyle={{
            backgroundColor: "rgba(90, 154, 230, 1)",
            borderColor: "transparent",
            borderRadius: 10,
            paddingLeft: 3,
          }}
          containerStyle={{
            width: 100,
          }}
        />
      ),
    });
  }, [user]);

  const onSubmit = async () => {
    const diary = {
      user: {
        name: user.family,
        id: user.id,
      },
      title: "test title",
      text,
      score,
      updatedAt: firebase.firestore.Timestamp.now(),
      createdAt: firebase.firestore.Timestamp.now(),
    } as Diary;
    await addDiary(diary.user.id, diary);
  };

  return (
    <View style={styles.container}>
      <StarInput score={score} onChangeScore={(value) => setScore(value)} />
      <TextArea
        value={text}
        onChangeText={(value) => setText(value)}
        label="本文"
        placeholder="今日はどんなことがありましたか？"
      />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});
