import { StyleSheet, View, Image, Dimensions, Pressable } from "react-native";
import { Text } from "@rneui/themed";
import { Themes } from "../assets/Themes";
import QuickInfo from "./QuickInfo";
import { router } from "expo-router";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

export default function MiniActivityCard({ activityInfo }) {
  const activityImageUri = activityInfo.activityImageUri;
  const activityTitle = activityInfo.activityTitle;
  const quickInfo = activityInfo.quickInfo; // dist, time, participants, activityType, cost

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          router.push({
            pathname: "activities/ActivityInfoPage",
            params: activityInfo,
          });
        }}
      >
        <View style={styles.mini_card_box}>
          <Image style={styles.image} source={{ uri: activityImageUri }} />
          <View style={styles.info}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {activityTitle}
            </Text>
            <QuickInfo quickInfo={quickInfo} size={20} />
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  mini_card_box: {
    flexDirection: "row",
    alignContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    width: "100%",
    height: 100,
    maxWidth: windowWidth,
    overflow: "hidden",
  },
  image: {
    height: "100%",
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
    flex: 1,
  },
  info: {
    flexDirection: "column",
    flexGrow: 1,
    flexShrink: 1,
    height: "100%",
    justifyContent: "space-between",
    borderColor: "black",
  },
});

MiniActivityCard.defaultProps = {
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
