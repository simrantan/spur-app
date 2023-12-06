import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Text, Button } from "@rneui/themed";
import { Themes } from "../assets/Themes";
import QuickInfo from "./QuickInfo";
import { LinearGradient } from "expo-linear-gradient";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

export default function ActivityCardFront({
  activityImageUri,
  activityTitle,
  quickInfo, // dist, time, participants, activityType, cost
  onPress,
}) {
  return (
    <ScrollView>
      <View style={styles.card_box}>
        <ImageBackground
          source={{ uri: activityImageUri }}
          style={styles.image}
          imageStyle={styles.imageStyle}
        >
          <LinearGradient
            // Background Linear Gradient
            colors={["transparent", "rgba(255,255,255,0.9)"]}
            locations={[0.0, 0.6]}
            style={styles.textBox}
          >
            <Text style={styles.bigtitle}>{activityTitle}</Text>
          </LinearGradient>
        </ImageBackground>
        <QuickInfo quickInfo={quickInfo} size={20} />
        <Button type="outline" onPress={onPress} title={"More Info"} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card_box: {
    backgroundColor: Themes.bgSecondary,
    flexDirection: "column",
    justifyContent: "flex-start",
    borderRadius: 10,
    padding: 10,
    gap: 10,
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
    marginTop: 0,
  },
  imageStyle: {
    borderRadius: 10,
  },
  textBox: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 10,
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

ActivityCardFront.defaultProps = {
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
