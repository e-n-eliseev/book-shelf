import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1B3764",
    },
    secondary: {
      main: "#FFCA42",
    },
  },
  components: {
    MuiPagination: {
      styleOverrides: {
        root: {
          color: "#f8d862",
          maxWidth: "365px",
          margin: "20px 0 0",
          backgroundColor: "#FFFFFF",
          border: "3px solid #FFCA42",
          borderRadius: "30px",
          padding: "5px",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.25)",
        },
        outlined: {
          color: "#f8d862",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "12px",
          textAlign: "center",
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        root: {
          textAlign: "center",
          fontWeight: "500",
        },
        paper: {
          padding: "10px",
          color: "#1B3764",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#1B3764",
          fontWeight: "700",
        },
        shrink: {
          marginTop: "-5px",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#1B3764",
          fontWeight: "700",
          fontSize: "16px",
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        page: {
          color: "#1B3764",
          fontSize: "18px",
          fontWeight: "700",
          border: "none",
        },
        icon: {
          color: "#1B3764",
          fontSize: "28px",
          fontWeight: "700",
        },
      },
    },
  },
});
