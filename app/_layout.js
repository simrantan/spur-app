import { Tabs } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

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
            <MaterialIcons name="explore" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="activities"
        options={{
          tabBarLabel: "Activities",
          tabBarIcon: ({ size, color }) => (
            <Entypo name="box" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          tabBarLabel: "Friends",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="spurs"
        options={{
          tabBarLabel: "Spurs",
          title: "Spur",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="envelope" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dummy"
        options={{
          tabBarLabel: "Dummy",
          title: "Dummy",
          // tabBarIcon: ({ size, color }) => (
          //   <FontAwesome name="dummy" size={size} color={color} />
          // ),
        }}
      />
    </Tabs>
  );
}
