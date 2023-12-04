import { StyleSheet, Text, View } from "react-native";

import { Themes } from "../assets/Themes";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import Icons from "../assets/Icons";
import { Image } from "react-native";

var symbolSize = 25;
var symbolFontSize = symbolSize * 0.8;

function PriceSymbol({ cost }) {
  var inner = <View />;
  if (cost === "free") {
    inner = (
      <Text style={{ color: "black", fontSize: symbolFontSize }}>Free</Text>
    );
  } else if (cost === "cheap") {
    inner = (
      <View style={{ flexDirection: "row" }}>
        <Text style={{ color: "black", fontSize: symbolFontSize }}>$</Text>
        <Text style={{ color: "lightgray", fontSize: symbolFontSize }}>$$</Text>
      </View>
    );
  } else if (cost === "moderate") {
    inner = (
      <View style={{ flexDirection: "row" }}>
        <Text style={{ color: "black", fontSize: symbolFontSize }}>$$</Text>
        <Text style={{ color: "lightgray", fontSize: symbolFontSize }}>$</Text>
      </View>
    );
  } else if (cost === "expensive") {
    inner = (
      <Text style={{ color: "black", fontSize: symbolFontSize }}>$$$</Text>
    );
  } else {
    inner = (
      <Text style={{ color: "black", fontSize: symbolFontSize }}>
        Price Unknown
      </Text>
    );
  }
  return inner;
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
  if (
    activityType !== "sport" &&
    activityType !== "entertainment" &&
    activityType !== "leisure" &&
    activityType !== "intellectual" &&
    activityType !== "outdoors" &&
    activityType !== "explore"
  ) {
    return <Ionicons name="radio-button-off" size={symbolSize} color="black" />;
  }
  return (
    <Image
      source={Icons[activityType]}
      style={{
        width: symbolSize,
        height: symbolSize,
      }}
    />
  );
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

export default function QuickInfo({ quickInfo, size }) {
  symbolSize = size;
  symbolFontSize = size * 0.8;
  if (typeof quickInfo === "string") {
    try {
      quickInfo = JSON.parse(quickInfo);
    } catch (e) {
      console.log("error parsing quick info: ", e);
    }
    // quickInfo = JSON.parse(quickInfo);
  }
  return (
    <View style={styles.iconsbox}>
      <View style={styles.icon}>
        <ParticipantsSymbol participants={quickInfo.participants} />
      </View>
      <View style={styles.icon}>
        <PriceSymbol cost={quickInfo.cost} />
      </View>
      <View style={styles.icon}>
        <ActivitySymbol activityType={quickInfo.activityType} />
      </View>
      <View style={styles.icon}>
        <DistanceSymbol dist={quickInfo.dist} />
      </View>
      <View style={styles.icon}>
        <TimeSymbol time={quickInfo.time} />
      </View>
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
    // flexGrow: 1,
    // marginVertical: 5,
    paddingVertical: 5,
    backgroundColor: Themes.bg,
    // marginHorizontal: 10,
    borderRadius: 10,
    // flexShrink: 1,
  },
  timebox: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    // flex: 1,
    // alignItems: "center",
  },
  text: {
    flexDirection: "row",
    alignItems: "center",
  },
});
