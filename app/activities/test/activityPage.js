import { Pressable, StyleSheet, View } from "react-native";
import ActivityCard from "../../../components/ActivityCard.js";

import { Text } from "@rneui/themed";

import { Link } from "expo-router";
import { FlatList } from "react-native-gesture-handler";
import MiniActivityCard from "../../../components/MiniActivityCard.js";
import { Themes } from "../../../assets/Themes/index.js";
import { Stack } from "expo-router";

export default function Page() {
  return <ActivityCard />;
}
