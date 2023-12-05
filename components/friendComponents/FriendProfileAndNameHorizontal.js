import { StyleSheet, View, Image, Pressable } from "react-native";
import { Text } from "@rneui/themed";
import { Themes } from "../../assets/Themes";
import { Dimensions } from "react-native";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

export default function FriendProfileAndNameHorizontal({ friend }) {
  if (!friend) return <View />;
  return (
    // <View style={styles.container}>
    <Pressable style={styles.container}>
      <View style={styles.friendbox}>
        <Image
          style={styles.friendimage}
          source={{ uri: friend.profileImage }}
        />
        <Text style={styles.friendName} numberOfLines={1}>
          {friend.name}
        </Text>
      </View>
    </Pressable>
    // </View>
  );
}

const styles = StyleSheet.create({
  friendimage: {
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 50,
    resizeMode: "cover",
    width: 30,
    height: 30,
    marginRight: 10,
  },
  friendName: {
    fontSize: 20,
    color: Themes.textPrimary,
    textAlign: "left",
  },
  friendbox: {
    flexDirection: "row",
    // flexGrow: 1,
    // justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    alignContent: "flex-start",
    // justifyContent: "left",
    // width: "100%",
    padding: 8,
    flexGrow: 1,
  },
});

FriendProfileAndNameHorizontal.defaultProps = {
  friend: {
    name: "Friend Name",
    profileImage:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  },
};
