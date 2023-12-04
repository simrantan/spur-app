//prob move to spurs tab
import {
  Button,
  StyleSheet,
  SafeAreaView,
  Text,
  Pressable,
  Image,
  Dimensions,
  FlatList,
} from "react-native";

import { useSpotifyAuth, useSpotifyTracks } from "../utils/index.js";
import { Stack } from "expo-router";
import { Themes } from "../assets/Themes/index.js";
import Song from "./Song.js";
import SpurInvite from "./SpurInvite.js";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

function renderTitle() {
  return (
    <View style={styles.header_style}>
      <Image
        source={require("../assets/spotify-logo.png")}
        style={styles.icon}
      ></Image>
      <Text style={styles.button_text}>The Rough Draft</Text>
    </View>
  );
}
export default function App() {
  const { token, getSpotifyAuth } = useSpotifyAuth();
  const tracks = useSpotifyTracks(token);

  const renderSong = ({ item, index }) => (
    <Song
      albumImage={item.imageUrl}
      songTitle={item.songTitle}
      songArtist={item.songArtists}
      albumName={item.albumName}
      duration={item.duration}
      id={index}
      previewUrl={item.previewUrl}
      externalUrl={item.externalUrl}
    />
  );

  let contentDisplayed = null;

  if (isAccepted) {
    contentDisplayed = <SpurInvite />;
  } else {
    contentDisplayed = (
      <View>
        <Text>No Spurs</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "" }}></Stack.Screen>
      {contentDisplayed}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Themes.colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  button_text: {
    color: Themes.colors.white,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    margin: 15,
  },
  button_style: {
    width: windowWidth * 0.7,
    height: windowWidth * 0.17,
    backgroundColor: Themes.colors.spotify,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    borderRadius: 30,
  },
  header_style: {
    backgroundColor: Themes.colors.background,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  icon: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    margin: 15,
  },
});
