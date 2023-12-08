import { StyleSheet, View, Image, Dimensions, Pressable } from "react-native";
import { Text, Button } from "@rneui/themed";
import { Themes } from "../../assets/Themes";
import QuickInfo from "../../components/QuickInfo";
import { router } from "expo-router";
import MiniActivityCard from "../../components/MiniActivityCard";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

export default function SpurInvitePending({
  id,
  activityImageUri,
  activityTitle,
  friend,
  time,
  address,
  quickInfo,
}) {
  return (
    <View style={styles.container}>
      <MiniActivityCard
        activityInfo={{
          activityImageUri: activityImageUri,
          activityTitle: activityTitle,
          quickInfo: quickInfo,
        }}
      />
      <View style={styles.bottomHalfContainer}>
        <View style={styles.infoLine}>
          <Text style={styles.label}> From </Text>
          <Text style={styles.infoChunk}>{friend.name}</Text>
        </View>
        <View style={styles.infoLine}>
          <Text style={styles.label}> When </Text>
          <Text style={styles.infoChunk}>{time}</Text>
        </View>
        <View style={styles.infoLine}>
          <Text style={styles.label}> Where </Text>
          <Text style={styles.infoChunk}>{address}</Text>
        </View>
        <View style={styles.acceptAndReject}>
          <Button
            title="Reject"
            size="sm"
            onPress={() => {
              router.replace("spurs/postRejected");
            }}
            type="outline"
          />
          <Button
            title="Accept"
            size="sm"
            onPress={() => {
              router.replace("spurs/spurInviteAcceptedPage");
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mini_card_box: {
    flexDirection: "row",
    alignContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    width: windowWidth - 20,
    // height: 100,
    maxWidth: windowWidth,
    overflow: "hidden",
  },
  image: {
    height: 80,
    aspectRatio: 1,
    borderRadius: 5,
    marginRight: 10,
  },
  title: {
    fontSize: 32,
    color: Themes.textPrimary,
    paddingBottom: 5,
    flexWrap: "wrap",
    flexShrink: 1,
    overflow: "hidden",
  },
  container: {
    width: windowWidth - 20,
    // height: "100%",
    backgroundColor: Themes.bgSecondary,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
  },
  bottomHalfContainer: {
    padding: 10,
    paddingTop: 0,
    marginTop: -7,
  },
  info: {
    flexDirection: "column",
    flexGrow: 1,
    flexShrink: 1,
    height: "100%",
    justifyContent: "space-between",
    borderColor: "black",
    borderWidth: 1,
  },
  infoLine: {
    flexDirection: "row",
    flexGrow: 1,
    // justifyContent: "flex-start",
    // alignItems: "center",
    paddingVertical: 3,
  },
  label: {
    fontSize: 16,
    color: Themes.textPrimary,
    paddingBottom: 5,
    flexWrap: "wrap",
    flexShrink: 1,
    overflow: "hidden",
    minWidth: 90,
    textAlign: "right",
    paddingRight: 10,
    paddingTop: 7,
    // borderWidth: 1,
  },
  infoChunk: {
    fontSize: 16,
    color: Themes.textPrimary,
    padding: 7,
    flexWrap: "wrap",
    flexShrink: 1,
    overflow: "hidden",
    // width: 80,
    textAlign: "left",
    backgroundColor: Themes.bg,
    borderRadius: 10,
    // borderWidth: 1,
  },
  acceptAndReject: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 10,
  },
});

SpurInvitePending.defaultProps = {
  activityInfo: {
    activityImageUri:
      "https://www.desertsun.com/gcdn/presto/2023/05/09/PPAS/57ffb2bc-ce8e-435a-95e1-008a09acf033-pickleball_feature_1.jpg",
    activityTitle: "Pickleball",
    quickInfo: {
      dist: "0.5 mi",
      time: "1 hr",
      participants: 1,
      activityType: "sport",
      cost: "cheap",
    },
  },
};
