import {
  StyleSheet,
  SafeAreaView,
  Pressable,
  Image,
  Dimensions,
  FlatList,
  Linking,
  View,
  TouchableOpacity,
} from "react-native";

import { Button, Text, Overlay } from "@rneui/themed";
import { router, Stack, useNavigation } from "expo-router";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import QuickInfo from "../../../components/QuickInfo";
import InterestedFriendsList from "../../../components/InterestedFriendsList";
import Checklist from "../../../components/Checklist";
import { palette } from "../../../assets/Themes/palette";
import { supabase } from "../../../utils/supabase";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");
const table = "spurInvite";

export default function Accepted() {
  const [invites, setInvites] = useState([]);
  const navigation = useNavigation();

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
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            router.push("spurs/spurinvite/postAccepted");
          }}
        >
          <Text>Back</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          router.push("spurs/spurinvite/postAccepted");
        }}
      >
        <Text>Back</Text>
      </TouchableOpacity>
    ),
  });

  return (
    <SafeAreaView style={styles.container}>
      {invites.map((invite, index) => (
        <View key={index}>
          <Text>{invite.activityTitle}</Text>
          <QuickInfo quickInfo={invite.quickInfo} size={30} />
          <Text style={styles.promptbox}>When</Text>
          <Text style={styles.textbox}>{invite.time}</Text>
          <Text style={styles.promptbox}>Where</Text>
          <Text
            style={styles.textbox}
            numberOfLines={1}
            onPress={() =>
              Linking.openURL("https://maps.app.goo.gl/95YrRaC6fJzUzkR69")
            }
          >
            {invite.address}
          </Text>
          <Text>Attendees</Text>
          <InterestedFriendsList interestedFriends={invite.interestedFriends} />
          <Checklist needsList={invite.needsList} />
        </View>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.beige,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
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
});
