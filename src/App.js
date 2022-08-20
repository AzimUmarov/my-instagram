import * as React from 'react';
import './App.css';
import {CssBaseline, ThemeProvider} from "@mui/material";
import MyThemeContext from "./context/ColorModeContext";
import {useContext} from "react";
import PublicRouter from "./component/router/PublicRouter";
import PrivateRouter from "./component/router/PrivateRouter";

function App() {
    const {theme} = useContext(MyThemeContext);
    return (
      <ThemeProvider theme={theme}>
          <CssBaseline />
          {/*<PublicRouter />*/}
          <PrivateRouter />
      </ThemeProvider>
  );
}

export default App;
