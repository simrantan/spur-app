import { StyleSheet, SafeAreaView, Dimensions, FlatList } from "react-native";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Stack, router } from "expo-router";
import { supabase } from "../../utils/supabase";
import { Button } from "@rneui/themed";
import SpurInvite from "./SpurInvite";
import { Themes } from "../../assets/Themes";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

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
        style={styles.spacer}
      />
      <FlatList
        data={invites}
        renderItem={(item) => renderInvite(item)}
        keyExtractor={(item) => item.id}
        style={styles.spacer}
      />
      <Button
        title="Create a New Spur"
        size="lg"
        style={styles.button}
        onPress={() => {
          router.push({
            pathname: "spurs/screens/NewSpurPage",
            params: { id: 1, pagename: "spurs/spur_page" },
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
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  button: {
    width: windowWidth * 0.8,
    alignSelf: "center",
    marginBottom: 20,
  },
});
