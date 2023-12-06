import { StyleSheet, SafeAreaView, Dimensions, FlatList } from "react-native";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Stack, router } from "expo-router";
import { supabase } from "../../utils/supabase";
import { Button } from "@rneui/themed";
import SpurInvite from "./SpurInvite";

export default function Page() {
  const [invites, setInvites] = useState([]);
  const table = "spurInvite";

  const fetchInvites = async () => {
    const { data, error } = await supabase.from(table).select("*");
    if (error) console.error(error);
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
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Spurs",
        }}
      />
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
