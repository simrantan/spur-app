import {
  Button,
  StyleSheet,
  SafeAreaView,
  Text,
  Pressable,
  Image,
  Dimensions,
  FlatList,
  Linking,
} from "react-native";

import { Button, Text } from "@rneui/themed";
import { router, Stack } from "expo-router";
import QuickInfo from "../../../components/QuickInfo";
import InterestedFriendsList from "./InterestedFriendsList";
import { palette } from "../../../assets/Themes/palette";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

export default function Accepted(
  activityTitle,
  activityPhoto,
  address,
  time,
  quickInfo,
  interestedFriends,
  needsList
) {
    const [invites, setInvites] = useState([]);

    const fetchInvites = async () => {
      const { data, error } = await supabase.from(table).select("*");
      if (error) console.log("error", error);
      else {
        console.log(data);
        setInvites(data);
      }
    };
  
    useEffect(() => {
      fetchInvites();
    }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>{invites.activityTitle}</Text>
        <QuickInfo quickInfo={invites.quickInfo} size={30} />
        <Text style={styles.promptbox}>When</Text>
        <Text style={styles.textbox}>{time}</Text>
        <Text style={styles.promptbox}>Where</Text>
        <Text
                style={styles.textbox}
                numberOfLines={1}
                onPress={() =>
                  Linking.openURL("https://maps.app.goo.gl/95YrRaC6fJzUzkR69")
                }
              >
                {address}
              </Text>
        <Text>Attendees</Text>
        <InterestedFriendsList interestedFriends={invites.interestedFriends} />
        <Checklist needsList={invites.needsList} />
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.beige,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  promptbox: {
    width: windowWidth*0.3,
    height: windowWidth*0.1,
    marginVertical: 3,
  },
  textbox: {
    width: windowWidth*0.5,
    height: windowWidth*0,1,
    backgroundColor: "white",
    borderRadius: 5,
    marginVertical: 3,
  },
});
