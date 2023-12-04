import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { Themes } from "../assets/Themes";
import { Link, Stack } from "expo-router";
import { millisToMinutesAndSeconds } from "../utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import QuickInfo from "./QuickInfo";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");
//set table
const [acceptance, setAcceptance] = useState(null);

export default function SpurInvite({
  id,
  activityPhoto,
  activityTitle,
  friend,
  quickInfo,
  time,
  address,
  isAccepted,
}) {
  // const updateDB = async (id, acceptance) => {
  //     const { data, error } = await supabase
  //       .from(table)
  //       .update({ isAccepted: acceptance })
  //       .eq("id", id)
  //       .select();

  //     if (error) {
  //       console.log("error here", error);
  //     } else {
  //       console.log("successful update, marked:", data);
  //     }
  //   };
  return (
    <View style={styles.item}>
      <View style={styles.activityInfo}>
        <Image style={styles.image}>{activityPhoto}</Image>
        <View style={styles.activityDetails}>
          <Text>{activityTitle}</Text>
          <View style={styles.from}>
            <Text>From</Text>
            <Text>{friend.name}</Text>
          </View>
          <View style={styles.from}>
            <Text>When</Text>
            <Text>{time}</Text>
            <Text>Where</Text>
            <Text>{address}</Text>
          </View>
        </View>
      </View>
      <View style={styles.acceptAndReject}>
        <Pressable
          onPress={() => {
            setAcceptance(true);
          }}
        >
          <Text>Accept</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setAcceptance(false);
          }}
        >
          <Text>Reject</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: windowWidth,
    backgroundColor: "white",
    padding: 2,
    marginVertical: 8,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 10,
    height: windowWidth * 0.3,
  },
  activityInfo: {
    flexDirection: "row",
  },
  activityDetails: {
    flexDirection: "column",
  },
  acceptAndReject: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  from: {
    flexDirection: "row",
  },

  image: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    resizeMode: "contain",
    justifyContent: "center",
  },
});
