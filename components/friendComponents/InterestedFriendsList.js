import { StyleSheet, View } from "react-native";
import { Text } from "@rneui/themed";
import FriendProfileAndName from "./FriendProfileAndName";
import { Themes } from "../../assets/Themes";
import { supabase, friendsTable } from "../../utils/supabase";
import { useState, useEffect, useContext } from "react";
import FriendsContext from "../../contexts/FriendsContext";

export default function InterestedFriendsList({
  interestedFriendIds,
  emptyMessage,
}) {
  const [friends, setFriends] = useState([]);

  const fetchFriends = async () => {
    const { data, error } = await supabase.from(friendsTable).select("*");
    if (error) console.log("error", error);
    else {
      setFriends(data);
    }
  };
  fetchFriends();
  // console.log("Friends", friends);
  // const friends = useContext(FriendsContext);
  // console.log("friends: ", friends);
  if (interestedFriendIds.length > 0) {
    // console.log("interestedFriendIds", interestedFriendIds);
    // return <View />;
    const interestedFriends = friends.filter((friend) => {
      return interestedFriendIds.includes(friend.id);
    });
    // console.log("interestedFriends", interestedFriends);
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
  // return <View />;
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
    // flexGrow: 1,
    // justifyContent: "space-around",
  },
});

InterestedFriendsList.defaultProps = {
  interestedFriendIds: [0, 1, 2, 3],
  emptyMessage: "None of your friends share this interest.",
};
