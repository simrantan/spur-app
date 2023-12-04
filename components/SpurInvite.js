import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Themes } from "../assets/Themes";
import { Link, Stack } from "expo-router";
import { supabase } from "../utils/supabase";
import Ionicons from "@expo/vector-icons/Ionicons";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");
//set table
table = "spurInvite";
export default function SpurInvite({}) {
  const [lastInvite, setLastInvite] = useState();
  const [acceptance, setAcceptance] = useState(null);
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

  useEffect(() => {
    if (lastInvite) {
      updateDB(lastInvite);
    }
  }, [invites]);

  const updateDB = async (id) => {
    console.log("true", acceptance);
    let accepted = false;
    if (acceptance === true) {
      accepted = true;
    }
    const { data, error } = await supabase
      .from(table)
      .update({ isAccepted: accepted })
      .eq("id", id)
      .select();

    if (error) {
      console.log("error here", error);
      console.log("id", id);
    } else {
      console.log("successful update, marked:", data);
    }
  };

  return (
    <SafeAreaView style={styles.item}>
      {invites.map((invite, index) => (
        <View key={index}>
          <View style={styles.activityInfo}>
            <Image
              style={styles.image}
              source={{ uri: invite.activityPhoto }}
            ></Image>
            <View style={styles.activityDetails}>
              <Text style={styles.bigtitle}>{invite.activityTitle}</Text>
              <View style={styles.from}>
                <Text style={styles.smalltitle}>From </Text>
                <Text style={styles.smalltitle}>{invite.friend.name}</Text>
              </View>
              <View style={styles.from}>
                <Text style={styles.bodytext}> When </Text>
                <Text style={styles.bodytext}>{invite.time}</Text>
                <Text style={styles.bodytext}> Where </Text>
                <Text style={styles.bodytext}>{invite.address}</Text>
              </View>
            </View>
          </View>
        </View>
      ))}
      <View style={styles.acceptAndReject}>
        <Pressable
          onPress={() => {
            setAcceptance(true);
          }}
          style={styles.button_style}
        >
          <Text style={styles.button_text}>Accept</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setAcceptance(false);
          }}
          style={styles.button_style}
        >
          <Text style={styles.button_text}>Reject</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    width: windowWidth,
    height: windowWidth * 0.4,
    backgroundColor: "green",
    padding: 2,
    marginVertical: 8,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 10,
  },
  activityInfo: {
    flexDirection: "row",
  },
  activityDetails: {
    flexDirection: "column",
  },
  acceptAndReject: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: windowWidth * 0.9,
    height: windowWidth * 0.2,
    alignItems: "center",
  },
  from: {
    flexDirection: "row",
  },
  button_style: {
    width: windowWidth * 0.17,
    height: windowWidth * 0.17,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  button_text: {
    color: Themes.buttonPrimaryText,
    fontSize: 24,
  },
  bigtitle: {
    fontSize: 40,
    color: Themes.textPrimary,
    paddingLeft: 10,
  },
  smalltitle: {
    fontSize: 28,
    color: Themes.textPrimary,
    paddingTop: 15,
  },
  bodytext: {
    fontSize: 16,
    color: Themes.textPrimary,
  },
  image: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    resizeMode: "contain",
    justifyContent: "center",
  },
});
