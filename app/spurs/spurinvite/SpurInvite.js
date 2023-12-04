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

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");
//set table
table = "spurInvite";
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
              <Text style={styles.promptbox}> From </Text>
              <Text style={styles.textbox}>{friend.name}</Text>
            </View>

            <View style={styles.from}>
              <Text style={styles.promptbox}> When </Text>
              <Text style={styles.textbox}>{time}</Text>
            </View>
            <View style={styles.from}>
              <Text style={styles.promptbox}> Where </Text>
              <Text
                style={styles.textbox}
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
      <View style={styles.acceptAndReject}>
        <Button
          title="Accept"
          loading={false}
          loadingProps={{ size: "small", color: "white" }}
          onPress={() => {
            router.push("spurs/spurinvite/spurInviteAccepted");
          }}
        />

        <Button
          title="Reject"
          onPress={() => {
            router.push("spurs/spurinvite/blankSpurPage");
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    width: windowWidth,
    flex: 2,
    backgroundColor: "pink",
    borderRadius: 5,
    flexDirection: "center",
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
  },
  from: {
    flexDirection: "row",
  },
  promptbox: {
    width: 55,
    height: 22,
    marginVertical: 3,
  },
  textbox: {
    width: 90,
    height: 20,
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 3,
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
