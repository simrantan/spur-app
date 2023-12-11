import {
  StyleSheet,
  SafeAreaView,
  Pressable,
  Image,
  Dimensions,
  FlatList,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";

import { Link, Stack, router, useNavigation } from "expo-router";
import { supabase } from "../../utils/supabase";
import { Themes } from "../../assets/Themes";
import { Button, Text } from "@rneui/themed";

import { palette } from "../../assets/Themes/palette";
import SpurInviteAccepted from "./spurInviteAccepted";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");
const table = "spurInvite";

export default function spurInvitePending() {
  const [invites, setInvites] = useState([]);
  const navigation = useNavigation();

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
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            router.push("spurs/postAccepted");
          }}
          style={{ marginLeft: -17 }}
        >
          <Ionicons name="chevron-back" size={30} color={palette.beige} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const renderInvite = ({ item, index }) => (
    <Pressable
      key={index}
      onPress={() => {
        router.push("spurs/spurInviteAcceptedPage");
      }}
    >
      <SpurInviteAccepted
        activityImageUri={item.activityImageUri}
        activityTitle={item.activityTitle}
        friend={item.friend}
        time={item.time}
        address={item.address}
        quickInfo={item.quickInfo}
      />
    </Pressable>
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
          <Text h3 style={{ marginBottom: 10, marginLeft: 10 }}>
            Upcoming Spurs
          </Text>
        }
      />
      <Button
        title="Create a New Spur"
        size="md"
        style={styles.button}
        onPress={() => {
          router.push({
            pathname: "nsp/NewSpurPage",
            params: { id: 1, pagename: "spurs/postAccepted" },
          });
        }}
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
    marginHorizontal: "auto",
  },
  button: {
    width: windowWidth * 0.8,
    alignSelf: "center",
    marginBottom: 20,
  },
});
