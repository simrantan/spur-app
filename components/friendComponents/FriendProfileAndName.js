import { StyleSheet, View, Image, Pressable } from "react-native";
import { Text } from "@rneui/themed";
import { Themes } from "../../assets/Themes";
import { Dimensions } from "react-native";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

export default function FriendProfileAndName({ friend }) {
  return (
    <View style={styles.friendbox}>
      <Pressable>
        <Image
          style={styles.friendimage}
          source={{ uri: friend.profileImage }}
        />
        <Text style={styles.friendName} numberOfLines={1}>
          {friend.name}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  friendimage: {
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 50,
    resizeMode: "cover",
    width: 70,
    height: 70,
    alignSelf: "center",
  },
  friendName: {
    fontSize: 14,
    color: Themes.textPrimary,
    textAlign: "center",
  },
  friendbox: {
    flexDirection: "column",
    justifyContent: "center",
    width: "25%",
    height: 100,
    paddingHorizontal: 5,
  },
});
