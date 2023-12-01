import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ImageBackground, Text, View, Button } from "react-native";
import { supabase } from "../utils/supabase";
import TinderCard from "react-tinder-card";

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

const db = [
  {
    name: "Richard Hendricks",
    img: require("../assets/Images/pickleball.jpg"),
  },
  {
    name: "Erlich Bachman",
    img: require("../assets/Images/pickleball.jpg"),
  },
  {
    name: "Monica Hall",
    img: require("../assets/Images/pickleball.jpg"),
  },
  {
    name: "Jared Dunn",
    img: require("../assets/Images/pickleball.jpg"),
  },
  {
    name: "Dinesh Chugtai",
    img: require("../assets/Images/pickleball.jpg"),
  },
];

const alreadyRemoved = [];
//  = db; // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.

const ActivityStack = () => {
  const [lastRemovedActivity, setLastRemovedActivity] = useState();
  const [lastDirection, setLastDirection] = useState();
  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    const { data, error } = await supabase.from("test_table").select("*");
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
      Array(db.length)
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
      .from("test_table")
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

  const swipe = (dir) => {
    const cardsLeft = characters.filter(
      (person) => !alreadyRemoved.includes(person.name)
    );
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name; // Find the card object to be removed
      const index = db.map((person) => person.name).indexOf(toBeRemoved); // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir); // Swipe the card!
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>React Native Tinder Card</Text>
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
                <View style={styles.card}>
                  {/* <ImageBackground style={styles.cardImage} source={character.img}> */}
                  <Text style={styles.cardTitle}>{activity.name}</Text>
                  {/* </ImageBackground> */}
                </View>
              </TinderCard>
            )
          )
        )}
      </View>
      <View style={styles.buttons}>
        <Button onPress={() => swiped("left")} title="Swipe left!" />
        <Button onPress={() => swiped("right")} title="Swipe right!" />
      </View>
      {lastDirection ? (
        <Text style={styles.infoText} key={lastDirection}>
          You swiped {lastDirection}
        </Text>
      ) : (
        <Text style={styles.infoText}>
          Swipe a card or press a button to get started!
        </Text>
      )}
    </View>
  );
};

export default ActivityStack;
