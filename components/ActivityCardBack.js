import { StyleSheet, View, Image, Dimensions, ScrollView } from "react-native";
import { Text, Button } from "@rneui/themed";
import { Themes } from "../assets/Themes";
import Checklist from "./Checklist";
import QuickInfo from "./QuickInfo";
import InterestedFriendsList from "./friendComponents/InterestedFriendsList";
import { router, Stack, useNavigation } from "expo-router";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

export default function ActivityCard({
  index,
  activityImageUri,
  activityTitle,
  quickInfo, // dist, time, participants, activityType, cost
  interestedFriendIds, // array of friend objects, each of which has a name and profile image
  description,
  needsList,
  func,
}) {
  return (
    <ScrollView>
      <View style={styles.card_box}>
        <View style={styles.aboveButton}>
          <View style={styles.aboveChecklist}>
            <Text style={styles.smalltitle}>What is it?</Text>
            <Text style={styles.bodytext}>{description}</Text>
            <Text style={styles.smalltitle}>What you'll need</Text>
            <Checklist needsList={needsList} />
            <Text style={styles.smalltitle}>Interested Friends</Text>
          </View>
          <View style={{ margin: 10 }}>
            <InterestedFriendsList interestedFriendIds={interestedFriendIds} />
          </View>
        </View>
        <Button title="Spur Friends" size="sm" onPress={func} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  aboveChecklist: {
    marginHorizontal: 10,
  },
  card_box: {
    backgroundColor: Themes.bgSecondary,
    flexDirection: "column",

    borderRadius: 10,
    justifyContent: "space-between",
    minheight: windowHeight * 0.7,
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

    margin: 20,
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
    alignSelf: "center",
    width: "100%",
    borderRadius: 10,
    marginTop: 10,
  },
  bigtitle: {
    fontSize: 40,
    color: Themes.textPrimary,
    marginVertical: 10,
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
});

ActivityCard.defaultProps = {
  number: 1,
  activityImageUri:
    "https://www.desertsun.com/gcdn/presto/2023/05/09/PPAS/57ffb2bc-ce8e-435a-95e1-008a09acf033-pickleball_feature_1.jpg",
  activityTitle: "Pickleball",
  interestedFriendIds: "[0, 1, 3, 4]",
  description:
    "Lorem ipsum dolor sit amet, ulla sit amet enim scelerisque varius. Aenean euismod, nisl eget ultricies dapibus, erat velit aliquet leo, sed venenatis tellus nisi nec augue. Sed eget justo quis metus lacinia aliquet. Sed sed justo quis nunc ultricies porta. Donec nec nisi sit amet ante ultrices tincidunt. Nulla facilisi. Nulla facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla facilisi.",
  needsList: ["water", "snacks", "sunscreen", "hat"],
  quickInfo: {
    dist: "0.5 mi",
    time: "1 hr",
    participants: 1,
    activityType: "sport",
    cost: "cheap",
  },
};
