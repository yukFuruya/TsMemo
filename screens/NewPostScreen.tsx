import { StatusBar } from "expo-status-bar";
import React, { FC, useState, useEffect } from "react";
import { Platform, StyleSheet } from "react-native";
import { TextArea } from "../components/TextArea";
import { StarInput } from "../components/StarInput";
import { View } from "../components/Themed";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, RootTabScreenProps } from "../types";
import { Button } from "react-native-elements";
import { addDiary } from "../lib/firebase";
import firebase from "firebase";
import { Diary } from "../types/diary";
import "react-native-get-random-values";
import { Loading } from "../components/Loading";

type Props = {
  // navigation: RootTabScreenProps<"TabOne">;
  navigation: StackNavigationProp<RootStackParamList, "NewPost">;
  route: RouteProp<RootStackParamList, "NewPost">;
};

export default function NewPostScreen(this: any, { navigation, route }: Props) {
  const { user } = route.params;
  const [content, setContent] = useState<string>("");
  const [stars, setStars] = useState<number>(3);
  const [loading, setLoading] = useState<boolean>(false);

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
          onPress={onSubmit}
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
    setLoading(true);
    const diary = {
      user: {
        family: user.family,
      },
      title: "test title",
      text: content,
      score: stars,
      updatedAt: firebase.firestore.Timestamp.now(),
      createdAt: firebase.firestore.Timestamp.now(),
    } as Diary;
    await addDiary(user.id, diary);

    setLoading(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StarInput score={stars} onChangeScore={(value) => setStars(value)} />
      <TextArea
        value={content}
        onChangeText={(value) => setContent(value)}
        label="本文"
        placeholder="今日はどんなことがありましたか？"
      />
      <Loading visible={loading} />
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
