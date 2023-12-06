import React, { useState, useEffect } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase, activitiesTable } from "../utils/supabase";
import Swiper from "react-native-deck-swiper";
import { Button, Dialog, useTheme } from "@rneui/themed";
import ActivityCardFront from "./ActivityCardFront";
import ActivityCardBack from "./ActivityCardBack";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

export default ActivityStack = () => {
  const [activities, setActivities] = useState([]);
  const [isVisible, setisVisible] = useState(false);
  const [currActivity, setcurrActivity] = useState(0);

  const { theme } = useTheme();

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
      {activities[currActivity] && (
        <Dialog
          isVisible={isVisible}
          onBackdropPress={() => setisVisible(false)}
        >
          <ActivityCardBack
            activityTitle={activities[currActivity].activityTitle}
            activityImageUri={activities[currActivity].activityImageUri}
            quickInfo={activities[currActivity].quickInfo}
            interestedFriends={activities[currActivity].interestedFriends}
            description={activities[currActivity].description}
            needsList={activities[currActivity].needs}
          />
        </Dialog>
      )}
      {activities ? (
        <Swiper
          cards={activities}
          renderCard={(activity, i) => {
            if (activity) {
              return (
                <View>
                  {/* <Button
                    onPress={() => setisVisible(true)}
                    title={"More Info"}
                  /> */}
                  <View style={styles.cardContainer}>
                    <ActivityCardFront
                      activityTitle={activity.activityTitle}
                      activityImageUri={activity.activityImageUri}
                      quickInfo={activity.quickInfo}
                      onPress={() => setisVisible(true)}
                    />
                  </View>
                </View>
              );
            }
          }}
          keyExtractor={(activity) => {
            return activity ? activity.id : Math.random(); // I know this is bad style but it keeps trying to render undefined objects
          }}
          onSwiped={(cardIndex) => {
            setcurrActivity(cardIndex + 1);
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
          backgroundColor={theme.colors.background}
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
    paddingVertical: 10,
    overflow: "hidden",
  },
  cardContainer: {
    maxHeight: windowHeight * 0.75,
    borderRadius: 10,
    overflow: "hidden",
  },
});
