import { Redirect } from "expo-router";
import { Text } from "react-native";
import FriendsProvider from "../components/FriendsProvider";

export default function Page() {
  return (
    <FriendsProvider>
      <Redirect href={"/explore/explore_page"} />
    </FriendsProvider>
  );
}
