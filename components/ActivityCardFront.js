import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import { Text } from "@rneui/themed";
import { Themes } from "../assets/Themes";
import Checklist from "./Checklist";
import QuickInfo from "./QuickInfo";
import InterestedFriendsList from "./friendComponents/InterestedFriendsList";
import {
  FontAwesome,
  MaterialIcons,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

export default function ActivityCard({
  activityImageUri,
  activityTitle,
  quickInfo, // dist, time, participants, activityType, cost
  interestedFriendIds, // array of friend objects, each of which has a name and profile image
  description,
  needsList,
}) {
  return (
    <View style={styles.card_box}>
      <Image style={styles.image} source={{ uri: activityImageUri }} />
      <Pressable style={styles.moreInfoButton}>
        <Text style={styles.bigtitle}>{activityTitle}</Text>
        <QuickInfo quickInfo={quickInfo} size={20} />
        <View style={styles.indicator}>
          <Ionicons name="chevron-down-outline" size={30} color={"black"} />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card_box: {
    backgroundColor: Themes.bgSecondary,
    flexDirection: "column",
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  image: {
    alignContent: "flex-start",
    resizeMode: "cover",
    flex: 1,
    width: "100%",
    borderRadius: 10,
  },
  bigtitle: {
    fontSize: 40,
    color: Themes.textPrimary,
    marginVertical: 10,
  },
  container: {
    flex: 1,
  },
  moreInfoButton: {
    flexDirection: "column",
    justifyContent: "flex-start",
    // flex: 1,
    width: "100%",
    // borderColor: "black",
    // borderStyle: "solid",
    // borderWidth: 1,
    // height: "20%",
  },
  indicator: {
    alignSelf: "center",
    marginBottom: 20,
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
