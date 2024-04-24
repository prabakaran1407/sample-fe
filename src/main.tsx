/** @format */

import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/AppTheme";
import { BrowserRouter as Router } from "react-router-dom";
import { StyledEngineProvider } from '@mui/material/styles'

// ****************** Redux
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { SnackbarProvider } from "notistack";
import "react-toastify/dist/ReactToastify.css";

// Strict mode removed for multiple times same api called
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Router>
          <SnackbarProvider
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            maxSnack={1}
            autoHideDuration={3000}
            preventDuplicate
          />
          <App />
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  </Provider>
  // </React.StrictMode>
);
