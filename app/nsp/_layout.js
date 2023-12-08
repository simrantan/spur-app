import { Stack } from "expo-router";
import navOptions from "../../assets/Themes/headerThemes";
export default function SpursLayout() {
  return <Stack screenOptions={navOptions} />;
}
