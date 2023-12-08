import { StyleSheet, View, Image, Pressable } from "react-native";
import { Text } from "@rneui/themed";
import { Themes } from "../../assets/Themes";
import { Dimensions } from "react-native";
import { router, Stack, useNavigation } from "expo-router";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

export default function FriendProfileAndNameHorizontal({ friend, size }) {
  if (!friend) return <View />;

  return (
    // <View style={styles.container}>
    <Pressable
      style={styles.container}
      onPress={() => {
        router.push({
          pathname: "friends/friendProfile",
          params: friend,
        });
      }}
    >
      <View style={styles.friendbox}>
        <Image
          style={styles.friendimage}
          source={{ uri: friend.profileImageHci }}
        />
        <View style={styles.friendName}>
          <Text h3 style={styles.friendName}>
            {friend.firstName}
          </Text>
          <Text h3> </Text>
          <Text h3 style={styles.friendName}>
            {friend.lastName}
          </Text>
        </View>
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
    width: 40,
    height: 40,
    marginRight: 10,
  },
  friendName: {
    textAlign: "left",
    flexDirection: "row",
    alignItems: "stretch",
    fontSize: 10,
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
  size: 40,
};
