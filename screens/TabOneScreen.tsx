import { FlatList, ShadowPropTypesIOS, StyleSheet } from "react-native";
import { getDiarys } from "../lib/firebase";
import { DiaryItem } from "../components/DiaryItem";
import { FAB } from "react-native-paper";
import React, { useEffect, useState } from "react";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootStackParamList, RootTabScreenProps } from "../types";
import { Calendar } from "react-native-calendars";
import { getUsers } from "../lib/firebase";
import { Diary } from "../types/diary";
import { User } from "../types/user";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type Props = {
  // navigation: RootTabScreenProps<"TabOne">
  navigation: StackNavigationProp<RootStackParamList, "User">;
};

export default function TabOneScreen(this: any, { navigation }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [diarys, setDiarys] = useState<Diary[]>([]);
  useEffect(() => {
    getFirebaseItems();
    const fetchDiarys = async () => {
      const diarys = await getDiarys("R7dS60eyiSPFyrcbGLP8");
      setDiarys(diarys);
    };
    fetchDiarys();
  }, []);

  const getFirebaseItems = async () => {
    const users = await getUsers();
    setUsers(users);
  };

  const userItems = users.map((user, index) => (
    <View style={{ margin: 10 }} key={index.toString()}>
      <Text>{user.age}</Text>
      <Text>{user.family}</Text>
      <Text>{user.last}</Text>
    </View>
  ));
  const onPressAdd = (user: User) => {
    navigation.navigate("NewPost", { user }); // (3)
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <Calendar
            monthFormat={"yyyy年 M月"}
            onDayPress={this.onDayPress}
            markingType={"period"}
          />
        }
        data={diarys}
        renderItem={({ item }) => <DiaryItem diary={item} />}
        keyExtractor={(item) => item.id}
      />
      {userItems}
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
