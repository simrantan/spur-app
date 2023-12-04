import { StyleSheet, View, Image, Pressable, FlatList } from "react-native";
import { Text } from "@rneui/themed";

import { Themes } from "../assets/Themes";

function FriendProfleAndName({ friend }) {
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
  return (
    <FlatList
      data={interestedFriends}
      renderItem={({ item, index }) => <FriendProfleAndName friend={item} />}
      horizontal={true}
      ListEmptyComponent={
        <Text style={styles.noFriends}>
          None of your friends share this interest.
        </Text>
      }
    />
  );
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
    width: 70,
    height: 100,
    marginHorizontal: 5,
  },
});
