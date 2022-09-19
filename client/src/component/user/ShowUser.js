import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {users} from "../../fakeData";
import {styles} from "./UserCardStyleObjects";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import {Button, Divider} from "@mui/material";
import Typography from "@mui/material/Typography";
import SettingsIcon from '@mui/icons-material/Settings';
import Explore from "../../pages/explore/Explore";
import GridOnIcon from '@mui/icons-material/GridOn';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import ServiceAPI from "../../API/ServiceAPI";
import UserContext from "../../context/GlobalData/User";
//, display: {xs: "none", md: "block", sm: "block", xl: "block", lg: "block"}
const  GET_USER_WITH_USERNAME = "/user/get-one-by-username/"


function ShowUser({type}) {
    const {id} = useParams();
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(null)
    const { user } = useContext(UserContext);

    async function getUser(){
        if(id === user._id){
            setCurrentUser(user)
            return 0;
        }
        try{
            setLoading(true);
            const response = await  ServiceAPI.get(GET_USER_WITH_USERNAME+ id);
            const response2 = await  ServiceAPI.get(`/post/get-user-posts/${id}`);
            setCurrentUser(response?.data)
            console.log(response?.data)
            setLoading(response2?.data?.length);
        }catch(err){
            alert("Not have any user with this username");
            navigate("/");
        }finally{
        }
    }

    useEffect(() => {
        getUser();
    }, [])
    const navigate = useNavigate();
    return (
        <Container>
            <Typography  sx={{display: "flex"}}>
                <Avatar
                    sx={{width: {md: 150, xs: 80, sm: 100, xl: 150, lg: 150},
                        height: {md: 150, xs: 80, sm: 100, xl: 150, lg: 150},
                        ml: {md: 8, xs: 2, sm: 8, xl: 8, lg: 8},
                        mt: {md: 4, xs: 2, sm: 4, xl: 4, lg: 4},
                        mr: {md: 16, xs: 2, sm: 8, xl: 16, lg: 16}
                }}
                    src={currentUser?.avatar} aria-label="recipe">
                </Avatar>
                <Typography component="div" sx={{display: "flex", mt: {md: 6, xs: 2, sm: 4, xl: 6, lg: 6}, width: "100%"}}>
                    <span style={{fontWeight: "bold", fontSize: "24px"}} >{id}</span>
                    { user ? <Button variant="outlined" sx={{height: 24, m: 1, color: "inherit", mt: {xs: 6, sm: 1, xl: 1,md: 1, lg: 1}, ml: {xs: -16, sm: 1, xl: 1,md: 1, lg: 1}}} onClick={() => navigate(`/page/settings`)} >Edit profile</Button>  : null}
                    { user ? <SettingsIcon  onClick={() => navigate(`/page/settings`)} sx={{m: 1}} /> : null}
                </Typography>
            </Typography>
            <Typography sx={{ml: {xs: 2, sm: 28, xl: 43,md: 43, lg: 43}, mt: {xs: 2, sm: -6, xl: -10, md: -10, lg: -10}}} >
                <span style={{fontWeight: "bold"}} >{loading} </span> <span style={{marginRight: 30, cursor: "pointer"}}> posts </span>
                <span style={{fontWeight: "bold"}} >{currentUser?.followers?.length} </span><span style={{marginRight: 30, cursor: "pointer"}} > followers </span>
                <span style={{fontWeight: "bold"}} >{currentUser?.following?.length}  </span><span style={{marginRight: 30, cursor: "pointer"}} > following </span>
            </Typography>
            <Typography sx={{ml: {xs: 2, sm: 28, xl: 43,md: 43, lg: 43}, mt: {xs: 2, sm: 3, xl: 3,md: 3, lg: 3}}} >
                <span style={{fontWeight: "bold"}} >{currentUser?.firstname} {" "} {currentUser?.lastName}</span>
            </Typography>
            <Divider sx={{ mt: {xs: 2, sm: 2, xl: 6,md: 6, lg: 6}, display: "flex"}}>
            </Divider>
            <div style={{margin: 12}}>
                <Typography component="span" sx={{ml: {xs: 2, sm: "30%", xl: 42,md: 42, lg: 42}, fontWeight: type ? "" : "bold", cursor: "pointer"}} onClick={(e) => type ? window.location.href = `/${id}` : null}> <GridOnIcon /> Posts</Typography>
                <Typography component="span" sx={{ml: 6, fontWeight: type === "saved" ? "bold" : "", cursor: "pointer"}} onClick={(e) => type !== "saved" ? window.location.href = `/${id}/saved` : null}> <BookmarkBorderIcon /> Saved</Typography>
                <Typography component="span" sx={{ml: 6, fontWeight: type === "hashtag" ? "bold" : "", cursor: "pointer"}} onClick={(e) => type !== "hashtag" ? window.location.href = `/${id}/hashtag` : null} > <PermContactCalendarIcon /> Tagged</Typography>
            </div>
            <Explore user={id} type={type}/>
        </Container>
    );
}

export default ShowUser;
