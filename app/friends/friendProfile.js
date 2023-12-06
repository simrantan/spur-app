import React, { useState, useEffect, useMemo, useCallback } from "react";
import { View, SafeAreaView, Dimensions } from "react-native";
import { supabase } from "../../utils/supabase";
import TinderCard from "react-tinder-card";
import ActivityCard from "../../components/ActivityCard";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

export default function Page() {
  const friend = useLocalSearchParams();
  console.log("1:", activity);
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "",
        }}
      />
      <View style={styles.profilePhoto}>
        <Image source={{ uri: friend.profileImageHci }} />
      </View>
      <View style={styles.profileName}>
        <Text h3>{friend.firstName}</Text>
        <Text h3>{friend.LastName}</Text>
      </View>
      <View style={styles.profilePhoto}>
        <Text h4>{friend.pronouns}</Text>
      </View>
      <View style={styles.profilePhoto}>
        <Text>{friend.bio}</Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: Themes.bg,
  },
  profilePhoto: {
    justifyContent: "center",
    flex: 1,
  },
  profileName: {
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },

  image: {
    resizeMode: "cover",
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    alignSelf: "flex-start",
    borderRadius: 5,
    margin: 6,
  },
});
