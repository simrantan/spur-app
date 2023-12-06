import React, { useState, useEffect, useMemo, useCallback } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase, activitiesTable } from "../utils/supabase";
import Swiper from "react-native-deck-swiper";
import ActivityCard from "./ActivityCard";
import { Button, Text } from "@rneui/themed";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

const alreadyRemoved = [];
//let activityState = table; // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.

export default ActivityStack = () => {
  const [lastRemovedActivity, setLastRemovedActivity] = useState();
  const [lastDirection, setLastDirection] = useState();
  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    const { data, error } = await supabase.from(activitiesTable).select("*");
    if (error) console.log("error", error);
    else {
      setActivities(data);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  useEffect(() => {
    if (lastDirection && lastRemovedActivity) {
      updateDB(lastRemovedActivity, lastDirection);
    }
  }, [activities]);

  const childRefs = useMemo(
    () =>
      Array(activities.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const swiped = useCallback(
    (direction, id) => {
      console.log("removing: " + id + " to the " + direction);
      setLastDirection(direction);
      setLastRemovedActivity(id);
      alreadyRemoved.push(id);
      console.log(id + " left the screen!");
      let newActivities = activities.filter((item) => item.id !== id);
      setActivities(newActivities);
    },
    [activities]
  );

  const updateDB = async (id, liked) => {
    const { data, error } = await supabase
      .from(activitiesTable)
      .update({ isLiked: liked })
      .eq("id", id)
      .select();

    if (error) {
      console.log("error here", error);
    } else {
      console.log("successful update, marked:", data);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {activities ? (
        <Swiper
          style={styles.swiper}
          cards={activities}
          renderCard={(activity) => {
            console.log("rendering activity", activity);
            if (activity) {
              return (
                <View style={styles.cardContainer}>
                  <ActivityCard
                    activityTitle={activity.activityTitle}
                    activityImageUri={activity.activityImageUri}
                    quickInfo={activity.quickInfo}
                    interestedFriends={activity.interestedFriends}
                    description={activity.description}
                    needsList={activity.needs}
                  />
                </View>
              );
            }
          }}
          keyExtractor={(activity) => {
            activity ? activity.id : null;
          }}
          onSwiped={(cardIndex) => {
            console.log(cardIndex);
          }}
          onSwipedAll={() => {
            console.log("onSwipedAll");
          }}
          onSwipedLeft={(cardIndex) =>
            updateDB(activities[cardIndex].id, false)
          }
          onSwipedRight={(cardIndex) =>
            updateDB(activities[cardIndex].id, true)
          }
          cardIndex={0}
          stackSize={3}
          verticalSwipe={false}
          marginTop={-50}
        ></Swiper>
      ) : (
        <Button loading />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: "#aa00ee",
    borderColor: "red",
    borderWidth: 1,
    paddingVertical: 10,
    overflow: "hidden",
  },
  cardContainer: {
    maxHeight: windowHeight * 0.75,
    borderRadius: 10,
    borderColor: "magenta",
    borderWidth: 1,
    overflow: "hidden",
  },
  // swiper: {
  //   borderColor: "blue",
  //   borderWidth: 1,
  // },
});
