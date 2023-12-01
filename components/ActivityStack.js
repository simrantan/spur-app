import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ImageBackground, Text, View, Button } from "react-native";
import { supabase } from "../utils/supabase";
import TinderCard from "react-tinder-card";
import ActivityCard from "./ActivityCard";

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  header: {
    color: "#000",
    fontSize: 30,
    marginBottom: 30,
  },
  cardContainer: {
    width: "90%",
    maxWidth: 260,
    height: 300,
  },
  card: {
    position: "absolute",
    backgroundColor: "green",
    width: "100%",
    maxWidth: 260,
    height: 300,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 20,
    borderRadius: 20,
    resizeMode: "cover",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: 20,
  },
  cardTitle: {
    position: "absolute",
    bottom: 0,
    margin: 10,
    color: "blue",
  },
  buttons: {
    margin: 20,
    zIndex: -100,
  },
  infoText: {
    height: 28,
    justifyContent: "center",
    display: "flex",
    zIndex: -100,
  },
};

const table = "Activities";
const alreadyRemoved = [];
//  = db; // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.

const ActivityStack = () => {
  const [lastRemovedActivity, setLastRemovedActivity] = useState();
  const [lastDirection, setLastDirection] = useState();
  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    const { data, error } = await supabase.from(table).select("*");
    if (error) console.log("error", error);
    else {
      console.log(data);
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

  // const swiped = (direction, id) => {
  //   console.log("removing: " + id + " to the " + direction);
  //   setLastDirection(direction);
  //   setLastRemovedActivity(id);
  //   alreadyRemoved.push(id);
  //   console.log(id + " left the screen!");
  //   newActivities = activities.filter((item) => item.id !== id);
  //   setActivities(newActivities);
  // };

  const swiped = useCallback(
    (direction, id) => {
      console.log("removing: " + id + " to the " + direction);
      setLastDirection(direction);
      setLastRemovedActivity(id);
      //alreadyRemoved.push(id);
      console.log(id + " left the screen!");
      newActivities = activities.filter((item) => item.id !== id);
      setActivities(newActivities);
    },
    [activities]
  );

  const updateDB = async (id, direction) => {
    let liked = false;
    if (direction === "right") {
      liked = true;
    }
    const { data, error } = await supabase
      .from(table)
      .update({ isLiked: liked })
      .eq("id", id)
      .select();

    if (error) {
      console.log("error here", error);
    } else {
      console.log("successful update, marked:", data);
    }
  };

  const outOfFrame = (id) => {};

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {activities.map(
          (activity, index) => (
            console.log("id", activity.id),
            (
              <TinderCard
                ref={childRefs[index]}
                key={activity.name}
                onSwipe={(dir) => swiped(dir, activity.id)}
                onCardLeftScreen={() => outOfFrame(activity.name)}
              >
                <ActivityCard needsList={activity.needsList} />
              </TinderCard>
            )
          )
        )}
      </View>
    </View>
  );
};

export default ActivityStack;
