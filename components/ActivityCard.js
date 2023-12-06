import { StyleSheet, View, Image, Dimensions, ScrollView } from "react-native";
import { Text } from "@rneui/themed";
import { Themes } from "../assets/Themes";
import Checklist from "./Checklist";
import QuickInfo from "./QuickInfo";
import InterestedFriendsList from "./friendComponents/InterestedFriendsList";

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
    <View styles={styles.container}>
      <ScrollView>
        <View style={styles.card_box}>
          <View style={styles.aboveChecklist}>
            <Image style={styles.image} source={{ uri: activityImageUri }} />
            <Text style={styles.bigtitle}>{activityTitle}</Text>
            <QuickInfo quickInfo={quickInfo} size={20} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 100,
  },
  aboveChecklist: {
    marginHorizontal: 10,
  },
  card_box: {
    backgroundColor: Themes.bgSecondary,
    flexDirection: "column",
    justifyContent: "flex-start",
    borderRadius: 10,
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
    marginBottom: 30,
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
  container: {
    flex: 1,
  },
});

ActivityCard.defaultProps = {
  number: 1,
  activityImageUri:
    "https://www.desertsun.com/gcdn/presto/2023/05/09/PPAS/57ffb2bc-ce8e-435a-95e1-008a09acf033-pickleball_feature_1.jpg",
  activityTitle: "Pickleball",
  interestedFriends: [
    {
      name: "John Doe",
      profileImage:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    {
      name: "Nils Forstall",
      profileImage:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    {
      name: "Jeremy Bentham Nickels",
      profileImage:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    {
      name: "John Doe",
      profileImage:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    {
      name: "John Doe",
      profileImage:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    {
      name: "John Doe",
      profileImage:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
  ],
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
