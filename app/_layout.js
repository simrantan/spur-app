import { useState, useCallback, useEffect } from "react";
import { Tabs } from "expo-router";
import { ThemeProvider, Button, createTheme, useTheme } from "@rneui/themed";
import { theme } from "../assets/Themes";

import * as SplashScreen from "expo-splash-screen";
import { useFonts, SpicyRice_400Regular } from "@expo-google-fonts/spicy-rice";
import {
  Montserrat_100Thin,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
  Montserrat_100Thin_Italic,
  Montserrat_200ExtraLight_Italic,
  Montserrat_300Light_Italic,
  Montserrat_400Regular_Italic,
  Montserrat_500Medium_Italic,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold_Italic,
  Montserrat_800ExtraBold_Italic,
  Montserrat_900Black_Italic,
} from "@expo-google-fonts/montserrat";

import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

SplashScreen.preventAutoHideAsync();

export default function HomeLayout() {
  let [fontsLoaded, fontError] = useFonts({
    SpicyRice_400Regular,
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
    Montserrat_100Thin_Italic,
    Montserrat_200ExtraLight_Italic,
    Montserrat_300Light_Italic,
    Montserrat_400Regular_Italic,
    Montserrat_500Medium_Italic,
    Montserrat_600SemiBold_Italic,
    Montserrat_700Bold_Italic,
    Montserrat_800ExtraBold_Italic,
    Montserrat_900Black_Italic,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  return (
    <ThemeProvider theme={createTheme(theme)}>
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
    </ThemeProvider>
  );
}
