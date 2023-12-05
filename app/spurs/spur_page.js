import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";
import { Button, Text } from "@rneui/themed";

import { Link, router, Stack } from "expo-router";

export default function Page() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Spurs",
        }}
      />
      <View style={styles.main}>
        <Text h1 style={styles.title}>
          Spurs
        </Text>
        <Button
          title="button"
          onPress={() => {
            router.push({ pathname: "spurs/NewSpurPage", params: { id: 4 } });
          }}
        />
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
});
