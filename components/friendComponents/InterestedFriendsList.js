import { StyleSheet, View } from "react-native";
import { Text } from "@rneui/themed";
import FriendProfileAndName from "./FriendProfileAndName";
import { Themes } from "../../assets/Themes";

export default function InterestedFriendsList({ interestedFriends }) {
  if (!Array.isArray(interestedFriends)) {
    if (typeof interestedFriends === "string") {
      interestedFriends = JSON.parse(interestedFriends);
    } else return <Text>Error: interestedFriends is not an array.</Text>;
  }
  if (interestedFriends.length > 0) {
    return (
      <View style={styles.container}>
        {interestedFriends.map((item) => {
          return <FriendProfileAndName friend={item} />;
        })}
      </View>
    );
  } else {
    return (
      <Text style={styles.noFriends}>
        None of your friends share this interest.
      </Text>
    );
  }
  // return <View />;
}

const styles = StyleSheet.create({
  friendimage: {
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 50,
    resizeMode: "cover",
    width: 60,
    height: 60,
    alignSelf: "center",
  },
  friendName: {
    fontSize: 14,
    color: Themes.textPrimary,
    textAlign: "center",
    margin: 5,
  },
  noFriends: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginVertical: 8,
  },
  friendbox: {
    flexDirection: "column",
    justifyContent: "center",
    width: "25%",
    height: 100,
  },
  container: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
  },
});
