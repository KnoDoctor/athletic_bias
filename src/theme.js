import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: "#556cd6",
        },
        secondary: {
            main: "#19857b",
        },
        error: {
            main: "#d32f2f",
        },
        warning: {
            main: "#ED6C02",
        },
        info: {
            main: "#0288d1",
        },
        success: {
            main: "#2e7d32",
        },
        text: {
            primary: "rgba(0,0,0,0.87)",
            secondary: "rgba(0,0,0,0.6)",
            disabled: "rgba(0,0,0,0.38)",
        },
    },
});

export default theme;
