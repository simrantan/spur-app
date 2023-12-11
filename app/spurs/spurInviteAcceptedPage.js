import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Linking,
  View,
  TouchableOpacity,
} from "react-native";
import { Themes } from "../../assets/Themes";

import { Text } from "@rneui/themed";
import { router, Stack, useNavigation } from "expo-router";
import React, { useState, useEffect } from "react";
import InterestedFriendsList from "../../components/friendComponents/InterestedFriendsList";
import Checklist from "../../components/Checklist";
import { palette } from "../../assets/Themes/palette";
import { supabase } from "../../utils/supabase";
import MiniActivityCard from "../../components/MiniActivityCard";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");
const table = "spurInvite";

export default function Accepted() {
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
          <Ionicons
            name="chevron-back"
            size={32}
            color={Themes.buttonPrimaryFill}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: Themes.bg }}>
      <Stack.Screen
        options={{
          title: "Upcoming Spur",
        }}
      />

      <ScrollView contentContainerStyle={styles.scrollviewContainer}>
        {invites.map((invite, index) => (
          <View key={index} style={styles.moreinfobox}>
            <Text h3 style={styles.sectionHeader}>
              Event
            </Text>

            <View style={styles.sectionBodyContainer}>
              <MiniActivityCard activityInfo={invite} />
            </View>
            <Text h3 style={styles.sectionHeader}>
              Attendees
            </Text>
            <View style={styles.sectionBodyContainer}>
              <InterestedFriendsList
                interestedFriendIds={invite.interestedFriendIds}
              />
            </View>
            <Text h3 style={styles.sectionHeader}>
              Time
            </Text>
            <View style={[styles.sectionBodyContainer, { padding: 10 }]}>
              <Text style={styles.textbox}>{invite.time}</Text>
            </View>
            <Text h3 style={styles.sectionHeader}>
              Location
            </Text>
            <View style={[styles.sectionBodyContainer, { padding: 10 }]}>
              <Text
                style={styles.textbox}
                onPress={() =>
                  Linking.openURL("https://maps.app.goo.gl/95YrRaC6fJzUzkR69")
                }
              >
                {invite.address}
              </Text>
            </View>

            <Text h3 style={styles.sectionHeader}>
              What You Need
            </Text>
            <View style={[styles.sectionBodyContainer, { padding: 10 }]}>
              <Checklist needsList={invite.needsList} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollviewContainer: {
    backgroundColor: palette.beige,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
  },
  loc: {
    flexDirection: "column",
    marginTop: 20,
  },
  moreinfobox: {
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  promptbox: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.1,
    marginVertical: 3,
    justifyContent: "center",
  },
  textbox: {
    fontSize: 20,
  },
  from: {
    flexDirection: "row",

    margin: 10,
  },
  activityInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  needsbox: {
    marginTop: 10,
    alignSelf: "flex-start",
    justifyContent: "space-around",
  },
  attendeebox: {
    marginTop: 10,
    alignSelf: "flex-start",
  },
  sectionBodyContainer: {
    flexDirection: "row",
    backgroundColor: Themes.bgSecondary,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,

    width: windowWidth - 20,
    marginBottom: 20,
  },
  sectionHeader: {
    marginBottom: 5,
  },
});
