import { StyleSheet, SafeAreaView, Dimensions, FlatList } from "react-native";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Stack, router } from "expo-router";
import { supabase } from "../../utils/supabase";
import { Button, Text } from "@rneui/themed";

import SpurInvite from "./SpurInvite";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

export default function spurInvitePending() {
  const [invites, setInvites] = useState([]);
  const table = "spurInvite";

  const fetchInvites = async () => {
    const { data, error } = await supabase.from(table).select("*");
    if (error) console.log("error", error);
    else {
      setInvites(data);
    }
  };

  useEffect(() => {
    fetchInvites();
  }, []);

  const renderInvite = ({ item }) => (
    <SpurInvite
      activityImageUri={item.activityImageUri}
      activityTitle={item.activityTitle}
      friend={item.friend}
      time={item.time}
      address={item.address}
    />
  );

  return (
    <SafeAreaView style={styles.item}>
      <Stack.Screen options={{ title: "" }}></Stack.Screen>
      <FlatList
        data={invites}
        renderItem={(item) => renderInvite(item)}
        keyExtractor={(item) => item.id}
      />
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
    justifyContent: "space-between",
    flexDirection: "column",
  },
});
