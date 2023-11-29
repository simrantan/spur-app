// import React, { useState } from "react";
import { FlatList, View, Text, Pressable } from "react-native";
import { CheckBox } from "@react-native-community/checkbox";
import { useState } from "react";
import { StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Themes } from "../assets/Themes";

// import Ionicons from "@expo/vector-icons/Ionicons";

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
      <Text>{title}</Text>
    </View>
  );
}

export default function Checklist({ needsList }) {
  return (
    <FlatList
      data={needsList}
      renderItem={({ item, index }) => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Checkbox title={item} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
});
