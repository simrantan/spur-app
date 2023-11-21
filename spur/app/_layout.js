import { Tabs } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="explore"
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="explore" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="activities"
        options={{
          tabBarLabel: "Activities",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="box" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          tabBarLabel: "Friends",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="user-friends" size={size} color={color} />
          ),
        }}
      />
        <Tabs.Screen
        name="spurs"
        options={{
          tabBarLabel: "Spurs",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="envelope" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );