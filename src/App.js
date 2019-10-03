import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Dashboard from "./Dashboard";
import { red, grey, blue } from "@material-ui/core/colors";

// Initialize Firebase
const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: grey,
    error: red
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
