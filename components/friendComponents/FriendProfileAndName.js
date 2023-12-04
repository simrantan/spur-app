import { StyleSheet, View, Image, Pressable } from "react-native";
import { Text } from "@rneui/themed";
import { Themes } from "../../assets/Themes";

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
    width: 60,
    height: 60,
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
    width: 70,
    height: 100,
    marginHorizontal: 5,
  },
});
