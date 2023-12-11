import { StyleSheet, View } from "react-native";
import { Text } from "@rneui/themed";
import FriendProfileAndName from "./FriendProfileAndName";
import { Themes } from "../../assets/Themes";
import { supabase, friendsTable } from "../../utils/supabase";
import { useState, useEffect, useContext } from "react";

export default function InterestedFriendsList({
  interestedFriendIds,
  emptyMessage,
}) {
  const [friends, setFriends] = useState([]);

  const fetchFriends = async () => {
    const { data, error } = await supabase.from(friendsTable).select("*");
    if (error) console.error(error);
    else {
      setFriends(data);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  if (interestedFriendIds.length > 0) {
    const interestedFriends = friends.filter((friend) => {
      return interestedFriendIds.includes(friend.id);
    });
    return (
      <View style={styles.container}>
        {interestedFriends.map((item, index) => {
          return <FriendProfileAndName friend={item} key={index} />;
        })}
      </View>
    );
  } else {
    return <Text style={styles.noFriends}>{emptyMessage}</Text>;
  }
}

const styles = StyleSheet.create({
  noFriends: {
    fontSize: 16,
    color: "gray",
    textAlign: "left",
    marginVertical: 8,
    marginLeft: 8,
  },
  container: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
  },
});

InterestedFriendsList.defaultProps = {
  interestedFriendIds: [0, 1, 2, 3],
  emptyMessage: "None of your friends share this interest.",
};
