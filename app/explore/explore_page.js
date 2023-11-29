import { StyleSheet, Text, View } from "react-native";
import ActivityCard from "../../components/ActivityCard";
import SwipeStack from "../../components/SwipeStack";
import { Link } from "expo-router";
import MyTinderCard from "../../components/MyTinderCard";

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Explore</Text>
        <MyTinderCard />
        <SwipeStack />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
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
