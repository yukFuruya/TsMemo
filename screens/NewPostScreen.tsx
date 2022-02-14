import { StatusBar } from "expo-status-bar";
import React, { FC } from "react";
import { Platform, StyleSheet, TextComponent, TextInput } from "react-native";

import { Text, View } from "../components/Themed";

export default function NewPostScreen() {
  const [memo, onChangeMemo] = React.useState("");

  return (
    <View>
      <TextInput
        multiline
        style={styles.input}
        onChangeText={onChangeMemo}
        value={memo}
        placeholder="今日はどんなことがありましたか？"
        keyboardType="default"
      />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 150,
    margin: 5,
    borderWidth: 1,
    padding: 4,
    backgroundColor: "skyblue",
  },
});
