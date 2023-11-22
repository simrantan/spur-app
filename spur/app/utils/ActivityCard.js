import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
  ScrollView,
} from "react-native";
import { Themes } from "../assets/Themes";
import { Link, Stack } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

export default function Song({
  number,
  activityImage,
  activityTitle,
  dist,
  time,
  participants,
  interestedFriends,
  activityType,
  cost,
  description,
  needsList,
}) {
  return <ScrollView></ScrollView>;
}

const styles = StyleSheet.create({
  card_box: {
    width: windowWidth,
    backgroundColor: Themes.colors.background,
    padding: 2,
    marginVertical: 8,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 10,
    height: windowWidth * 0.2,
  },
  albumbox: {
    flexDirection: "column",
    justifyContent: "center",
    direction: "ltr",
    margin: 4,
    width: windowWidth * 0.25,
  },
  titlebox: {
    flexDirection: "column",
    justifyContent: "center",
    direction: "ltr",
    margin: 4,
    width: windowWidth * 0.3,
  },
  icon: {
    flexDirection: "column",
    justifyContent: "center",
  },
  image: {
    flexDirection: "column",
    justifyContent: "center",
  },

  name: {
    fontSize: 14,
    color: Themes.colors.white,
  },
});
