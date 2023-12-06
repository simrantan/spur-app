import { StyleSheet, View, SafeAreaView } from "react-native";
import { Text } from "@rneui/themed";
import { Themes } from "../../assets/Themes";
import { router, Stack, useNavigation } from "expo-router";
import { FlatList } from "react-native-gesture-handler";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { supabase } from "../../utils/supabase";
import FriendProfileAndNameHorizontal from "../../components/friendComponents/FriendProfileAndNameHorizontal";

export default function Page() {
  const [friends, setFriends] = useState([]);
  const table = "friends";
  const fetchFriends = async () => {
    const { data, error } = await supabase.from(table).select("*");
    if (error) console.log("error", error);
    else {
      setFriends(data);
      console.log("friends", friends);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  const renderFriends = ({ item }) => (
    <FriendProfileAndNameHorizontal friend={item.friend} />
  );
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Friends",
        }}
      />
      {friends.map((friend, index) => (
        <View key={index} style={styles.main}>
          <FlatList
            data={friend}
            renderItem={(item) => renderFriends(item)}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: "beige" }} />
            )}
          />
        </View>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: Themes.bg,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
    backgroundColor: Themes.bgSecondary,
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
