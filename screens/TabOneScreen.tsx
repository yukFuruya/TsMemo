import { ShadowPropTypesIOS, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import React, { useEffect, useState } from "react";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootStackParamList, RootTabScreenProps } from "../types";
import { Calendar } from "react-native-calendars";
import { getUsers } from "../lib/firebase";
import { User } from "../types/user";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type Props = {
  // navigation: RootTabScreenProps<"TabOne"> 
  navigation: StackNavigationProp<RootStackParamList, "User"> 
  route: RouteProp<RootStackParamList, "User">;
}

export default function TabOneScreen( this: any, { navigation, route }: Props) {
  const { user } = route.params;
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    getFirebaseItems();
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

  const onPressAdd = () => {
    navigation.navigate("NewPost", { user }); // (3)
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
