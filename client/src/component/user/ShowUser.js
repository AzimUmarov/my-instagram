import React from 'react';
import {useParams} from "react-router-dom";
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
//, display: {xs: "none", md: "block", sm: "block", xl: "block", lg: "block"}



function ShowUser(props) {
    const {id} = useParams();
    const user = users[0];
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
                    src={user.img} aria-label="recipe">
                </Avatar>
                <Typography component="div" sx={{display: "flex", mt: {md: 6, xs: 2, sm: 4, xl: 6, lg: 6}, width: "100%"}}>
                    <span style={{fontWeight: "bold", fontSize: "24px"}} >{id}</span>
                    <Button variant="outlined" sx={{height: 24, m: 1, color: "inherit", mt: {xs: 6, sm: 1, xl: 1,md: 1, lg: 1}, ml: {xs: -16, sm: 1, xl: 1,md: 1, lg: 1}}} >Edit profile</Button>
                    <SettingsIcon sx={{m: 1}} />
                </Typography>
            </Typography>
            <Typography sx={{ml: {xs: 2, sm: 28, xl: 43,md: 43, lg: 43}, mt: {xs: 2, sm: -6, xl: -10, md: -10, lg: -10}}} >
                <span style={{fontWeight: "bold"}} >9 </span> <span style={{marginRight: 30, cursor: "pointer"}}> posts </span>
                <span style={{fontWeight: "bold"}} >99 </span><span style={{marginRight: 30, cursor: "pointer"}} > followers </span>
                <span style={{fontWeight: "bold"}} >99  </span><span style={{marginRight: 30, cursor: "pointer"}} > followers </span>
            </Typography>
            <Typography sx={{ml: {xs: 2, sm: 28, xl: 43,md: 43, lg: 43}, mt: {xs: 2, sm: 3, xl: 3,md: 3, lg: 3}}} >
                <span style={{fontWeight: "bold"}} >Azimjon Umarov</span>
            </Typography>
            <Divider sx={{ mt: {xs: 2, sm: 2, xl: 6,md: 6, lg: 6}, display: "flex"}}>
            </Divider>
            <div style={{margin: 12}}>
                <Typography component="span" sx={{ml: {xs: 2, sm: "30%", xl: 42,md: 42, lg: 42}, fontWeight: "bold", cursor: "pointer"}} > <GridOnIcon /> Posts</Typography>
                <Typography component="span" sx={{ml: 6, fontWeight: "", cursor: "pointer"}} > <BookmarkBorderIcon /> Saved</Typography>
                <Typography component="span" sx={{ml: 6, fontWeight: "", cursor: "pointer"}} > <PermContactCalendarIcon /> Tagged</Typography>
            </div>
            <Explore/>
        </Container>
    );
}

export default ShowUser;
