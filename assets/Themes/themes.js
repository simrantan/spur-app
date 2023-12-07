import { palette } from "./palette";

const theme = {
  lightColors: {
    primary: palette.accent,
    secondary: palette.accent2,
    background: palette.beige,
  },
  mode: "light",
  components: {
    Text: {
      style: {
        fontFamily: "Montserrat_400Regular",
      },
      h1Style: {
        fontFamily: "SpicyRice_400Regular",
      },
      h2Style: {
        fontFamily: "Montserrat_600SemiBold",
        fontWeight: "600",
      },
      h3Style: {
        fontFamily: "Montserrat_500Medium",
        fontWeight: "500",
      },
      h4Style: {
        fontFamily: "Montserrat_400Regular",
        fontWeight: "500",
      },
    },
    Button: {
      buttonStyle: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 10,
      },
      titleStyle: { fontSize: 24, fontWeight: "bold" },
    },
  },
};

const Themes = {
  bg: palette.beige,
  bgSecondary: palette.white,
  textPrimary: palette.lightBlack,
  textSecondary: palette.white,

  buttonPrimaryFill: palette.accent,
  buttonPrimaryText: palette.white,
  buttonPrimaryOutline: palette.accent,

  buttonSecondaryFill: palette.white,
  buttonSecondaryText: palette.lightBlack,
  buttonSecondaryOutline: palette.lightBlack,

  buttonDisabledFill: palette.gray,
  buttonDisabledText: palette.white,
  buttonDisabledOutline: palette.gray,

  activeSelection: palette.accent,
  notSelected: palette.lightBlack,

  shadowColor: palette.black,
};

export { theme, Themes };
