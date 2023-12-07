import React, { useState, useEffect } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase, activitiesTable } from "../utils/supabase";
import Swiper from "react-native-deck-swiper";
import { Button, Dialog, useTheme } from "@rneui/themed";
import ActivityCardFront from "./ActivityCardFront";
import ActivityCardBack from "./ActivityCardBack";
import { Themes } from "../assets/Themes";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

export default ActivityStack = () => {
  const [activities, setActivities] = useState([]);
  const [isVisible, setisVisible] = useState(false);
  const [currActivity, setcurrActivity] = useState(0);

  const { theme } = useTheme();

  const fetchActivities = async () => {
    const { data, error } = await supabase.from(activitiesTable).select("*");
    if (error) console.error(error);
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
          overlayStyle={styles.moreInfoDialog}
        >
          <ActivityCardBack
            index={activities[currActivity].id}
            activityTitle={activities[currActivity].activityTitle}
            activityImageUri={activities[currActivity].activityImageUri}
            quickInfo={activities[currActivity].quickInfo}
            interestedFriendIds={activities[currActivity].interestedFriendIds}
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
                <View style={styles.cardContainer}>
                  <ActivityCardFront
                    activityTitle={activity.activityTitle}
                    activityImageUri={activity.activityImageUri}
                    quickInfo={activity.quickInfo}
                    onPress={() => setisVisible(true)}
                  />
                </View>
              );
            }
          }}
          keyExtractor={(activity) => {
            return activity ? activity.id : Math.random(); // I know this is bad style but it keeps trying to render undefined objects
          }}
          onSwiped={(cardIndex) => {
            console.log("onSwiped - cardIndex:", cardIndex);
            setcurrActivity(cardIndex + 1);
          }}
          setIndex={currActivity}
          onSwipedAll={() => {
            console.log("onSwipedAll");
          }}
          onSwipedLeft={(cardIndex) =>
            updateDB(activities[cardIndex].id, false)
          }
          onSwipedRight={(cardIndex) =>
            updateDB(activities[cardIndex].id, true)
          }
          //cardIndex={0}
          stackSize={3}
          verticalSwipe={false}
          marginTop={-50}
          backgroundColor={theme.colors.background}
          cardIndex={isVisible ? -1 : 0}
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
    // overflow: "hidden",
    backgroundColor: Themes.bg,
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  moreInfoDialog: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.6,
    borderRadius: 10,
    overflow: "hidden",
  },
});
