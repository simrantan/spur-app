import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  View,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Text } from "@rneui/base";
import { palette } from "../../assets/Themes/palette";
import { FlatList } from "react-native-gesture-handler";
import MiniActivityCard from "../../components/MiniActivityCard";
import { supabase } from "../../utils/supabase";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

export default function Page() {
  const friend = useLocalSearchParams();
  //console.log("friend", friend);
  const [activities, setActivities] = useState();

  const fetchActivities = async () => {
    const id = [1, 2, 3, 4];
    //console.log("friendinterest", friend.interests);
    if (!friend.interests || friend.interests.length === 0) {
      console.log("No interests to fetch activities for.");
      return;
    }
    const { data, error } = await supabase
      .from("Activities v5")
      .select("*")
      .in("id", id);

    if (error) {
      console.error("Error fetching activities:", error);
    } else {
      //console.log("Fetched activities:", data);
      setActivities(data);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);
  console.log("activities are: ", activities);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "",
        }}
      />
      <View style={styles.profileCard}>
        <Image source={{ uri: friend.profileImageHci }} style={styles.image} />
        <View style={styles.pronoun}>
          <View style={styles.profileName}>
            <Text h2>{friend.firstName}</Text>
            <Text h2> </Text>
            <Text h2>{friend.lastName}</Text>
          </View>
          <View style={styles.profilePhoto}>
            <Text h4 style={styles.pronounText}>
              {friend.pronouns}
            </Text>
          </View>
        </View>
        <View style={styles.bio}>
          <Text>{friend.bio}</Text>
        </View>

        <FlatList
          data={activities}
          renderItem={({ item }) => {
            return <MiniActivityCard activityInfo={item} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 10,
    padding: 10,
  },
  profilePhoto: {
    justifyContent: "center",
    alignItems: "center", // Aligns items (Text, Image) horizontally in the center
  },
  profileCard: {
    justifyContent: "center",
    alignItems: "center", // Aligns items (Text, Image) horizontally in the center
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 5,
    backgroundColor: palette.beige,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: -1, height: 5 },
    margin: 5,
    borderRadius: 10,
  },
  profileName: {
    justifyContent: "center",
    flexDirection: "row",
  },
  pronoun: {
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center", // Aligns items (Text) horizontally in the center
    margin: 10,
  },
  image: {
    borderRadius: 100,
    resizeMode: "cover",
    width: 200,
    height: 200,
    margin: 10,
  },
  pronounText: {
    color: palette.gray,
    margin: 5,
  },
  bio: {
    backgroundColor: palette.white,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: -1, height: 5 },
    margin: 5,
    borderRadius: 10,
    padding: 5,
  },
});
