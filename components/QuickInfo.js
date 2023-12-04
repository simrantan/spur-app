import { StyleSheet, Text, View } from "react-native";

import { Themes } from "../assets/Themes";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";

const symbolSize = 25;
const symbolFontSize = symbolSize * 0.8;

function PriceSymbol({ cost }) {
  if (cost === "free") {
    return (
      <Text style={{ color: "black", fontSize: symbolFontSize }}>Free</Text>
    );
  }
  if (cost === "cheap") {
    return (
      <View style={{ flexDirection: "row" }}>
        <Text style={{ color: "black", fontSize: symbolFontSize }}>$</Text>
        <Text style={{ color: "lightgray", fontSize: symbolFontSize }}>$$</Text>
      </View>
    );
  }
  if (cost === "moderate") {
    return (
      <View style={{ flexDirection: "row" }}>
        <Text style={{ color: "black", fontSize: symbolFontSize }}>$$</Text>
        <Text style={{ color: "lightgray", fontSize: symbolFontSize }}>$</Text>
      </View>
    );
  }
  if (cost === "expensive") {
    return (
      <Text style={{ color: "black", fontSize: symbolFontSize }}>$$$</Text>
    );
  }
  return <Text style={{ color: "black" }}>Price Unknown</Text>;
}

function ParticipantsSymbol({ participants }) {
  var participantsIcon = "people-outline";
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Ionicons name={participantsIcon} size={symbolSize} color="black" />
      <Text style={{ color: "black", fontSize: symbolFontSize }}>
        {" "}
        {participants}
      </Text>
    </View>
  );
}

function ActivitySymbol({ activityType }) {
  const typeToIcon = new Map([
    [
      "leisure",
      <MaterialIcons
        name="airline-seat-recline-extra"
        size={symbolSize}
        color="black"
      />,
    ],
    [
      "sport",
      <MaterialIcons
        name={"sports-handball"}
        size={symbolSize}
        color="black"
      />,
    ],
    ["cultural", <MaterialIcons name="agriculture" size={24} color="black" />],
    [
      "entertain",
      <FontAwesome5 name="theater-masks" size={symbolSize} color="black" />,
    ],
    [
      "outdoor",
      <MaterialIcons name="nature-people" size={symbolSize} color="black" />,
    ],
    [
      "social-relaxed",
      <MaterialIcons name="local-drink" size={symbolSize} color="black" />,
    ],
  ]);
  return typeToIcon.get(activityType);
}

function DistanceSymbol({ dist }) {
  return (
    <Text style={{ color: "black", fontSize: symbolFontSize }}>{dist}</Text>
  );
}

function TimeSymbol({ time }) {
  return (
    <View style={styles.timebox}>
      <Ionicons name="time" size={symbolSize} color="black" />
      <Text style={{ color: "black", fontSize: symbolFontSize }}>{time}</Text>
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
    backgroundColor: Themes.bg,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  timebox: {
    flexDirection: "row",
    alignItems: "center",
  },
});
