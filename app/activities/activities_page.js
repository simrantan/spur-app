import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import MiniActivityCard from "../../components/MiniActivityCard";
import { Themes } from "../../assets/Themes";
import { Stack } from "expo-router";
import { supabase, activitiesTable } from "../../utils/supabase";
import { Button } from "@rneui/themed";

export default function Page() {
  const [activities, setActivities] = useState();

  const fetchActivities = async () => {
    const { data, error } = await supabase
      .from(activitiesTable)
      .select("*")
      .eq("isLiked", "true");
    if (error) console.error(error);
    else {
      console.log("fetched activities", data);
      setActivities(data);
    }
  };

  useEffect(() => {
    fetchActivities();
    console.log("activities are: ", activities);
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "My Activities",
        }}
      />
      <View style={styles.main}>
        {activities ? (
          <FlatList
            data={activities}
            renderItem={({ item, index }) => {
              return <MiniActivityCard activityInfo={item} />;
            }}
            ItemSeparatorComponent={
              <View style={{ height: 1, backgroundColor: "lightgray" }} />
            }
          />
        ) : (
          <Button loading />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: Themes.bg,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    // marginHorizontal: 10,
    backgroundColor: Themes.bgSecondary,
    flexGrow: 1,
    width: "100%",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
