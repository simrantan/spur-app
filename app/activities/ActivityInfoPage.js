import React, { useState, useEffect, useMemo, useCallback } from "react";
import { View, SafeAreaView, Dimensions } from "react-native";
import { supabase } from "../../utils/supabase";
import TinderCard from "react-tinder-card";
import ActivityCard from "../../components/ActivityCard";
import { useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";
const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

export default function Page() {
  const activity = useLocalSearchParams();
  console.log("1:", activity);
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "",
        }}
      />
      <ActivityCard
        activityTitle={activity.activityTitle}
        activityImageUri={activity.activityImageUri}
        quickInfo={activity.quickInfo}
        interestedFriendIds={activity.interestedFriendIds}
        description={activity.description}
        needsList={activity.needs}
      />
    </SafeAreaView>
  );
}
