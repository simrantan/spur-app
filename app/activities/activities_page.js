import { StyleSheet, View } from "react-native";
import { Text } from "@rneui/themed";

import { Link } from "expo-router";
import { FlatList } from "react-native-gesture-handler";
import MiniActivityCard from "../../components/MiniActivityCard";
import { Themes } from "../../assets/Themes";

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          renderItem={() => <MiniActivityCard />}
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
    marginHorizontal: "auto",
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
