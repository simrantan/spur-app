import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Linking,
  View,
  TouchableOpacity,
} from "react-native";

import { Text } from "@rneui/themed";
import { router, Stack, useNavigation } from "expo-router";
import React, { useState, useEffect } from "react";
import QuickInfo from "../../components/QuickInfo";
import InterestedFriendsList from "../../components/InterestedFriendsList";
import Checklist from "../../components/Checklist";
import { palette } from "../../assets/Themes/palette";
import { supabase } from "../../utils/supabase";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");
const table = "spurInvite";

export default function Accepted() {
  const [invites, setInvites] = useState([]);
  const navigation = useNavigation();

  const fetchInvites = async () => {
    const { data, error } = await supabase.from(table).select("*");
    if (error) console.log("error", error);
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
          <Text>Back</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {invites.map((invite, index) => (
        <View key={index} style={styles.moreinfobox}>
          <Text h2>{invite.activityTitle}</Text>
          <QuickInfo quickInfo={invite.quickInfo} size={30} />
          <View style={styles.from}>
            <View h4 style={styles.promptbox}>
              <Text style={styles.textalign}> When </Text>
            </View>
            <View style={styles.textbox}>
              <Text style={styles.textalign}>{invite.time}</Text>
            </View>
          </View>
          <View style={styles.from}>
            <View h3 style={styles.promptbox}>
              <Text style={styles.textalign}> Where </Text>
            </View>
            <View style={styles.textbox}>
              <Text
                style={styles.textalign}
                numberOfLines={1}
                onPress={() =>
                  Linking.openURL("https://maps.app.goo.gl/95YrRaC6fJzUzkR69")
                }
              >
                {invite.address}
              </Text>
            </View>
          </View>
          <View style={styles.attendeebox}>
            <Text h3>Attendees</Text>
            <InterestedFriendsList
              interestedFriends={invite.interestedFriends}
            />
          </View>
          <View style={styles.needsbox}>
            <Text h3>What You Need:</Text>
            <Checklist needsList={invite.needsList} />
          </View>
        </View>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.beige,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  moreinfobox: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
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
    flex: 1,
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
  needsbox: {
    alignSelf: "flex-start",
    justifyContent: "space-around",
    flex: 3,
    margin: 10,
  },
  attendeebox: {
    alignSelf: "flex-start",
    margin: 10,
    flex: 3,
  },
});
