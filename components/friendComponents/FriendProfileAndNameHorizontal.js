import { StyleSheet, View, Image, Pressable } from "react-native";
import { Text } from "@rneui/themed";
import { Themes } from "../../assets/Themes";
import { Dimensions } from "react-native";
import { router, Stack, useNavigation } from "expo-router";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

export default function FriendProfileAndNameHorizontal({ friend }) {

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
          <Text h3>{friend.firstName}</Text>
          <Text h3> </Text>
          <Text h3>{friend.lastName}</Text>
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
