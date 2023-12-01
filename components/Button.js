import { StyleSheet, Pressable, Text } from "react-native";
import { Themes } from "../assets/Themes";

export default function Button({ alternative, label, onPress }) {
  return (
    <Pressable
      style={[
        styles.button,
        alternative ? styles.altButton : styles.primaryButton,
      ]}
      onPress={onPress}
    >
      <Text style={alternative ? styles.altButtonText : styles.buttonText}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  primaryButton: {
    backgroundColor: Themes.buttonPrimaryFill,
    color: Themes.buttonPrimaryText,
  },
  altButton: {
    backgroundColor: Themes.buttonSecondaryFill,
    color: Themes.buttonSecondaryText,
    borderColor: Themes.buttonSecondaryOutline,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 24,
    color: Themes.buttonPrimaryText,
    fontWeight: "bold",
  },
  altButtonText: {
    fontSize: 24,
    color: Themes.buttonSecondaryText,
  },
});
