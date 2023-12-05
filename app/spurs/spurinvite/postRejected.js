import {
  StyleSheet,
  SafeAreaView,
  Pressable,
  Image,
  Dimensions,
  FlatList,
  View,
} from "react-native";
import React, { useState, useEffect, useMemo, useCallback } from "react";

import { Link, Stack, router } from "expo-router";

import { Button, Text } from "@rneui/themed";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

export default function Rejected() {
  return (
    <SafeAreaView style={styles.item}>
      <Stack.Screen
        options={{
          title: "",
          headerShown: false, // Hide the default navigation header
        }}
      ></Stack.Screen>
      <Button
        title="Create a New Spur"
        size="lg"
        onPress={() => {
          router.push("spurs/NewSpurPage");
        }}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  item: {
    flex: 1,
    width: windowWidth,
    justifyContent: "center",
    alignItems: "center", // Align items to the center
    paddingTop: 0, // Set paddingTop to remove the top padding
  },
  promptbox: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.1,
    marginVertical: 3,
  },
  textbox: {
    width: windowWidth * 0.5,
    height: windowWidth * 0.1,
    backgroundColor: "white",
    borderRadius: 5,
    marginVertical: 3,
  },
  from: {
    flexDirection: "row",
  },
  activityInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  activityDetails: {
    flexDirection: "column",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    direction: "ltr",
  },
  col: {
    flexDirection: "row",
  },
});
