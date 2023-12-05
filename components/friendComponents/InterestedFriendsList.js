import { StyleSheet, View } from "react-native";
import { Text } from "@rneui/themed";
import FriendProfileAndName from "./FriendProfileAndName";
import { Themes } from "../../assets/Themes";

export default function InterestedFriendsList({
  interestedFriends,
  emptyMessage,
}) {
  if (!Array.isArray(interestedFriends)) {
    if (typeof interestedFriends === "string") {
      interestedFriends = JSON.parse(interestedFriends);
    } else return <Text>Error: interestedFriends is not an array.</Text>;
  }
  if (interestedFriends.length > 0) {
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
  interestedFriends: [
    {
      name: "John Doe",
      profileImage:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    {
      name: "Nils Forstall",
      profileImage:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    {
      name: "Jeremy Bentham Nickels",
      profileImage:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    {
      name: "John Doe",
      profileImage:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    {
      name: "John Doe",
      profileImage:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    {
      name: "John Doe",
      profileImage:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
  ],
  emptyMessage: "None of your friends share this interest.",
};
