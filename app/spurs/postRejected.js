import { StyleSheet, SafeAreaView, Dimensions, FlatList } from "react-native";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Stack, router, Header } from "expo-router";
import { supabase } from "../../utils/supabase";
import { Button } from "@rneui/themed";
import SpurInvite from "./SpurInvite";
import { Themes } from "../../assets/Themes";
import { Text } from "@rneui/themed";

export default function Page() {
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

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Spurs",
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
        onPress={() => {
          router.push({
            pathname: "spurs/screens/NewSpurPage",
            params: { id: 1 },
          });
        }}
        style={styles.spacer}
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
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
});
