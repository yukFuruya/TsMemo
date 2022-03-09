import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { Calendar } from "react-native-calendars";
import { app, db } from "../App";
import { collection, getDocs } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

export default function TabOneScreen(
  this: any,
  { navigation }: RootTabScreenProps<"TabOne">
) {
  const onPressAdd = () => {
    navigation.navigate("NewPost"); // (3)
  };
  const getFirebaseItems = async () => {
    const snapshot = await getDocs(collection(db, "user"));
    const names = snapshot.docs.map((doc) => doc.data());
    console.log(names);
    return (
      <View>
        <Text>{names}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Calendar
        monthFormat={"yyyy年 M月"}
        onDayPress={this.onDayPress}
        markingType={"period"}
        markedDates={{
          "2022-02-21": { startingDay: true, color: "#50cebb", selected: true },
          "2022-02-22": { color: "#70d7c7", selected: true },
          "2022-02-23": { color: "#70d7c7", selected: true },
          "2022-02-24": { color: "#70d7c7", selected: true },
          "2022-02-25": { endingDay: true, color: "#50cebb", selected: true },
        }}
      />
      {getFirebaseItems}
      
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
