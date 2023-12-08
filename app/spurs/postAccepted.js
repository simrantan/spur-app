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
import SpurInviteAccepted from "./SpurInviteAccepted";

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
        style={styles.spacer}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  // item: {
  //   flex: 1,
  //   width: windowWidth,
  //   justifyContent: "space-between",
  //   flexDirection: "column",
  //   margin: 5,
  // },
  // promptbox: {
  //   width: windowWidth * 0.2,
  //   height: windowWidth * 0.1,
  //   marginVertical: 3,
  //   justifyContent: "center",
  // },
  // textbox: {
  //   width: windowWidth * 0.5,
  //   height: windowWidth * 0.1,
  //   backgroundColor: "white",
  //   borderRadius: 10,
  //   marginVertical: 3,
  //   justifyContent: "center",
  //   margin: 3,
  // },
  // from: {
  //   flexDirection: "row",
  // },
  // activityInfo: {
  //   flexDirection: "row",
  //   justifyContent: "flex-start",
  //   alignItems: "flex-start",
  // },
  // activityDetails: {
  //   flexDirection: "column",
  //   alignContent: "flex-start",
  //   justifyContent: "flex-start",
  //   direction: "ltr",
  //   margin: 15,
  // },
  // col: {
  //   flexDirection: "col",
  //   width: windowWidth * 0.95,
  //   alignSelf: "center",
  //   shadowColor: "black",
  //   shadowOpacity: 0.4,
  //   shadowRadius: 5,
  //   shadowOffset: { width: -1, height: 5 },
  //   backgroundColor: palette.beige,
  //   borderRadius: 10,
  // },
  // textalign: {
  //   margin: 10,
  // },
  // details: {
  //   color: palette.accent2,
  // },
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
