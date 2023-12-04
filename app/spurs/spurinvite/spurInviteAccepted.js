import {
  Button,
  StyleSheet,
  SafeAreaView,
  Text,
  Pressable,
  Image,
  Dimensions,
  FlatList,
} from "react-native";

import { Button, Text } from "@rneui/themed";
import { router, Stack } from "expo-router";
import QuickInfo from "../../../components/QuickInfo";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

export default function Accepted(
  activityTitle,
  activityPhoto,
  address,
  time,
  quickInfo,
  interestedFriends,
  needsList
) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>{activityTitle}</Text>
        <QuickInfo quickInfo={quickInfo} size={30} />
        <Text>Attendees</Text>
        <InterestedFriendsList interestedFriends={interestedFriends} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Themes.colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  button_text: {
    color: Themes.colors.white,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    margin: 15,
  },
  button_style: {
    width: windowWidth * 0.7,
    height: windowWidth * 0.17,
    backgroundColor: Themes.colors.spotify,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    borderRadius: 30,
  },
  header_style: {
    backgroundColor: Themes.colors.background,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  icon: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    margin: 15,
  },
});
