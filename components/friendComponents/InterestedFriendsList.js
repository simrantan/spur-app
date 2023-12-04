import { StyleSheet, FlatList } from "react-native";
import { Text } from "@rneui/themed";
import FriendProfileAndName from "./FriendProfileAndName";

export default function InterestedFriendsList({ interestedFriends }) {
  return (
    <FlatList
      data={interestedFriends}
      renderItem={({ item, index }) => <FriendProfileAndName friend={item} />}
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
  noFriends: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginVertical: 8,
  },
});
