import { FlatList, ShadowPropTypesIOS, StyleSheet } from "react-native";
import { getDiarys } from "../lib/firebase";
import { DiaryItem } from "../components/DiaryItem";
import { FAB } from "react-native-paper";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootStackParamList, RootTabScreenProps } from "../types";
import { Calendar } from "react-native-calendars";
import { getUsers } from "../lib/firebase";
import { Diary } from "../types/diary";
import { User } from "../types/user";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import firebase from "firebase";

type Props = {
  // navigation: RootTabScreenProps<"TabOne">
  navigation: StackNavigationProp<RootStackParamList, "User">;
};

const INITIAL_DATE = "2022-07-06";

export default function TabOneScreen(this: any, { navigation }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [diarys, setDiarys] = useState<Diary[]>([]);
  const [selected, setSelected] = useState(INITIAL_DATE);
  useEffect(() => {
    getFirebaseItems();
    const fetchDiarys = async () => {
      const diarys = await getDiarys(
        firebase.firestore.Timestamp.fromDate(new Date(selected))
      );
      setDiarys(diarys);
    };
    fetchDiarys();
  }, [selected]);

  const onDayPress = useCallback((day) => {
    setSelected(day.dateString);
  }, []);

  const marked = useMemo(() => {
    return {
      [selected]: {
        selected: true,
        disableTouchEvent: false,
        selectedColor: "skyblue",
        selectedTextColor: "white",
      },
      ["2022-07-22"]: {
        dotColor: "red",
        marked: true,
      },
    };
  }, [selected]);

  const getFirebaseItems = async () => {
    const users = await getUsers();
    setUsers(users);
  };

  const onPressAdd = (user: User) => {
    navigation.navigate("NewPost", { user }); // (3)
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <Calendar
            monthFormat={"yyyy年 M月"}
            onDayPress={onDayPress}
            markedDates={marked}
          />
        }
        data={diarys}
        renderItem={({ item }) => <DiaryItem diary={item} />}
        keyExtractor={(item) => item.id}
      />
      <FAB
        style={{
          position: "absolute",
          right: 16,
          bottom: 16,
        }}
        icon="plus"
        onPress={() => onPressAdd(users[0])}
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
