import { View, Pressable } from "react-native";
import { Text } from "@rneui/themed";
import { useState } from "react";
import { StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Themes } from "../assets/Themes";

function Checkbox({ title }) {
  const [checked, setChecked] = useState(false);
  var boxToUse = (
    <Ionicons name="square-outline" size={32} color={Themes.textPrimary} />
  );
  if (checked) {
    boxToUse = (
      <Ionicons name="checkbox" size={32} color={Themes.textPrimary} />
    );
  }
  return (
    <View style={styles.checkbox}>
      <Pressable onPress={() => setChecked(!checked)}>{boxToUse}</Pressable>
      <Text style={styles.bodytext}>{title}</Text>
    </View>
  );
}

export default function Checklist({ needsList }) {
  if (typeof needsList === "string") {
    try {
      needsList = JSON.parse(needsList);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <View style={styles.app}>
      {needsList.map((item, index) => {
        return <Checkbox title={item} key={index} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  bodytext: {
    fontSize: 16,
    color: "black",
    paddingLeft: 5,
  },
});
