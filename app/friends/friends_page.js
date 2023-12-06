import { StyleSheet, View, SafeAreaView } from "react-native";
import { Text } from "@rneui/themed";

import { router, Stack, useNavigation } from "expo-router";
import { FlatList } from "react-native-gesture-handler";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { supabase } from "../../utils/supabase";
import { palette } from "../../assets/Themes/palette";
import FriendProfileAndNameHorizontal from "../../components/friendComponents/FriendProfileAndNameHorizontal";

export default function Page() {
  const [friends, setFriends] = useState([]);
  const table = "friends";
  const fetchFriends = async () => {
    const { data, error } = await supabase.from(table).select("*");
    if (error) console.log("error", error);
    else {
      setFriends(data);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  const renderFriends = ({ item }) => {
    return <FriendProfileAndNameHorizontal friend={item} />;
  };
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Friends",
        }}
      />
      <View style={styles.main}>
        <FlatList
          data={friends}
          renderItem={(item) => renderFriends(item)}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: palette.accent }} />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: palette.white,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
