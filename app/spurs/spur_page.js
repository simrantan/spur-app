import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";

import { Link } from "expo-router";

export default function Page() {
  const [activites, setActivites] = useState([]);

  const fetchActivities = async () => {
    const { data, error } = await supabase.from("test_table").select("*");
    if (error) console.log("error", error);
    else {
      console.log(data);
      setActivites(data);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Spurs</Text>
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
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
