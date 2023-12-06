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

import { Link, Stack, router, useNavigation } from "expo-router";
import { supabase } from "../../utils/supabase";

import { Button, Text } from "@rneui/themed";

import { palette } from "../../assets/Themes/palette";

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
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            router.push("spurs/postAccepted");
          }}
        >
          <Text></Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <SafeAreaView style={styles.item}>
      <Stack.Screen options={{ title: "" }}></Stack.Screen>
      {invites.map((invite, index) => (
        <Pressable
          key={index}
          onPress={() => {
            router.push("spurs/spurInviteAccepted");
          }}
        >
          <View style={styles.col}>
            <View style={styles.activityInfo}>
              <Image
                style={styles.image}
                source={{ uri: invite.activityImageUri }}
              ></Image>
              <View style={styles.activityDetails}>
                <Text h2>{invite.activityTitle}</Text>
                <View style={styles.from}>
                  <View style={styles.promptbox}>
                    <Text style={styles.textalign}> From </Text>
                  </View>
                  <View style={styles.textbox}>
                    <Text style={styles.textalign}>{invite.friend.name}</Text>
                  </View>
                </View>

                <View style={styles.from}>
                  <View style={styles.promptbox}>
                    <Text style={styles.textalign}> When </Text>
                  </View>
                  <View style={styles.textbox}>
                    <Text style={styles.textalign}>{invite.time}</Text>
                  </View>
                </View>
                <View style={styles.from}>
                  <View style={styles.promptbox}>
                    <Text style={styles.textalign}> Where </Text>
                  </View>
                  <View style={styles.textbox}>
                    <Text
                      style={styles.textalign}
                      numberOfLines={1}
                      onPress={() =>
                        Linking.openURL(
                          "https://maps.app.goo.gl/95YrRaC6fJzUzkR69"
                        )
                      }
                    >
                      {invite.address}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <Text h3 style={styles.textalign}>
                You're Going!
              </Text>
            </View>
          </View>
        </Pressable>
      ))}
      <Button
        title="Create a New Spur"
        size="lg"
        onPress={() => {
          router.push({
            pathname: "spurs/screens/NewSpurPage",
            params: { id: 1 },
          });
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
    margin: 5,
  },
  promptbox: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.1,
    marginVertical: 3,
    justifyContent: "center",
  },
  textbox: {
    width: windowWidth * 0.5,
    height: windowWidth * 0.1,
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 3,
    justifyContent: "center",
    margin: 3,
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
    margin: 15,
  },
  col: {
    flexDirection: "col",
    width: windowWidth * 0.95,
    alignSelf: "center",
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: { width: -1, height: 5 },
    backgroundColor: palette.beige,
    borderRadius: 10,
  },
  textalign: {
    margin: 10,
  },
  details: {
    color: palette.accent2,
  },
});
