import * as React from 'react';
import './App.css';
import Navbar from "./component/navbar/Navbar";
import {CssBaseline, ThemeProvider} from "@mui/material";
import MyThemeContext from "./context/ColorModeContext";
import {useContext} from "react";
import Home from "./pages/home/Home";

function App() {
    const {theme} = useContext(MyThemeContext);
    return (
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />

          <Home/>
      </ThemeProvider>
  );
}

export default App;
