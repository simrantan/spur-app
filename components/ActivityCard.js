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

export default function ActivityCard({
  activityImage,
  activityTitle,
  dist,
  time,
  participants,
  friendName1,
  friendName2,
  activityType,
  cost,
  description,
  need1,
  need2,
  need3,
}) {
  const participantsIcon = "";
  if (participants == 1) {
    participantsIcon = "people";
  }
  return (
    //change names of all icons these r just placeholders
    //do checkboxes need to be pressable? why are the pressable also
    <ScrollView contentContainerStyle={styles.card_box}>
      <View styles={styles.aboveFold}>
        <Image style={styles.image} source={activityImage} />
        <Text style={styles.bigtitle}>{activityTitle}</Text>
        <View styles={styles.icons_box}>
          <Ionicons name={participantsIcon} size={20} color="black" />
          <Ionicons name={cost} size={20} color="black" />
          <Ionicons name={activityType} size={20} color="black" />
          <View style={styles.distbox}>
            <Text>{dist}</Text>
          </View>
          <View style={styles.timebox}>
            <Ionicons name="time" size={20} color="black" />
            <Text>{time}</Text>
          </View>
        </View>
        <View styles={styles.belowFold}>
          <Text style={styles.smalltitle}>What is it?</Text>
          <Text style={styles.bodytext}>{description}</Text>
          <Text style={styles.smalltitle}>What you'll need</Text>
          <View style={styles.checkbox}>
            <Ionicons name="square-outline" size={20} color="black" />
            <Text style={styles.bodytext}>{need1}</Text>
          </View>
          <View style={styles.checkbox}>
            <Ionicons name="square-outline" size={20} color="black" />
            <Text style={styles.bodytext}>{need2}</Text>
          </View>
          <View style={styles.checkbox}>
            <Ionicons name="square-outline" size={20} color="black" />
            <Text style={styles.bodytext}>{need3}</Text>
          </View>
          <Text style={styles.smalltitle}>Interested Friends</Text>
          <ScrollView contentContainerStyle={styles.checkbox} horizontal={true}>
            <View style={styles.friendbox}>
              {/* <Image
                style={styles.friendimage}
                source={interestedFriendsProfiles[0]}
              /> */}
              <Text style={styles.friendName}>{friendName1}</Text>
            </View>
            <View style={styles.friendbox}>
              {/* <Image
                style={styles.friendimage}
                source={interestedFriendsProfiles[1]}
              /> */}
              <Text style={styles.friendName}>{friendName2}</Text>
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={styles.button}>
        <Text style={styles.smalltitle}>Spur Friends</Text>
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
    height: windowWidth * 0.2,
    borderRadius: 10,
    backgroundColor: "pink",
    justifyContent: "center",
  },
  icon: {
    flexDirection: "column",
    justifyContent: "center",
  },
  image: {
    flexDirection: "column",
    justifyContent: "center",
    resizeMode: "contain",
    width: windowWidth * 0.8,
    height: windowWidth * 0.5,
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
    color: "black",
  },

  bigtitle: {
    fontSize: 36,
    color: "black",
  },
  smalltitle: {
    fontSize: 28,
    color: "black",
  },
  bodytext: {
    fontSize: 14,
    color: "black",
  },
});