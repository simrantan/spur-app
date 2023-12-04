import { useState, useEffect } from "react";
import { StyleSheet, View, Modal } from "react-native";
import { Text, Button, Dialog, useTheme } from "@rneui/themed";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "../../utils/supabase";
import MiniActivityCard from "../../components/MiniActivityCard";
import InterestedFriendsList from "../../components/friendComponents/InterestedFriendsList";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";
import PeopleChecklistItem from "../../components/friendComponents/PeopleChecklistItem";

const table = "Activities v3";
const suggestedDateTime = new Date(Date.now() + 9000000);
const dateFormat = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

export default function NewSpurPage() {
  // const { initialId } = useLocalSearchParams();
  const initialId = 7;
  const { theme } = useTheme();

  const [activityId, setactivityId] = useState(7);
  const [activity, setActivity] = useState([]);
  const [friends, setFriends] = useState([]);
  const [likedFriends, setLikedFriends] = useState([]);

  const [date, setDate] = useState(new Date(Date.now()));
  const [visibleDateDialog, setVisibleDateDialog] = useState(false);

  const [visiblePeopleDialog, setVisiblePeopleDialog] = useState(false);

  const fetchActivity = async () => {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("id", activityId);
    if (error) console.log("error", error);
    else {
      setActivity(data[0]);
      setFriends(JSON.parse(data[0].interestedFriends));
      setLikedFriends(Array(friends.length).fill(true));
    }
  };

  useEffect(() => {
    setactivityId(initialId);
  }, []);

  useEffect(() => {
    fetchActivity();
  }, [activityId]);

  const changeActivity = () => {
    setactivityId(activityId + 1);
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

  return (
    <View style={styles.container}>
      <MiniActivityCard
        activityImageUri={activity.activityImage}
        activityTitle={activity.activityTitle}
        quickInfo={activity.quickInfo}
      />
      <Button title="Change Activity" type="outline" onPress={changeActivity} />
      <InterestedFriendsList
        interestedFriends={friends.filter((item, i) => likedFriends[i])}
      />
      <Button title="change people" type="outline" onPress={showPeoplePicker} />
      <Text>selected: {date.toLocaleString(undefined, dateFormat)}</Text>
      <Button onPress={showDatePicker} title="Change date" type="outline" />

      <Dialog isVisible={visibleDateDialog} onBackdropPress={showPeoplePicker}>
        <Text h3>selected: {date.toLocaleString(undefined, dateFormat)}</Text>
        <Text>
          Most of your friends are available at this time:{" "}
          {suggestedDateTime.toLocaleString(undefined, dateFormat)}
        </Text>
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
      </Dialog>

      <Dialog
        isVisible={visiblePeopleDialog}
        onBackdropPress={() => setVisiblePeopleDialog(false)}
      >
        {friends.map((l, i) => (
          <PeopleChecklistItem
            person={l}
            key={i}
            toggleChecked={() => changePeople(i)}
            isChecked={likedFriends[i]}
          />
        ))}
      </Dialog>
      <Button
        title="Send Spur!"
        icon={
          <FontAwesome
            name="send"
            size={20}
            marginRight={10}
            color={theme.colors.white}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
});
