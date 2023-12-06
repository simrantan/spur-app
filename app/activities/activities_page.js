
import { Pressable, StyleSheet, View } from "react-native";

import ActivityCard from "../../components/ActivityCard.js";

import { Text } from "@rneui/themed";

import { FlatList } from "react-native-gesture-handler";
import MiniActivityCard from "../../components/MiniActivityCard";
import { Themes } from "../../assets/Themes";
import { Link, router, Stack } from "expo-router";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry.js";

function getLikedActivities() {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9];
}

export default function Page() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "My Activities",
        }}
      />
      <View style={styles.main}>
        <FlatList
          data={getLikedActivities()}
          renderItem={(item, index) => <MiniActivityCard />}
          ItemSeparatorComponent={
            <View style={{ height: 1, backgroundColor: "lightgray" }} />
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: Themes.bg,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    // marginHorizontal: 10,
    backgroundColor: Themes.bgSecondary,
    flexGrow: 1,
    width: "100%",
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
