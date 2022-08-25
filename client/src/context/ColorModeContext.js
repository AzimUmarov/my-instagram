import {createContext, useEffect, useState} from 'react';
import {createTheme, useMediaQuery} from "@mui/material";
import * as React from "react";


const MyThemeContext = createContext({});

export const MyThemeProvider = ({children}) => {

    const pref =  useMediaQuery("(prefers-color-scheme: dark)");

    const [mode, setMode] = useState( pref ? "dark" : "light");
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );

    return (
        <MyThemeContext.Provider value={{setMode, mode, theme}}>
            {children}
        </MyThemeContext.Provider>
    )
}

export default MyThemeContext;
