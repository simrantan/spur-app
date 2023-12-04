import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";
import { Button, Text } from "@rneui/themed";

import { Link } from "expo-router";

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text h1 style={styles.title}>
          Spurs
        </Text>
        <Button title="button" onPress={() => console.log("hello")} />
      </View>
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
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
