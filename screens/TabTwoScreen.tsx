import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

import React, { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Avatar, Box, Center, HStack, NativeBaseProvider, Spacer } from "native-base";

const TabTwoScreen = () => {
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      fullName: "Aafreen Khan",
      avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    }, {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      fullName: "Sujitha Mathur",
      avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
    }, {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      fullName: "Anci Barroco",
      avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
    }, {
      id: "68694a0f-3da1-431f-bd56-142371e29d72",
      fullName: "Aniket Kumar",
      avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU"
    }, {
      id: "28694a0f-3da1-471f-bd96-142456e29d72",
      fullName: "Kiara",
      avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
    }];
  return <Box width="90%">
    <FlatList data={DATA} renderItem={({
      item
    }) => <Box borderBottomWidth="1" _dark={{
      borderColor: "gray.600"
    }} borderColor="coolGray.200" pl="4" pr="5" py="2">
        <HStack space="2xl" justifyContent="space-between">
          <Avatar size="24px" source={{
            uri: item.avatarUrl
          }} />
          <Text >
            {item.fullName}
          </Text>
          <Spacer />
        </HStack>
      </Box>} keyExtractor={item => item.id} />
  </Box>;
};

  // const [selectedId, setSelectedId] = useState(null);
  // const Item = ({
  //   item,
  //   onPress,
  //   backgroundColor,
  //   textColor,
  // }: {
  //   item: any;
  //   onPress: any;
  //   backgroundColor: any;
  //   textColor: any;
  // }) => (
  //   <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
  //     <Text style={[styles.title, textColor]}>{item.title}</Text>
  //   </TouchableOpacity>
  // );

  // const renderItem = ({ item }: { item: any }) => {
  //   const backgroundColor = item.id === selectedId ? "white" : "gray";
  //   const color = item.id === selectedId ? "black" : "white";
  //   return (
  //     <Item
  //       item={item}
  //       onPress={() => setSelectedId(item.id)}
  //       backgroundColor={{ backgroundColor }}
  //       textColor={{ color }}
  //     />
  //   );
  // };
export default () => {
  return (
    <View style={styles.container}>
      <NativeBaseProvider>
        <Center flex={1} px="3">
          <TabTwoScreen />
        </Center>
      </NativeBaseProvider>
      {/* <Text style={styles.title}>Tab Two</Text> */}
      {/* <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)" */}
      {/* /> */}
      {/* <EditScreenInfo path="/screens/TabTwoScreen.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  item: {
    padding: 10,
    marginVertical: 1,
    marginHorizontal: 0,
    width: 1000,
  },
});
