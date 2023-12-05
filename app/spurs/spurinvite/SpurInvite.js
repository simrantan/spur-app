import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Pressable,
  ImageBackground,
  SafeAreaView,
  Linking,
} from "react-native";
import { Button, Text } from "@rneui/themed";
import React from "react";

import { Link, Stack, router } from "expo-router";
import { palette } from "../../../assets/Themes/palette";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");
//set table

export default function SpurInvite({
  id,
  activityPhoto,
  activityTitle,
  friend,
  time,
  address,
}) {
  return (
    <SafeAreaView style={styles.item}>
      <View>
        <View style={styles.activityInfo}>
          <Image style={styles.image} source={{ uri: activityPhoto }}></Image>
          <View style={styles.activityDetails}>
            <Text h2>{activityTitle}</Text>
            <View style={styles.from}>
              <View style={styles.promptbox}>
                <Text style={styles.textalign}> From </Text>
              </View>
              <View style={styles.textbox}>
                <Text style={styles.textalign}>{friend.name}</Text>
              </View>
            </View>

            <View style={styles.from}>
              <View style={styles.promptbox}>
                <Text style={styles.textalign}> When </Text>
              </View>
              <View style={styles.textbox}>
                <Text style={styles.textalign}>{time}</Text>
              </View>
            </View>
            <View style={styles.from}>
              <View style={styles.promptbox}>
                <Text style={styles.textalign}> Where </Text>
              </View>
              <View style={styles.textbox}>
                <Text
                  style={styles.textalign}
                  numberOfLines={1}
                  onPress={() =>
                    Linking.openURL("https://maps.app.goo.gl/95YrRaC6fJzUzkR69")
                  }
                >
                  {address}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.acceptAndReject}>
        <Button
          title="Accept"
          size="sm"
          onPress={() => {
            router.push("spurs/spurinvite/spurInviteAccepted");
          }}
        />

        <Button
          title="Accept"
          size="sm"
          onPress={() => {
            router.push("spurs/spurinvite/postRejected");
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    width: windowWidth * 0.95,
    flex: 2,
    backgroundColor: "pink",
    borderRadius: 5,
    flexDirection: "center",
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: { width: -1, height: 5 },
    alignSelf: "center",
    borderRadius: 10,
  },
  activityInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  activityDetails: {
    flexDirection: "column",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    direction: "ltr",
  },
  acceptAndReject: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 10,
  },
  from: {
    flexDirection: "row",
    justifyContent: "center",
  },
  promptbox: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.07,
    marginVertical: 3,
    justifyContent: "center",
  },
  textbox: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.07,
    backgroundColor: "white",
    borderRadius: 20,
    marginVertical: 3,
  },
  textalign: {
    margin: 5,
  },

  image: {
    resizeMode: "cover",
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    alignSelf: "flex-start",
    borderRadius: 5,
    margin: 6,
  },
});
