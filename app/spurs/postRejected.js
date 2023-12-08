import {
  StyleSheet,
  SafeAreaView,
  Pressable,
  Image,
  Dimensions,
  FlatList,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";

import { Link, Stack, router, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { palette } from "../../assets/Themes/palette";

import { Button, Text } from "@rneui/themed";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

export default function Rejected() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: "Spurs",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            router.push("spurs/postRejected");
          }}
          style={{ marginLeft: -17 }}
        >
          <Ionicons name="chevron-back" size={30} color={palette.beige} />
        </TouchableOpacity>
      ),
    });
  }, []);
  return (
    <SafeAreaView style={styles.item}>
      <Stack.Screen
        options={{
          title: "Spurs",
          headerLeft: null,
        }}
      ></Stack.Screen>
      <Button
        title="Create a New Spur"
        size="lg"
        style={styles.button}
        onPress={() => {
          router.push({
            pathname: "nsp/NewSpurPage",
            params: { id: 1, pagename: "spurs/postRejected" },
          });
        }}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  item: {
    flex: 1,
    width: windowWidth,
    justifyContent: "center",
    alignItems: "center", // Align items to the center
    paddingTop: 0, // Set paddingTop to remove the top padding
    backgroundColor: palette.beige,
  },
  promptbox: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.1,
    marginVertical: 3,
  },
  textbox: {
    width: windowWidth * 0.5,
    height: windowWidth * 0.1,
    backgroundColor: "white",
    borderRadius: 5,
    marginVertical: 3,
  },
  from: {
    flexDirection: "row",
  },
  activityInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  activityDetails: {
    flexDirection: "column",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    direction: "ltr",
  },
  col: {
    flexDirection: "row",
  },
  button: {
    width: windowWidth * 0.8,
    alignSelf: "center",
    marginBottom: 20,
  },
});
