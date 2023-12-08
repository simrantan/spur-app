import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Alert,
  Pressable,
  Dimensions,
} from "react-native";
import { Text, Button, Dialog, useTheme } from "@rneui/themed";
import { useLocalSearchParams, Stack } from "expo-router";
import {
  supabase,
  activitiesTable,
  friendsTable,
} from "../../../utils/supabase";
import MiniActivityCard from "../../../components/MiniActivityCard";
import InterestedFriendsList from "../../../components/friendComponents/InterestedFriendsList";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";
import PeopleChecklistItem from "../../../components/friendComponents/PeopleChecklistItem";
import { Themes } from "../../../assets/Themes";
import { palette } from "../../../assets/Themes/palette";
import InterestedFriendsChecklist from "../../../components/friendComponents/InterestedFriendsChecklist";

const suggestedDateTime = new Date(Date.now() + 9000000);
const { height: windowHeight, width: windowWidth } = Dimensions.get("window");
const dateFormat = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

export default function NewSpurPage() {
  //   const { id } = useLocalSearchParams();
  const { theme } = useTheme();
  const [isReady, setIsReady] = useState(false);
  const [activityIndex, setActivityIndex] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));

  const [visibleDateDialog, setVisibleDateDialog] = useState(false);
  const [visiblePeopleDialog, setVisiblePeopleDialog] = useState(false);

  const [friends, setFriends] = useState([]);

  const [selectedFriends, setSelectedFriends] = useState([]);

  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    const { data, error } = await supabase
      .from(activitiesTable)
      .select("*")
      .eq("isLiked", "true");
    if (error) console.error(error);
    else {
      //   let parsedActivities = [];
      //   console.log("fetched activities", data);
      //   for (i = 0; i < data.length; i++) {
      //     parsedActivities.push(JSON.parse(data[i]));
      //   }
      //   console.log("parsed activities", parsedActivities);
      //   setActivities(parsedActivities);

      //   interestedFriendIds
      setActivities(data);
      console.log("fetched activities", activities);
      console.log("first activity", activities[0]);
      console.log("first activity type", typeof activities[0]);
      console.log(
        "first activity interestedFriendIds",
        activities[0].interestedFriendIds
      );
    }
    // console.log("fetched activities", data);
    setIsReady(true);
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchFriends = async () => {
    const { data, error } = await supabase.from(friendsTable).select("*");
    if (error) console.error(error);
    else {
      setFriends(data);
    }
    // console.log("fetched friends", data);
    // console.log("friends", friends);
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  useEffect(() => {
    if (
      activities === undefined ||
      activities.length === 0 ||
      friends === undefined ||
      friends.length === 0
    ) {
      //   console.log("activities", activities);
      //   console.log("friends", friends);
      setIsReady(false);
    } else {
      setIsReady(true);
    }
  }, [activities, friends]);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showDatePicker = () => {
    setVisibleDateDialog(true);
  };

  const showPeoplePicker = () => {
    setVisiblePeopleDialog(true);
  };

  const changeActivity = () => {
    if (activityIndex === activities.length - 1) {
      setActivityIndex(0);
    } else {
      setActivityIndex(activityIndex + 1);
    }
  };

  const changeSelectedFriends = (friendId) => {
    let newSelectedFriends = selectedFriends.slice();
    console.log("newSelectedFriends", newSelectedFriends);
    console.log("newSeledtedFriends type", typeof newSelectedFriends);
    if (newSelectedFriends.includes(friendId)) {
      newSelectedFriends = newSelectedFriends.filter((id) => id !== friendId);
    } else {
      newSelectedFriends.push(friendId);
    }
    setSelectedFriends(newSelectedFriends);
  };

  const resetSelectedFriends = () => {
    if (activities.length === 0) {
      setSelectedFriends([]);
      return;
    }
    setSelectedFriends(
      JSON.parse(activities[activityIndex].interestedFriendIds)
    );
  };

  useEffect(() => {
    resetSelectedFriends();
  }, [activityIndex]);

  if (!isReady || activities.length === 0 || friends.length === 0) {
    return (
      <View style={styles.container}>
        <Stack.Screen />
        <Button title="Solid" type="solid" loading />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: "Create New Spur",
          }}
        />
        <View style={styles.createSpurSection}>
          <View style={styles.headerContainer}>
            <Text h3 style={styles.title}>
              Activity
            </Text>
            <Button
              title="Change Activity"
              type="outline"
              onPress={changeActivity}
              style={styles.smallButton}
              titleStyle={styles.smallButtonTitle}
            />
          </View>
          <View style={styles.sectionBodyContainer}>
            <MiniActivityCard activityInfo={activities[activityIndex]} />
          </View>
        </View>
        <View style={styles.createSpurSection}>
          <View style={styles.headerContainer}>
            <Text h3 style={styles.title}>
              People
            </Text>
            <Button
              title="Change People"
              type="outline"
              onPress={showPeoplePicker}
              style={styles.smallButton}
              titleStyle={styles.smallButtonTitle}
            />
          </View>
          <View style={styles.sectionBodyContainer}>
            <InterestedFriendsList
              interestedFriendIds={selectedFriends}
              emptyMessage={"Tap 'Change People' to select friends to spur."}
            />
          </View>
        </View>
        <View style={styles.createSpurSection}>
          <View style={styles.headerContainer}>
            <Text h3 style={styles.title}>
              Time
            </Text>
            <Button
              title="Change Time"
              type="outline"
              onPress={showDatePicker}
              style={styles.smallButton}
              titleStyle={styles.smallButtonTitle}
            />
          </View>
          <View style={styles.sectionBodyContainer}>
            <Text h4 style={{ padding: 10 }}>
              {date.toLocaleString(undefined, dateFormat)}
            </Text>
          </View>
        </View>

        <Dialog
          isVisible={visibleDateDialog}
          onBackdropPress={() => setVisibleDateDialog(false)}
        >
          <Text style={{ fontSize: 16 }}>
            Most of your friends are available at this time:{" "}
            {suggestedDateTime.toLocaleString(undefined, dateFormat)}
          </Text>
          <View style={styles.timeBox}>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              onChange={onDateChange}
            />
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="time"
              is24Hour={true}
              onChange={onDateChange}
            />
          </View>
        </Dialog>

        <Dialog
          isVisible={visiblePeopleDialog}
          onBackdropPress={() => setVisiblePeopleDialog(false)}
        >
          <View style={styles.peopleChecklist}>
            {JSON.parse(activities[activityIndex].interestedFriendIds).map(
              (friendId, index) => (
                <PeopleChecklistItem
                  person={friends.find((f) => f.id === friendId)}
                  key={index}
                  toggleChecked={() => changeSelectedFriends(friendId)}
                  isChecked={selectedFriends.includes(friendId)}
                />
              )
            )}
          </View>
        </Dialog>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text h2 style={styles.textStyle}>
                Successfly Sent!
              </Text>
              <Text h4 style={styles.textStyle}>
                We'll notify you when someone accepts this invitation.
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.close}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Button
          title="Send Spur"
          icon={
            <FontAwesome
              name="send"
              size={20}
              marginRight={10}
              color={theme.colors.white}
            />
          }
          onPress={() => setModalVisible(true)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Themes.bg,
    padding: 10,
    // padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  sectionBodyContainer: {
    flexDirection: "row",
    backgroundColor: Themes.bgSecondary,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
  },
  peopleChecklist: {
    flexDirection: "column",
    backgroundColor: Themes.bgSecondary,
    overflow: "hidden",

    // flexDirection: "row",
    // width: "100%",
    // flexWrap: "wrap",
    // flexGrow: 1,
    // justifyContent: "space-around",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  smallButtonTitle: {
    fontSize: 16,
    margin: 0,
  },
  smallButton: {
    minWidth: 200,
  },
  createSpurSection: {
    width: "100%",
    marginBottom: 20,
  },
  timeBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    justifyContent: "space-around",
    width: windowWidth * 0.9,
    height: windowHeight * 0.4,
    margin: 20,
    backgroundColor: palette.beige,
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 70,
    elevation: 5,
  },
  textStyle: {
    color: palette.accent,
  },
  close: {
    color: palette.lightblack,
  },
});
