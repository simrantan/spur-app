import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Alert,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Text, Button, Dialog, useTheme } from "@rneui/themed";
import {
  useLocalSearchParams,
  Stack,
  useNavigation,
  router,
} from "expo-router";
import { supabase, activitiesTable } from "../../../utils/supabase";
import MiniActivityCard from "../../../components/MiniActivityCard";
import InterestedFriendsList from "../../../components/friendComponents/InterestedFriendsList";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";
import PeopleChecklistItem from "../../../components/friendComponents/PeopleChecklistItem";
import { Themes } from "../../../assets/Themes";
import { palette } from "../../../assets/Themes/palette";
import { Ionicons } from "@expo/vector-icons";

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
  const { id, pagename } = useLocalSearchParams();

  const navigation = useNavigation();
  const { theme } = useTheme();

  const [isReady, setIsReady] = useState(false);
  const [activityId, setActivityId] = useState(1);
  const [activity, setActivity] = useState([]);
  const [friends, setFriends] = useState([]);
  const [likedFriends, setLikedFriends] = useState([]);
  const [isVisible, setisVisible] = useState(false);

  const [date, setDate] = useState(new Date(Date.now()));
  const [visibleDateDialog, setVisibleDateDialog] = useState(false);

  const [visiblePeopleDialog, setVisiblePeopleDialog] = useState(false);

  const fetchActivity = async () => {
    console.log("searching for id: ", activityId);
    //console.log(activitiesTable);
    const { data, error } = await supabase
      .from(activitiesTable)
      .select("*")
      .eq("id", activityId);
    if (error) console.error("error", error);
    else {
      console.log("got data!", data[0]);
      setActivity(data[0]);
      if (data[0].interestedFriendIds) {
        setFriends(JSON.parse(data[0].interestedFriendIds));
      }
      setLikedFriends(Array(friends.length).fill(true));
      setIsReady(true);
    }
  };

  useEffect(() => {
    setActivityId(Number(id));
  }, [id]);

  useEffect(() => {
    fetchActivity();
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            router.push(pagename);
          }}
          style={{ marginLeft: -17 }}
        >
          <Ionicons name="chevron-back" size={30} color={palette.accent} />
        </TouchableOpacity>
      ),
      title: "Spurs",
    });
  }, [activityId]);

  const changeActivity = () => {
    setActivityId(activityId + 1);
    setIsReady(false);
  };

  const changePeople = (i) => {
    let newLikedFriends = [...likedFriends];
    newLikedFriends[i] = !likedFriends[i];
    setLikedFriends(newLikedFriends);
  };

  const showPeoplePicker = () => {
    setVisiblePeopleDialog(true);
  };
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showDatePicker = () => {
    setVisibleDateDialog(true);
  };

  if (!isReady) {
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
            <MiniActivityCard activityInfo={activity} />
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
              interestedFriendIds={friends.filter((item, i) => likedFriends[i])}
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
            {friends.map((l, i) => (
              <PeopleChecklistItem
                person={l}
                key={i}
                toggleChecked={() => changePeople(i)}
                isChecked={likedFriends[i]}
              />
            ))}
          </View>
        </Dialog>
        <Dialog
          animationType="slide"
          transparent={true}
          visible={isVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setisVisible(!isVisible);
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
                onPress={() => {
                  setisVisible(!isVisible);
                  router.push("spurs/postAccepted");
                }}
              >
                <Text style={styles.close}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Dialog>
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
          onPress={() => setisVisible(true)}
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
    backgroundColor: palette.white,
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
