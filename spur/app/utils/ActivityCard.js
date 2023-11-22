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
  return (
    <ScrollView style={styles.card_box}>
      <View styles={styles.aboveFold}>
        <Image style={styles.image} source={activityImage} />
        <Text style={styles.name}>{activityTitle}</Text>
        <View styles={styles.icons_box}></View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card_box: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.9,
    backgroundColor: "green",
    padding: 2,
    marginVertical: 8,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 10,
  },
  aboveFold: {
    flexDirection: "column",
    justifyContent: "center",
    margin: 4,
  },
  belowFold: {
    flexDirection: "column",
    justifyContent: "flex-start",
    margin: 4,
  },
  icons_box: {
    flexDirection: "row",
    justifyContent: "space-around",
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
    color: "white",
  },
});
