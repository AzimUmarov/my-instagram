import React from 'react';
import Typography from "@mui/material/Typography";

const elements =[
    {
        title:"About",
        link: "https://github.com/theazimjon/my-instagram"
    },
    {
        title:"Developer",
        link: "https://github.com/theazimjon"
    },
    {
        title:"Help",
        link: "mailto:theazimjon@gmail.com"
    },
    {
        title:"Github",
        link: "https://github.com/theazimjon/my-instagram"
    },
    {
        title:"Linkedin",
        link: "https://www.linkedin.com/in/theazimjon/"
    }
]

function Footer({whatFor}) {
    return (
        <Typography component="div" sx={{ml: -6, display: whatFor !== "home" ? "flex" : "auto" }}>
        <Typography component={"ul"} variant={"caption"} sx={{display: 'flex', color: "#A9A9A9"}} >
            {elements.map((item, index) =>
                <Typography style={index === 0 ? {listStyleType: "none"} : null} component={"li"} variant={"caption"} sx={{mr: 1, ml :1.5, cursor: "pointer"}} onClick={() => window.location.href = item.link }>
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
