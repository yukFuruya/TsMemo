import { FlatList, StyleSheet } from "react-native";
import { getDiaryDocs, getDiarys } from "../lib/firebase";
import { DiaryItem } from "../components/DiaryItem";
import { FAB } from "react-native-paper";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "../components/Themed";
import { RootStackParamList } from "../types";
import { Calendar } from "react-native-calendars";
import { getUsers } from "../lib/firebase";
import { Diary } from "../types/diary";
import { User } from "../types/user";
import { StackNavigationProp } from "@react-navigation/stack";
import firebase from "firebase";

type Props = {
  // navigation: RootTabScreenProps<"TabOne">
  navigation: StackNavigationProp<RootStackParamList, "User">;
};

export default function TabOneScreen(this: any, { navigation }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [diarys, setDiarys] = useState<Diary[]>([]);
  const [selected, setSelected] = useState("");
  const [dates, setDates] = useState<String[]>([]);
  
  // 最初だけ
  useEffect(() => {
    // usersを代入する
    getFirebaseItems();
  }, []);

  // タップした時だけ走る処理
  useEffect(() => {
    // diarysを代入する
    fetchDiarys();
  }, [selected]);

  // diarysが変化した時だけ走る処理
  useEffect(() => {
    // datesを代入する
    fetchDates();
  }, [diarys]);

  // 選択してる日付を代入 
  const onDayPress = useCallback((day) => {
    setSelected(day.dateString);
  }, []);

  const marked = useMemo(() => {
    let selectInfo = {
      // 選択した日付
      [selected]: {
        selected: true,
        disableTouchEvent: false,
        selectedColor: "skyblue",
        selectedTextColor: "white",
      },
    };

    let dotInfo = {};
    let smallDotInfo = {};
    for (let i = 0; i < dates.length; i++) {
      if (selected == String(dates[i])) {
        smallDotInfo = {
          [String(dates[i])]: {
            dotColor: "red",
            marked: true,
            selected: true,
            disableTouchEvent: false,
            selectedColor: "skyblue",
            selectedTextColor: "white",
          },
        };
      } else {
        smallDotInfo = {
          [String(dates[i])]: {
            dotColor: "red",
            marked: true,
          },
        };
      }

      dotInfo = Object.assign(dotInfo, smallDotInfo);
    }

    selectInfo = Object.assign(selectInfo, dotInfo);
    return selectInfo;
  }, [selected, dates]);

  const getFirebaseItems = async () => {
    const users = await getUsers();
    setUsers(users);
  };

  const fetchDiarys = async () => {
    const diarys = await getDiarys(
      firebase.firestore.Timestamp.fromDate(new Date(selected))
    );
    setDiarys(diarys);
  }

  const fetchDates = async () => {
    const diaryDocs = await getDiaryDocs();
    const createdAtList = diaryDocs.map((doc) => {
      const milliSec = doc.createdAt.seconds * 1000;
      const createdAtDate = new Date(milliSec);
      return createdAtDate.toISOString().substring(0, 10);
    });
    setDates(createdAtList);
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
    backgroundColor: "papayawhip",
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
