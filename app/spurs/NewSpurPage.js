import { StyleSheet, View } from "react-native";
import { Text, Button, useTheme } from "@rneui/themed";
import MiniActivityCard from "../../components/MiniActivityCard";
import InterestedFriendsList from "../../components/InterestedFriendsList";
import { FontAwesome } from "@expo/vector-icons";

export default function NewSpurPage() {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text>Hello</Text>
      <MiniActivityCard />
      <Button title="Change Activity" type="outline" />
      <InterestedFriendsList />
      <Button title="change people" type="outline" />
      <Button
        title="Send Spur!"
        icon={
          <FontAwesome
            name="send"
            size={20}
            marginRight={10}
            color={theme.colors.white}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
});
