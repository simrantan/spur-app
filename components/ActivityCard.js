import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
  ScrollView,
  CheckBox,
  FlatList,
} from "react-native";
import { Themes } from "../assets/Themes";
import { Link, Stack } from "expo-router";
import Checklist from "./Checklist";

import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

function PriceSymbol({ cost }) {
  if (cost === "free") {
    return <Text style={{ color: "black" }}>Free</Text>;
  }
  if (cost === "cheap") {
    return (
      <View style={{ flexDirection: "row" }}>
        <Text style={{ color: "black" }}>$</Text>
        <Text style={{ color: "lightgray" }}>$$</Text>
      </View>
    );
  }
  if (cost === "moderate") {
    return (
      <View style={{ flexDirection: "row" }}>
        <Text style={{ color: "black" }}>$$</Text>
        <Text style={{ color: "lightgray" }}>$</Text>
      </View>
    );
  }
  if (cost === "expensive") {
    return <Text style={{ color: "black" }}>$$$</Text>;
  }
  return <Text style={{ color: "black" }}>Price Unknown</Text>;
}

export default function ActivityCard({
  number,
  activityImage,
  activityTitle,
  dist,
  time,
  participants,
  interestedFriendsProfiles,
  interestedFriendsNames,
  activityType,
  cost,
  description,
  needsList,
}) {
  var participantsIcon = "people-outline";
  if (participants == 1) {
    participantsIcon = "people";
  }
  // cost = "expensive";
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.card_box}>
        <Image style={styles.image} source={activityImage} />
        <Text style={styles.bigtitle}>{activityTitle}</Text>

        <View style={styles.iconsbox}>
          <Ionicons name={participantsIcon} size={20} color="black" />
          <PriceSymbol cost={cost} />
          <Ionicons name={activityType} size={20} color="black" />
          <View style={styles.distbox}>
            <Text>{dist}</Text>
          </View>
          <View style={styles.timebox}>
            <Ionicons name="time" size={20} color="black" />
            <Text>{time}</Text>
          </View>
        </View>
        <View style={styles.belowFold}>
          <Text style={styles.smalltitle}>What is it?</Text>
          <Text style={styles.bodytext}>{description}</Text>
          <Text style={styles.smalltitle}>What you'll need</Text>
          <Checklist needsList={needsList} />
          <Text style={styles.smalltitle}>Interested Friends</Text>
          <ScrollView contentContainerStyle={styles.checkbox} horizontal={true}>
            <View style={styles.friendbox}>
              {/* <Image
                  style={styles.friendimage}
                  source={interestedFriendsProfiles[0]}
                /> */}
              <Text
                style={styles.friendName}
                source={interestedFriendsNames[0]}
              />
            </View>
            <View style={styles.friendbox}>
              {/* <Image
                  style={styles.friendimage}
                  source={interestedFriendsProfiles[1]}
                /> */}
              <Text
                style={styles.friendName}
                source={interestedFriendsNames[1]}
              />
            </View>
          </ScrollView>
        </View>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Spur Friends</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card_box: {
    backgroundColor: Themes.bgSecondary,
    // padding: 2,
    marginVertical: 8,
    // flex: 1,
    flexDirection: "column",
    // alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 10,
    // marginLeft: 10,
    paddingBottom: 30,
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
    margin: 10,
  },
  iconsbox: {
    borderColor: "black",
    borderStyle: "solid",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  checkbox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    direction: "ltr",
    margin: 4,
    width: windowWidth * 0.9,
  },
  friendbox: {
    flexDirection: "column",
    justifyContent: "center",
    width: 40,
    height: 50,
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
  },
  buttonText: {
    color: Themes.buttonPrimaryText,
    fontSize: 24,
  },
  icon: {
    flexDirection: "column",
    justifyContent: "center",
  },
  image: {
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "flex-start",
    resizeMode: "cover",
    width: windowWidth,
    height: windowHeight * 0.6,
    // height: "100%",
  },
  friendimage: {
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 12,
    resizeMode: "contain",
    width: windowWidth * 40,
    height: 40,
  },
  friendName: {
    fontSize: 10,
    color: Themes.textPrimary,
  },

  bigtitle: {
    fontSize: 40,
    color: Themes.textPrimary,
    paddingLeft: 10,
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
  activityImage: require("../assets/Images/pickleball2.webp"),
  activityTitle: "Pickelball",
  dist: "0.5 mi",
  time: "1 hr",
  participants: 1,
  interestedFriendsProfiles: [
    // require("../assets/profiles/1.png"),
    // require("../assets/profiles/2.png"),
  ],
  interestedFriendsNames: ["John", "Jane"],
  activityType: "walk",
  cost: "cheap",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis viverra tortor. Suspendisse potenti. Duis sit amet odio vitae nisi finibus ultricies. Praesent nec semper nisi. Donec sed ultrices velit. Duis quis ligula at nisl aliquam ullamcorper. Sed euismod, leo vitae lacinia ultricies, justo nunc condimentum purus, vitae ultricies sapien nisl id dolor. Sed nec nulla sit amet enim scelerisque varius. Aenean euismod, nisl eget ultricies dapibus, erat velit aliquet leo, sed venenatis tellus nisi nec augue. Sed eget justo quis metus lacinia aliquet. Sed sed justo quis nunc ultricies porta. Donec nec nisi sit amet ante ultrices tincidunt. Nulla facilisi. Nulla facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla facilisi.",
  needsList: ["water", "snacks", "sunscreen", "hat"],
};
