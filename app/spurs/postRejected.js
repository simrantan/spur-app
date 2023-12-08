import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Stack, router, Header, useNavigation } from "expo-router";
import { supabase } from "../../utils/supabase";
import { Ionicons } from "@expo/vector-icons";
import { palette } from "../../assets/Themes/palette";

import { Button } from "@rneui/themed";
import SpurInvite from "./SpurInvite";
import { Themes } from "../../assets/Themes";
import { Text } from "@rneui/themed";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

export default function Rejected() {
  const [invites, setInvites] = useState([]);
  const table = "spurInvite";

  const renderInvite = ({ item }) => (
    <SpurInvite
      activityImageUri={item.activityImageUri}
      activityTitle={item.activityTitle}
      friend={item.friend}
      time={item.time}
      address={item.address}
    />
  );
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: "Spurs",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            router.push("spurs/postRejected");
          }}
          style={{ marginLeft: -17 }}
        >
          <Ionicons name="chevron-back" size={30} color={palette.beige} />
        </TouchableOpacity>
      ),
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Spurs",
          headerLeft: null,
        }}
        style={styles.spacer}
      />
      <FlatList
        data={invites}
        renderItem={(item) => renderInvite(item)}
        keyExtractor={(item) => item.id}
        style={styles.spacer}
        ListEmptyComponent={
          <Text h4 style={{ marginTop: 30, color: "gray" }}>
            No invites right now!
          </Text>
        }
      />

      <Button
        title="Create a New Spur"
        size="lg"
        style={styles.button}
        onPress={() => {
          router.push({
            pathname: "nsp/NewSpurPage",
            params: { id: 1, pagename: "spurs/postRejected" },
          });
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",

    padding: 24,
    justifyContent: "space-between",
    backgroundColor: Themes.bg,
  },
  spacer: {
    marginBottom: 20, // Adjust the margin as needed
    marginTop: 20,
    width: windowWidth,
    justifyContent: "center",
    alignItems: "center", // Align items to the center
    paddingTop: 0, // Set paddingTop to remove the top padding
    backgroundColor: palette.beige,
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
