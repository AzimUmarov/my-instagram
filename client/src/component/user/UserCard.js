import React from 'react';
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import {Button, Link} from "@mui/material";
import {styles} from "./UserCardStyleObjects";
import ServiceAPI from "../../API/ServiceAPI";
const FOLLOW_WITH_ID = "/user/follow/"

function UserCard({forWhat, user}) {

    async function follow(id){
        try{
            const response = await  ServiceAPI.post(FOLLOW_WITH_ID + id);
            console.log(response?.data);
        }catch(err){
        }finally{
        }
    }



    return (
        <CardHeader
            sx={{ width: {xl: 460, lg: 460, md: 400}}}
            component="div"
            avatar={
                <Avatar sx={forWhat === "currentUserOnHomepage" || forWhat === "settings"  ? styles.forCurrentUserOnHomePage.avatar : null} alt="Remy Sharp" src={user?.avatar} aria-label="recipe">
                </Avatar>
            }
            title={forWhat === "settings" ? <h6 style={{fontWeight: "bold"}}>username</h6> : user?.username}
            subheader={ <div>
                {forWhat === "settings" ? <Link sx={{fontWeight: "bold", textDecoration: "none"}}>Change your profile photo</Link> :<div style={{width: "66%", float: "left"}}>{`${user?.firstName} ${user?.lastName}`}</div>}
                <Button size="small" sx={{mt: -3, textTransform: "capitalize", fontWeight: "bold"}}> {forWhat === "currentUserOnHomepage" ? "switch" : forWhat === "chat" || forWhat === "settings" ?  null : "follow"}</Button>
            </div>}
        />
    );
}

export default UserCard;
