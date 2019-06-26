import { createMuiTheme } from "@material-ui/core/styles";
import { blueGrey } from "@material-ui/core/colors";

// Converted rgba to rgb on white background
const palette = {
  primary: {
    light: "#E1BEE7", // rgba(255, 87, 34, 0.5)
    main: "#9C27B0",
    dark: "#7B1FA2",
    contrastText: "#FFF"
  },
  /*
  secondary: {
    light: "#B3E5FC",
    main: "#03A9F4",
    dark: "#0288D1",
    contrastText: "#ffffff"
  },
  */
  secondary: {
    light: "#4f5b62",
    main: blueGrey[900],
    dark: "#000a12",
    contrastText: "#ffffff"
  },
  background: {
    default: "#fafbfc"
  },
  text: {
    primary: "#212121",
    secondary: "#757575"
  },
  action: {
    disabled: "#DDDD"
  },
  common: {
    white: "#FFFFFF"
  },
  divider: "#BDBDBD"
};

// A theme with custom primary and secondary color.
// It's optional.
export const MuiTheme = createMuiTheme({
  palette,
  typography: {
    fontSize: 14,
    htmlFontSize: 14,
    fontFamily: "Ubuntu, Railway, Helvetica Neue",
    body1: {
      fontWeight: "normal",
      fontSize: "1rem"
    },
    body2: {
      fontWeight: "normal",
      fontSize: "1rem"
    },
    h6: {
      fontWeight: "normal",
      fontSize: 18
    }
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        "&$disabled": {
          color: palette.text.secondary
        }
      }
    },
    MuiSvgIcon: {
      root: {
        fontSize: 24
      }
    },
    MuiTableCell: {
      paddingCheckbox: {
        padding: `0 12px`
      }
    },
    MuiInputLabel: {
      root: {
        color: palette.text.primary
      }
    }
  }
});

export const toolbarHeight = MuiTheme.spacing(7);
