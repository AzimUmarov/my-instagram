import * as React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Container from "@mui/material/Container";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import Card from "@mui/material/Card";
import SendIcon from '@mui/icons-material/Send';
import UserCard from "../../component/user/UserCard";
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import Footer from "../../component/footer/Footer";
import ServiceAPI from "../../API/ServiceAPI";
import {useContext, useEffect, useState} from "react";
import UserContext from "../../context/GlobalData/User";
import ListItemButton from "@mui/material/ListItemButton";
import CardHeader from "@mui/material/CardHeader";
import Skeleton from "@mui/material/Skeleton";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const GET_ALL = "/user/get-all";

function ResponsiveDrawer() {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    const { user } = useContext(UserContext)
    const directs = (
        <div>
            <Card sx={{width: "100%", height: 60}}>
                <Typography sx={{ ml: "30%",mt: 2, fontWeight: "bold", fontSize:18}}>
                    {user?.username}
                   <DriveFileRenameOutlineIcon sx={{color: "white", float: "right", cursor: "pointer", mr: 2}} />
                </Typography>
            </Card>
            <List>

                {users?.map(user =>
                    <ListItem key={user} disablePadding>
                        <ListItemButton onClick={(e) => setCurrentUser(user)}>
                            <UserCard forWhat="chat" user={user}/>
                        </ListItemButton>
                    </ListItem>
                )}
                {loading ? Array.from(new Array(7)).map(user =>
                    <ListItem key={user} disablePadding>
                        <ListItemButton onClick={(e) => setCurrentUser(user)}>
                            <CardHeader
                                    avatar={
                                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                                    }
                                    title={
                                        <Skeleton
                                            animation="wave"
                                        />
                                    }
                                    subheader={
                                        <Skeleton animation="wave" height={10} width={200}/>
                                    }
                          />
                        </ListItemButton>
                    </ListItem>
                ) : null}
            </List>
        </div>
    );

    async function getUsers(){
        try{
            setLoading(true);
            const response = await  ServiceAPI.get(GET_ALL);
            setUsers(response?.data?.data.filter(item => user._id !== item._id))
            setLoading(false);
            console.log(response?.data?.data)
        }catch(err){
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <Container>
        <Card sx={{ display: 'flex', mt: 4, height: "80%"}} variant="outlined" >
            <Card  sx={{width: "30%", height: "80%", display: {xs: "none", sm: "none", xl: "block",md: "block", lg: "block"}}} variant="outlined" >
                {directs}
            </Card>
            <Card
                component="main"
                sx={{ flexGrow: 1, width: "70%" }}
                variant="outlined"
            >
                <Card sx={{width: "100%",ml:0, height: 60 }}>
                    <Typography sx={{mt: 2,ml: 1, fontWeight: "bold", fontSize:18}}>
                        {currentUser?.username || "choose user to chat"}
                        <HelpCenterIcon sx={{color: "white", float: "right", cursor: "pointer", mr: 2}} />
                    </Typography>
                </Card>
                <Typography sx={{height: {xs: 419, sm: 419, xl: 719,md: 719, lg:419 },width: {xs: "80%", md: '80%'},overflowY: "scroll"}}>
                    <List sx={{ width: '100%', maxWidth: 1000, bgColor: 'background.paper' }}>

                    </List>
                </Typography>
                <Box component="form" noValidate sx={{ml: 3, mb: 2, alignItems: 'end'}}>
                    <TextField
                        name="title"
                        label="Your Message"
                        type="text"
                        id="title"
                        variant="standard"
                        sx={{width: "85%"}}
                    />
                    <Button
                        type="submit"
                        align="center"
                        variant="outlined"
                        sx={{ mt: 1.5, ml:1 }}
                        onClick={() => alert("Transport unknown")}
                    ><SendIcon/>
                    </Button>
                </Box>
            </Card>
        </Card>
            &emsp;<Footer />
        </Container>
    );
}

ResponsiveDrawer.propTypes = {
    window: PropTypes.func,
};

export default ResponsiveDrawer;
