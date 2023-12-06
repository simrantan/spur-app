import { StyleSheet, Text, View } from "react-native";
import ActivityCard from "../../components/ActivityCard.js";
import Checklist from "../../components/Checklist.js";
import { Themes } from "../../assets/Themes/index.js";
import MiniActivityCard from "../../components/MiniActivityCard.js";
import Icons from "../../assets/Icons";
import { Image } from "react-native";

import { Link } from "expo-router";
import InterestedFriendsList from "../../components/friendComponents/InterestedFriendsList.js";
import PeopleChecklistItem from "../../components/friendComponents/PeopleChecklistItem.js";
import ActivityCardFront from "../../components/ActivityCardFront.js";
import ActivityCardBack from "../../components/ActivityCardBack.js";

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <ActivityCardFront />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Themes.bg,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    width: "100%",
    borderColor: "red",
    borderWidth: 3,
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
