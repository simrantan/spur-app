import { StyleSheet, SafeAreaView, Dimensions, FlatList } from "react-native";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Stack, router } from "expo-router";
import { supabase } from "../../utils/supabase";
import { Button } from "@rneui/themed";
import SpurInvite from "./SpurInvite";
import { Themes } from "../../assets/Themes";
import SpurInvitePending from "./SpurInvitePending";
import { View } from "react-native";
import { Text } from "@rneui/themed";

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
    <SpurInvitePending
      activityImageUri={item.activityImageUri}
      activityTitle={item.activityTitle}
      friend={item.friend}
      time={item.time}
      address={item.address}
      quickInfo={item.quickInfo}
    />
    // <SpurInvitePending
    //   activityImageUri={item.activityImageUri}
    //   activityTitle={item.activityTitle}
    //   friend={item.friend}
    //   time={item.time}
    //   address={item.address}
    // />
  );

  return (
    <View style={styles.container}>
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
        ListHeaderComponent={
          <Text h3 style={{ marginBottom: 10 }}>
            Pending Spurs
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Themes.bg,
  },
  spacer: {
    marginBottom: 10, // Adjust the margin as needed
    marginTop: 10,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    // marginHorizontal: "auto",
  },
});
