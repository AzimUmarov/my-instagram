import * as React from 'react';
import Box from "@mui/material/Box";
import {Button, List, ListItem} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import UserCard from "./UserCard";
import {users} from "../../fakeData"
import Footer from "../footer/Footer";
import Typography from "@mui/material/Typography";
import {fontWeight} from "@mui/joy/styles/styleFunctionSx";

export default function HomeUsers({posts}) {
    return (
        <Box sx={{ width: 320, height: 660 }}>
            <List>
                <UserCard forWhat={"currentUserOnHomepage"} user={users[0]}/>
                <Typography sx={{ color: "#A9A9A9", ml: "6%", width: {lg:"110%", md: "98%"}, fontWeight: "bold", fontSize:14}}>
                    Suggestions For You
                    <span style={{color: "white", float: "right", cursor: "pointer"}}>See All</span>
                </Typography>
                {users.map(user => <UserCard  user={user}/>)}
            </List>
            <Footer whatFor="home"/>
        </Box>
    );
}
