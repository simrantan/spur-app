import { StyleSheet, View, Image, Pressable } from "react-native";
import { Text } from "@rneui/themed";
import { Themes } from "../../assets/Themes";
import { Dimensions } from "react-native";
import { router, Stack, useNavigation } from "expo-router";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

export default function FriendProfileAndNameHorizontal({ friend, size }) {
  if (!friend) return <View />;

  return (
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
          <Text
            h4
            style={styles.friendName}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {friend.firstName} {friend.lastName}
          </Text>
        </View>
      </View>
    </Pressable>
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
    flex: 1,
  },
  friendbox: {
    flexDirection: "row",

    width: "100%",
    alignItems: "center",
    backgroundColor: Themes.bgSecondary,
    overflow: "hidden",
  },
  container: {
    flexDirection: "row",
    alignContent: "flex-start",

    padding: 8,
    flexGrow: 1,
    backgroundColor: Themes.bgSecondary,
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
