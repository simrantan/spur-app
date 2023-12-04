import {
  StyleSheet,
  SafeAreaView,
  Pressable,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Themes } from "../../../assets/Themes";
import { Link, Stack, router } from "expo-router";
import { supabase } from "../../../utils/supabase";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button, Text } from "@rneui/themed";

import SpurInvite from "./SpurInvite";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");
const table = "spurInvite";

export default function spurInvitePending() {
  const [invites, setInvites] = useState([]);

  const fetchInvites = async () => {
    const { data, error } = await supabase.from(table).select("*");
    if (error) console.log("error", error);
    else {
      console.log(data);
      setInvites(data);
    }
  };

  useEffect(() => {
    fetchInvites();
  }, []);

  return (
    <SafeAreaView style={styles.item}>
      <Stack.Screen options={{ title: "" }}></Stack.Screen>
      <Link asChild href="/spurs/spurinvite/spurInviteAccepted">
        {invites.map((invite) => (
          <Pressable style={styles.activityInfo}>
            <Image
              style={styles.image}
              source={{ uri: invite.activityPhoto }}
            ></Image>
            <View style={styles.activityDetails}>
              <Text h2>{invite.activityTitle}</Text>
              <View style={styles.from}>
                <Text style={styles.promptbox}> From </Text>
                <Text style={styles.textbox}>{invite.friend.name}</Text>
              </View>

              <View style={styles.from}>
                <Text style={styles.promptbox}> When </Text>
                <Text style={styles.textbox}>{invite.time}</Text>
              </View>
              <View style={styles.from}>
                <Text style={styles.promptbox}> Where </Text>
                <Text
                  style={styles.textbox}
                  numberOfLines={1}
                  onPress={() =>
                    Linking.openURL("https://maps.app.goo.gl/95YrRaC6fJzUzkR69")
                  }
                >
                  {invite.address}
                </Text>
              </View>
            </View>
            <Text h3>You're Going!</Text>
          </Pressable>
        ))}
      </Link>
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
