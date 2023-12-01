import { StyleSheet, Text, View } from "react-native";
import ActivityCard from "../../components/ActivityCard.js";
import Checklist from "../../components/Checklist.js";
import { Themes } from "../../assets/Themes/index.js";

import { Link } from "expo-router";

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <ActivityCard> </ActivityCard>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: Themes.bg,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
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
