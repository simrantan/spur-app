import { StyleSheet, View } from "react-native";

import { Button, Text } from "@rneui/themed";

import { Stack, Link, router } from "expo-router";

export default function Page() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "",
          headerShown: false, // Hide the default navigation header
        }}
      ></Stack.Screen>
      <View style={styles.main}>
        <Text h1 style={styles.title}>
          Spurs
        </Text>
        <Button
          title="button"
          onPress={() => {
            router.push("spurs/NewSpurPage");
          }}
        />
        <Button
          title="invites"
          onPress={() => router.push("spurs/spurInvitePending")}
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
