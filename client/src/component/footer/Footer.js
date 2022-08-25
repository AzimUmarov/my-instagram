import React from 'react';
import Typography from "@mui/material/Typography";

const elements =[
    {
        title:"About",
        link: "/about"
    },
    {
        title:"Developer",
        link: "/developer"
    },
    {
        title:"Help",
        link: "/help"
    },
    {
        title:"Github",
        link: "/about"
    },
    {
        title:"Linkedin",
        link: "/about"
    }
]

function Footer({whatFor}) {
    return (
        <Typography component="div" sx={{ml: -6, display: whatFor !== "home" ? "flex" : "auto" }}>
        <Typography component={"ul"} variant={"caption"} sx={{display: 'flex', color: "#A9A9A9"}} >
            {elements.map((item, index) =>
                <Typography style={index === 0 ? {listStyleType: "none"} : null} component={"li"} variant={"caption"} sx={{mr: 1, ml :1.5, cursor: "pointer"}} >
                    {item.title}
                </Typography>
            )}
        </Typography>
        <Typography component={"span"} variant={"caption"} sx={{color: "#A9A9A9", ml: "14%"}} >
            © 2022 MY INSTAGRAM QWASAR.IO
        </Typography>
        </Typography>
    );
}

export default Footer;
