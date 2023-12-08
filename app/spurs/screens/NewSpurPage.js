import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Alert,
  Pressable,
  Dimensions,
  TextInput,
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
import { ScrollView } from "react-native-gesture-handler";

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
  const [location, setLocation] = useState("My house");

  const [visibleDateDialog, setVisibleDateDialog] = useState(false);
  const [visiblePeopleDialog, setVisiblePeopleDialog] = useState(false);
  const [visibleLocationDialog, setVisibleLocationDialog] = useState(false);

  const [friends, setFriends] = useState([]);

  const [selectedFriends, setSelectedFriends] = useState([]);

  const [activities, setActivities] = useState([]);

  const [spurSent, setSpurSent] = useState(false);

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

  const onChangeLocation = (event, selectedLocation) => {
    const currentLocation = selectedLocation;
    setLocation(currentLocation);
  };

  const showDatePicker = () => {
    setVisibleDateDialog(true);
  };

  const showPeoplePicker = () => {
    setVisiblePeopleDialog(true);
  };

  const showLocationPicker = () => {
    setVisibleLocationDialog(true);
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
  } else if (!spurSent) {
    return (
      <View style={styles.outerContainer}>
        <ScrollView>
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
                  emptyMessage={
                    "Tap 'Change People' to select friends to spur."
                  }
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
            <View style={styles.createSpurSection}>
              <View style={styles.headerContainer}>
                <Text h3 style={styles.title}>
                  Location
                </Text>
                <Button
                  title="Change Location"
                  type="outline"
                  onPress={showLocationPicker}
                  style={styles.smallButton}
                  titleStyle={styles.smallButtonTitle}
                />
              </View>
              <View style={styles.sectionBodyContainer}>
                <Text h4 style={{ padding: 10 }}>
                  {location}
                </Text>
              </View>
            </View>

            <Dialog
              isVisible={visibleDateDialog}
              onBackdropPress={() => setVisibleDateDialog(false)}
              style={styles.dialogBox}
            >
              <View style={styles.dialogContainer}>
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
              </View>
            </Dialog>

            <Dialog
              isVisible={visiblePeopleDialog}
              onBackdropPress={() => setVisiblePeopleDialog(false)}
            >
              <View style={styles.dialogContainer}>
                <View style={styles.interestedFiendsContainer}>
                  {JSON.parse(
                    activities[activityIndex].interestedFriendIds
                  ).map((friendId, index) => (
                    <PeopleChecklistItem
                      person={friends.find((f) => f.id === friendId)}
                      key={index}
                      toggleChecked={() => changeSelectedFriends(friendId)}
                      isChecked={selectedFriends.includes(friendId)}
                    />
                  ))}
                </View>
              </View>
            </Dialog>

            <Dialog
              isVisible={visibleLocationDialog}
              onBackdropPress={() => setVisibleLocationDialog(false)}
            >
              <View style={styles.dialogContainer}>
                <Text style={{ fontSize: 16 }}>
                  Where do you want to meet people?
                </Text>
                <TextInput
                  onChangeText={(newText) => setLocation(newText)}
                  value={location}
                  style={styles.textInput}
                  placeholder="Tap here to type"
                  fontSize={16}
                />
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
                    Spur sent!
                  </Text>
                  <Text h4 style={styles.textStyle}>
                    We'll notify you when someone accepts this invitation.
                  </Text>
                  <Button
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                    title="Close"
                    type="outline"
                  />
                </View>
              </View>
            </Modal>
            <View style={{ marginTop: 20, marginBottom: 30 }}>
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
                onPress={() => {
                  setModalVisible(true);
                  setSpurSent(true);
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={styles.outerContainer}>
        <ScrollView>
          <View style={styles.container}>
            <Stack.Screen
              options={{
                title: "Pending Spur",
              }}
            />
            <View style={styles.createSpurSection}>
              <View style={styles.headerContainer}>
                <Text h3 style={styles.title}>
                  Activity
                </Text>
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
              </View>
              <View style={styles.sectionBodyContainer}>
                <InterestedFriendsList
                  interestedFriendIds={selectedFriends}
                  emptyMessage={"This is a spur just for you."}
                />
              </View>
            </View>
            <View style={styles.createSpurSection}>
              <View style={styles.headerContainer}>
                <Text h3 style={styles.title}>
                  Time
                </Text>
              </View>
              <View style={styles.sectionBodyContainer}>
                <Text h4 style={{ padding: 10 }}>
                  {date.toLocaleString(undefined, dateFormat)}
                </Text>
              </View>
            </View>
            <View style={styles.createSpurSection}>
              <View style={styles.headerContainer}>
                <Text h3 style={styles.title}>
                  Location
                </Text>
              </View>
              <View style={styles.sectionBodyContainer}>
                <Text h4 style={{ padding: 10 }}>
                  {location}
                </Text>
              </View>
            </View>
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
                    Spur sent!
                  </Text>
                  <Text h4 style={styles.textStyle}>
                    We'll notify you when someone accepts this invitation.
                  </Text>
                  <Button
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                    title="Close"
                    type="outline"
                  />
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
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
    minHeight: 50,
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
    color: Themes.textPrimary,
  },
  close: {
    color: palette.lightblack,
  },
  outerContainer: {
    flex: 1,
    backgroundColor: palette.beige,
  },
  dialogContainer: {
    width: "130%",
    // height: "fit-content",
    position: "relative",

    alignSelf: "center",
    verticalAlign: "center",
    // justifyContent: "center",
    // alignItems: "center",
    margin: -20,
    padding: 20,
    borderRadius: 10,
    // overflow: "hidden",
    backgroundColor: palette.white,
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  interestedFriendsContainer: {
    flexDirection: "column",
    width: "100%",
    // alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderColor: "red",
    borderWidth: 1,
    // backgroundColor: palette.white,
    // overlayColor: "red",
  },
  textInput: {
    height: 40,
    borderColor: Themes.buttonPrimaryFill,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});
