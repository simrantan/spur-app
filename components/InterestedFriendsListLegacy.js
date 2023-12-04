import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { Themes } from "../assets/Themes";

function FriendProfleAndName({ friend }) {
  console.log("frind type: ", typeof friend);
  return (
    <View style={styles.friendbox}>
      <Pressable>
        <Image style={styles.friendimage} source={friend.profileImage} />
        <Text style={styles.friendName} numberOfLines={1}>
          {friend.name}
        </Text>
      </Pressable>
    </View>
  );
}

export default function InterestedFriendsList({ interestedFriends }) {
  if (interestedFriends.length > 0) {
    return (
      <View style={styles.container}>
        {interestedFriends.map((item) => {
          return <FriendProfleAndName friend={item} />;
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
