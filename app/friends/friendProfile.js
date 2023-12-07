import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  View,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { Themes } from "../../assets/Themes";

import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Text } from "@rneui/themed";
import { palette } from "../../assets/Themes/palette";
import { FlatList } from "react-native-gesture-handler";
import MiniActivityCard from "../../components/MiniActivityCard";
import { supabase } from "../../utils/supabase";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

export default function Page() {
  const friend = useLocalSearchParams();
  const [activities, setActivities] = useState();
  const [filteredActivities, setFilteredActivities] = useState();
  const screenTitle = friend.firstName + "'s Profile";

  const fetchActivities = async () => {
    console.log("Friend interests", friend.interests);
    const id = friend.interests;
    //console.log("friendinterest", friend.interests);
    if (!friend.interests || friend.interests.length === 0) {
      console.log("No interests to fetch activities for.");
      return;
    }
    const { data, error } = await supabase.from("Activities v5").select("*");
    // .in("id", id);

    if (error) {
      console.error("Error fetching activities:", error);
    } else {
      setActivities(data);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  console.log("activities are: ", activities);
  const header = (
    <View style={styles.header}>
      <Stack.Screen
        options={{
          title: screenTitle,
        }}
      />

      <View style={styles.photoAndName}>
        <Image source={{ uri: friend.profileImageHci }} style={styles.image} />
        <View style={styles.nameAndPronoun}>
          {/* <View style={styles.profileNasme}> */}
          <Text h3 style={styles.profileName}>
            {friend.firstName} {friend.lastName}
          </Text>
          {/* </View> */}
          <Text h4 style={styles.pronounText}>
            {friend.pronouns}
          </Text>
        </View>
      </View>
      <Text h3 style={styles.sectionHeaderText}>
        Bio
      </Text>
      <View style={styles.bio}>
        <Text style={{ fontSize: 16 }}>{friend.bio}</Text>
      </View>
      <Text h3 style={styles.sectionHeaderText}>
        Interests
      </Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={activities?.filter((activity) => {
          return friend.interests.includes(activity.id);
        })}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.interestsList} key={index}>
              <MiniActivityCard activityInfo={item} />
            </View>
          );
        }}
        ItemSeparatorComponent={() => (
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                height: 1,
                backgroundColor: palette.white,
                width: 10,
              }}
            />
            <View
              style={{
                height: 1,
                backgroundColor: palette.accent,
                flex: 1,
                // paddingHorizontal: 10,
              }}
            />
            <View
              style={{
                height: 1,
                backgroundColor: palette.white,
                width: 10,
              }}
            />
          </View>
        )}
        ListHeaderComponent={header}
      />
    </View>
  );
  // return header;
  // return (
  //   <ScrollView contentContainerStyle={styles.container}>
  //     <Stack.Screen
  //       options={{
  //         title: "",
  //       }}
  //     />
  //     <View style={styles.profileCard}>
  //       <Image source={{ uri: friend.profileImageHci }} style={styles.image} />
  //       <View style={styles.pronoun}>
  //         <View style={styles.profileName}>
  //           <Text h2>{friend.firstName}</Text>
  //           <Text h2> </Text>
  //           <Text h2>{friend.lastName}</Text>
  //         </View>
  //         <View style={styles.profilePhoto}>
  //           <Text h4 style={styles.pronounText}>
  //             {friend.pronouns}
  //           </Text>
  //         </View>
  //       </View>
  //       <View style={styles.bio}>
  //         <Text>{friend.bio}</Text>
  //       </View>
  //       <View style={styles.interestsList}>
  //         <FlatList
  //           data={activities}
  //           renderItem={({ item, index }) => {
  //             return <MiniActivityCard activityInfo={item} />;
  //           }}
  //           ItemSeparatorComponent={() => (
  //             <View style={{ height: 1, backgroundColor: palette.accent }} />
  //           )}
  //           ListHeaderComponent={<View />}
  //         />
  //       </View>
  //     </View>
  //   </ScrollView>
  // );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Themes.bg,
    flex: 1,
    // marginHorizontal: 10,
  },
  profilePhoto: {
    // justifyContent: "center",
    // alignItems: "center", // Aligns items (Text, Image) horizontally in the center
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
    textAlign: "center",
  },
  nameAndPronoun: {
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center", // Aligns items (Text) horizontally in the center
    margin: 10,
    flex: 1,
    // textAlign: "center",
  },
  image: {
    borderRadius: 100,
    resizeMode: "cover",
    width: 100,
    aspectRatio: 1,
    margin: 10,
    // alignSelf: "flex-start",
    // alignSelf: "center",
  },
  pronounText: {
    color: "grey",
    margin: 5,
  },
  bio: {
    // backgroundColor: palette.white,
    // shadowColor: "black",
    // shadowOpacity: 0.2,
    // shadowRadius: 5,
    // shadowOffset: { width: -1, height: 5 },
    marginHorizontal: 5,
    borderRadius: 10,
    padding: 5,
    // fontSize: 16,
  },
  interestsList: {
    flex: 1,
    backgroundColor: palette.white,
    paddingHorizontal: 10,
  },
  sectionHeaderText: {
    marginLeft: 10,
    marginTop: 10,
    alignSelf: "left",
  },
  photoAndName: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // verticalAlign: "center",
  },
  header: {
    flex: 1,
    backgroundColor: palette.beige,
    borderRadius: 10,
    margin: 10,
  },
});
