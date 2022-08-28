import * as React from 'react';
import './App.css';
import {CssBaseline, ThemeProvider} from "@mui/material";
import MyThemeContext from "./context/ColorModeContext";
import UserContext from "./context/GlobalData/User";
import {useContext} from "react";
import PublicRouter from "./component/router/PublicRouter";
import PrivateRouter from "./component/router/PrivateRouter";
import SignIn from "./pages/signIn/SignIn";

function App() {
    const {theme} = useContext(MyThemeContext);
    const {user} = useContext(UserContext);
    return (
      <ThemeProvider theme={theme}>
          <CssBaseline />
          {
              user ? <PrivateRouter /> : <PublicRouter />
          }
      </ThemeProvider>
  );
}

export default App;
