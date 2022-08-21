import React from 'react';
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import {Button, Link} from "@mui/material";
import {styles} from "./UserCardStyleObjects";

function UserCard({forWhat, user}) {
    return (
        <CardHeader
            sx={{ width: {xl: 460, lg: 460, md: 400}}}
            component="div"
            avatar={
                <Avatar sx={forWhat === "currentUserOnHomepage" || forWhat === "settings"  ? styles.forCurrentUserOnHomePage.avatar : null} alt="Remy Sharp" src={user.img} aria-label="recipe">
                </Avatar>
            }
            title={forWhat === "settings" ? <h6 style={{fontWeight: "bold"}}>username</h6> : "Shrimp and Chorizo Paella"}
            subheader={ <div>
                {forWhat === "settings" ? <Link sx={{fontWeight: "bold", textDecoration: "none"}}>Change your profile photo</Link> :<div style={{width: "66%", float: "left"}}>September 4, 2016</div>}
                <Button size="small" sx={{mt: -3, textTransform: "capitalize", fontWeight: "bold"}}> {forWhat === "currentUserOnHomepage" ? "switch" : forWhat === "chat" || forWhat === "settings" ?  null : "follow"}</Button>
            </div>}
        />
    );
}

export default UserCard;
