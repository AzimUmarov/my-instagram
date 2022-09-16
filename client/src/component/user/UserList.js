import * as React from 'react';
import Box from "@mui/material/Box";
import {Button, List, ListItem} from "@mui/material";
import UserCard from "./UserCard";
import Footer from "../footer/Footer";
import Typography from "@mui/material/Typography";
import {users} from "../../fakeData";
import {useContext, useEffect, useState} from "react";
import ServiceAPI from "../../API/ServiceAPI";
import userCard from "./UserCard";
import UserContext from "../../context/GlobalData/User";
const SUGGESTIONS = "/user/suggestions"

export default function HomeUsers({posts}) {
    const [users, setUsers] = useState(null)
    const [loading, setLoading] = useState(null)
    const { user } = useContext(UserContext)
    console.log(user)
    async function getUsers(){
        try{
            setLoading(true);
            const response = await  ServiceAPI.get(SUGGESTIONS);
            setUsers(response?.data?.data)
            setLoading(false);
        }catch(err){
        }finally{
            setLoading(false);
        }
    }

    function removeUsers(id){
        setUsers(users.filter(user => user.id === id));
        console.log("remove")
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <Box sx={{ width: 320, height: 660 }}>
            <List>
                <UserCard forWhat={"currentUserOnHomepage"} user={user}/>
                <Typography sx={{ color: "#A9A9A9", ml: "6%", width: {lg:"110%", md: "98%"}, fontWeight: "bold", fontSize:14}}>
                    Suggestions For You
                    <span style={{color: "white", float: "right", cursor: "pointer"}}>See All</span>
                </Typography>
                {users?.map(user => <UserCard  user={user}/>)}
            </List>
            <Footer whatFor="home" removeUsers={removeUsers}/>
        </Box>
    );
}
