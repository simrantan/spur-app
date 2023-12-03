import { palette } from "./palette";

const theme = {
  lightColors: {
    primary: palette.accent,
    secondary: palette.accent2,
    background: palette.beige,
  },
  // mode: "light",
  components: {
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
};

export { theme, Themes };
