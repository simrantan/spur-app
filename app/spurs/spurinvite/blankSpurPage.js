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
  console.log("invite", invites);

  return (
    <SafeAreaView style={styles.item}>
      <Stack.Screen options={{ title: "" }}></Stack.Screen>
      {invites.map((invite, index) => (
        <Pressable
          key={index}
          style={styles.col}
          onPress={() => {
            router.push("spurs/spurinvite/spurInviteAccepted");
          }}
        >
          <View style={styles.activityInfo}>
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
          </View>
          <Text h3>You're Going!</Text>
        </Pressable>
      ))}
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
