import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { Themes } from "../assets/Themes";
import { Link, Stack } from "expo-router";
import { millisToMinutesAndSeconds } from "../utils";
import Ionicons from "@expo/vector-icons/Ionicons";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

export default function Song({
  id,
  activityPhoto,
  friend,
  quickInfo,
  time,
  address,
  isAccepted,
}) {
  return <View style={styles.item}></View>;
}

const styles = StyleSheet.create({
  item: {
    width: windowWidth,
    backgroundColor: "white",
    padding: 2,
    marginVertical: 8,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 10,
    height: windowWidth * 0.3,
  },
  activityInfo: {
    flexDirection: "row",
  },

  image: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    resizeMode: "contain",
    justifyContent: "center",
  },
});
