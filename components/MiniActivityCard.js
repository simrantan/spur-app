import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
  ScrollView,
  FlatList,
  ImageBackground,
} from "react-native";
import { Themes } from "../assets/Themes";
import { Link, Stack } from "expo-router";
import Checklist from "./Checklist";
import QuickInfo from "./QuickInfo";
import InterestedFriendsList from "./InterestedFriendsList";

import Ionicons from "@expo/vector-icons/Ionicons";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

export default function MiniActivityCard({
  activityImageUri,
  activityTitle,
  quickInfo, // dist, time, participants, activityType, cost
}) {
  return (
    <View style={styles.mini_card_box}>
      <Image style={styles.image} source={{ uri: activityImageUri }} />
      <View style={styles.info}>
        <Text style={styles.title}>{activityTitle}</Text>
        <QuickInfo quickInfo={quickInfo} size={20} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mini_card_box: {
    width: windowWidth * 0.9,
    // backgroundColor: Themes.bgSecondary,
    // padding: 2,
    marginVertical: 8,
    flexDirection: "row",
    // alignItems: "center",
    alignContent: "flex-start",
    alignItems: "flex-start",
    // borderRadius: 5,
    // marginLeft: 10,
    padding: 10,
    margin: 5,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  title: {
    fontSize: 30,
    color: Themes.textPrimary,
    paddingBottom: 10,
  },
  container: {
    flex: 1,
  },
  info: {
    flexDirection: "column",
    justifyContent: "flex-start",
    flexGrow: 1,
    alignContent: "space-around",
  },
});

MiniActivityCard.defaultProps = {
  activityImageUri:
    "https://www.desertsun.com/gcdn/presto/2023/05/09/PPAS/57ffb2bc-ce8e-435a-95e1-008a09acf033-pickleball_feature_1.jpg",
  activityTitle: "Pickelball",
  quickInfo: {
    dist: "0.5 mi",
    time: "1 hr",
    participants: 1,
    activityType: "walk",
    cost: "cheap",
  },
};
