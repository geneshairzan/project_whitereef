import * as React from "react";
import { createTheme, ThemeProvider, responsiveFontSizes, StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function CustomStyles({ isDark, ...props }) {
  const color = {
    primary: {
      main: "#1a7cbe",
      contrastText: "#fff",
      light: "#9bcfff",
    },

    secondary: {
      main: "#FC6736",
      contrastText: "#fff",
      light: "#ff9b5f",
    },

    pwhite: {
      main: "#fff",
      dark: "#fff",
      light: "#fff",
    },

    success: {
      main: "#17a369",
    },
    error: {
      main: "#e63946",
    },
    d: {
      r: "#9d0208",
      b: "#1e6091",
      g: "#52b69a",
    },

    grey: {
      a: "#9c9fac",
      b: "#575960",
      c: "#35363a",
    },

    cv: {
      blue: "#2f4858",
      red: "#ee6c4d",
    },
    //202124

    menu: {
      bg: "#402e25",
      active: "#d6974d",
      inactive: "#1c1512",
    },
  };

  const themeSetup = createTheme({
    palette: {
      // mode: isDark ? "dark" : "light",
      ...color,
    },
    typography: {
      fontFamily: "Helvetica",
      fontSize: 12,
      // h1: {
      //   fontWeight: 600,
      //   fontSize: 72,
      // },
      // h4: {
      //   fontWeight: 600,
      //   fontSize: 16,
      // },
    },
    components: {
      MuiTextField: {
        defaultProps: {
          size: "small",
          autoComplete: "new-password",
          inputProps: {
            autoComplete: "new-password",
            form: {
              autoComplete: "new-password",
            },
          },
        },
      },

      MuiButton: {
        defaultProps: {
          variant: "contained",
          color: "primary",
        },
        styleOverrides: {
          containedSecondary: {
            fontWeight: "bold",
          },
          containedOrange: {
            color: "white",
          },
          containedSuccess: {
            color: "white",
          },
        },
      },

      MuiTypography: {
        defaultProps: {
          body1: {
            color: "initial",
          },
          body2: {
            color: "initial",
          },
          variantMapping: {
            h1: "h1",
            h2: "h2",
            h3: "h3",
            h4: "h4",
            h5: "h5",
            h6: "h6",
            subtitle1: "p",
            subtitle2: "p",
            caption: "p",
            body1: "p",
            body2: "p",
            overline: "p",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={responsiveFontSizes(themeSetup)}>
      <CssBaseline />
      <StyledEngineProvider injectFirst>{props.children}</StyledEngineProvider>
    </ThemeProvider>
  );
}
