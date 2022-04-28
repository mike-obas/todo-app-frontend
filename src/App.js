import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./utils/theme";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./routes/Main";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Main />
      </Router>
    </ThemeProvider>
  );
}

export default App;
