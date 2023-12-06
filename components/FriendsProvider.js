import React, { useState, useEffect } from "react";
import { supabase, friendsTable } from "../utils/supabase";
import FriendsContext from "../contexts/FriendsContext";
import { Text } from "@rneui/themed";

export default function FriendsProvider({ children }) {
  const [friends, setFriends] = useState([]);
  //   const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      const { data, error } = await supabase.from(friendsTable).select("*");
      if (error) console.log("error", error);
      else setFriends(data);
      setLoading(false);
    };

    fetchFriends();
  }, []);

  //   if (loading) {
  //     return <Text>Loading...</Text>; // replace this with your actual loading screen or placeholder content
  //   }

  return (
    <FriendsContext.Provider value={friends}>
      {children}
    </FriendsContext.Provider>
  );
}
