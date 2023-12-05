import { ListItem, Avatar, CheckBox } from "@rneui/themed";
import FriendProfileAndName from "./FriendProfileAndName";
import { StyleSheet, View } from "react-native";
import FriendProfileAndNameHorizontal from "./FriendProfileAndNameHorizontal";

export default function PeopleChecklistItem({
  person,
  isChecked,
  toggleChecked,
}) {
  return (
    <ListItem>
      <ListItem.Content>
        <View style={styles.container}>
          <View style={styles.iconBorder}>
            <CheckBox checked={isChecked} size={30} onPress={toggleChecked} />
          </View>
          <FriendProfileAndNameHorizontal friend={person} />
        </View>
      </ListItem.Content>
    </ListItem>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    // flex: 1,
  },
  iconBorder: {
    marginHorizontal: -20,
    marginLeft: -20,
    marginVertical: -10,
  },
});
