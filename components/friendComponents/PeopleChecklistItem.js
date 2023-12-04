import { ListItem, Avatar, CheckBox } from "@rneui/themed";
import FriendProfileAndName from "./FriendProfileAndName";

export default function PeopleChecklistItem({
  person,
  isChecked,
  toggleChecked,
}) {
  return (
    <ListItem>
      <ListItem.Content>
        <CheckBox checked={isChecked} onPress={toggleChecked} />
        <FriendProfileAndName friend={person} />
      </ListItem.Content>
    </ListItem>
  );
}
