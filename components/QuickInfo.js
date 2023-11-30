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

function ParticipantsSymbol({ participants }) {
  var participantsIcon = "people-outline";
  return <Ionicons name={participantsIcon} size={20} color="black" />;
  return <Text style={{ color: "black" }}>Particiopants Unknown</Text>;
}

function ActivitySymbol({ activityType }) {
  return <Ionicons name={activityType} size={20} color="black" />;
}

function DistanceSymbol({ dist }) {
  return <Text style={{ color: "black" }}>{dist}</Text>;
}

function TimeSymbol({ time }) {
  return (
    <View style={styles.timebox}>
      <Ionicons name="time" size={20} color="black" />
      <Text>{time}</Text>
    </View>
  );
}

export default function QuickInfo({ quickInfo }) {
  return (
    <View style={styles.iconsbox}>
      <ParticipantsSymbol participants={quickInfo.participants} />
      <PriceSymbol cost={quickInfo.cost} />
      <ActivitySymbol activityType={quickInfo.activityType} />
      <DistanceSymbol dist={quickInfo.dist} />
      <TimeSymbol time={quickInfo.time} />
    </View>
  );
}

const styles = StyleSheet.create({
  iconsbox: {
    borderColor: "black",
    borderStyle: "solid",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 5,
    paddingVertical: 5,
    backgroundColor: "gray",
    marginHorizontal: 10,
    borderRadius: 10,
  },
  timebox: {
    flexDirection: "row",
    alignItems: "center",
  },
});
