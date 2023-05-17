import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routing";

import { useMediaQuery } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMemo } from "react";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserContextProvider } from "./contexts/UserContext";
import { amber, blue, green } from "@mui/material/colors";
import SiteMap from "./routing/Sitemap";
import { Provider } from 'react-redux';
import { CartContextProvider } from "./contexts/CartContext";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: "#000",
            light: blue[700]
          }
        },
        typography: {
          fontFamily: [
            "-apple-system",
            "Inter",
            '"Helvetica Neue"',
            "IBM Plex Sans",
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Symbol"',
          ].join(","),
        },
      }),
    [prefersDarkMode]
  );
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <UserContextProvider>
        <CartContextProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
              <AppRoutes SiteMap={SiteMap} />
            </Router>
          </ThemeProvider>
        </CartContextProvider>
      </UserContextProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
