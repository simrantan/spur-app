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

export default function ActivityCard({
  activityImageUri,
  activityTitle,
  quickInfo, // dist, time, participants, activityType, cost
  interestedFriends, // array of friend objects, each of which has a name and profile image
  description,
  needsList,
}) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card_box}>
        <Image style={styles.image} source={{ uri: activityImageUri }} />
        <View style={styles.belowFold}>
          <Text style={styles.bigtitle}>{activityTitle}</Text>
          <QuickInfo quickInfo={quickInfo} size={25} />
          <Text style={styles.smalltitle}>What is it?</Text>
          <Text style={styles.bodytext}>{description}</Text>
          <Text style={styles.smalltitle}>What you'll need</Text>
          <Checklist needsList={needsList} />
          <Text style={styles.smalltitle}>Interested Friends</Text>
        </View>
        <InterestedFriendsList interestedFriends={interestedFriends} />
        <View style={styles.button}>
          <Text style={styles.buttonText}>Spur Friends</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card_box: {
    backgroundColor: Themes.bgSecondary,
    // padding: 2,
    marginVertical: 8,
    flexDirection: "column",
    // alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 10,
    // marginLeft: 10,
    paddingBottom: 10,
  },
  aboveFold: {
    flexDirection: "column",
    justifyContent: "center",
    // margin: 10,
    backgroundColor: "green",
  },
  belowFold: {
    flexDirection: "column",
    justifyContent: "flex-start",
    marginLeft: 10,
    marginRight: 10,
  },
  checkbox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    direction: "ltr",
    margin: 4,
    width: windowWidth * 0.9,
  },
  timebox: {
    flexDirection: "row",
    justifyContent: "center",
    direction: "ltr",
    margin: 4,
    width: 40,
    height: 20,
    alignItems: "center",
  },
  distbox: {
    flexDirection: "row",
    justifyContent: "center",
    direction: "ltr",
    margin: 4,
    width: 20,
    height: 20,
  },
  button: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.07,
    borderRadius: 10,
    backgroundColor: Themes.buttonPrimaryFill,
    color: Themes.buttonPrimaryText,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    margin: 10,
  },
  buttonText: {
    color: Themes.buttonPrimaryText,
    fontSize: 24,
  },
  image: {
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "flex-start",
    resizeMode: "cover",
    flex: 1,
    height: windowHeight * 0.6,
    width: "94%",
    alignSelf: "center",
    margin: 10,
    borderRadius: 10,
  },

  bigtitle: {
    fontSize: 40,
    color: Themes.textPrimary,
  },
  smalltitle: {
    fontSize: 28,
    color: Themes.textPrimary,
    paddingTop: 15,
  },
  bodytext: {
    fontSize: 16,
    color: Themes.textPrimary,
  },
  container: {
    flex: 1,
  },
});

ActivityCard.defaultProps = {
  number: 1,
  activityImageUri:
    "https://www.desertsun.com/gcdn/presto/2023/05/09/PPAS/57ffb2bc-ce8e-435a-95e1-008a09acf033-pickleball_feature_1.jpg",
  activityTitle: "Pickelball",
  interestedFriends: [
    {
      name: "John Doe",
      profileImage: require("../assets/Images/john_doe.png"),
    },
    {
      name: "Nils Forstall",
      profileImage: require("../assets/Images/john_doe.png"),
    },
    {
      name: "Jeremy Bentham Nickels",
      profileImage: require("../assets/Images/john_doe.png"),
    },
    {
      name: "John Doe",
      profileImage: require("../assets/Images/john_doe.png"),
    },
    {
      name: "John Doe",
      profileImage: require("../assets/Images/john_doe.png"),
    },
    {
      name: "John Doe",
      profileImage: require("../assets/Images/john_doe.png"),
    },
  ],
  description:
    "Lorem ipsum dolor sit amet, ulla sit amet enim scelerisque varius. Aenean euismod, nisl eget ultricies dapibus, erat velit aliquet leo, sed venenatis tellus nisi nec augue. Sed eget justo quis metus lacinia aliquet. Sed sed justo quis nunc ultricies porta. Donec nec nisi sit amet ante ultrices tincidunt. Nulla facilisi. Nulla facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla facilisi.",
  needsList: ["water", "snacks", "sunscreen", "hat"],
  quickInfo: {
    dist: "0.5 mi",
    time: "1 hr",
    participants: 1,
    activityType: "walk",
    cost: "cheap",
  },
};
