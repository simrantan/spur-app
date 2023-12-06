import { useEffect } from "react";
import { Tabs, SplashScreen } from "expo-router";
import { ThemeProvider, createTheme } from "@rneui/themed";
import { theme } from "../assets/Themes";
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

import {
  FontAwesome,
  MaterialIcons,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";

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

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider theme={createTheme(theme)}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.lightColors.background,
            height: 100,
            borderTopColor: theme.lightColors.primary,
            borderTopWidth: 5,
          },
          tabBarItemStyle: {
            // backgroundColor: "#00ff00",
            margin: 5,
            borderRadius: 10,
          },
          tabBarActiveTintColor: theme.lightColors.primary,
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
          // Name of the route to hide.
          name="index"
          options={{
            // This tab will no longer show up in the tab bar.
            href: null,
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}
