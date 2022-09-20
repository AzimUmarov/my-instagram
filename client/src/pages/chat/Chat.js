import * as React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Container from "@mui/material/Container";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import Card from "@mui/material/Card";
import {users} from "../../fakeData";
import UserCard from "../../component/user/UserCard";
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import Footer from "../../component/footer/Footer";


function ResponsiveDrawer(props) {

    const directs = (
        <div>
            <Card sx={{width: "100%", height: 60}}>
                <Typography sx={{ ml: "30%",mt: 2, fontWeight: "bold", fontSize:18}}>
                    username
                   <DriveFileRenameOutlineIcon sx={{color: "white", float: "right", cursor: "pointer", mr: 2}} />
                </Typography>
            </Card>
            <List>
                {users.map(user =>
                    <ListItem key={user} disablePadding>
                            <UserCard forWhat="chat" user={user}/>
                    </ListItem>
                )}
            </List>
        </div>
    );


    return (
        <Container>
        <Card sx={{ display: 'flex', mt: 3 }} variant="outlined" >
            <Card sx={{width: "30%"}} variant="outlined" >
                {directs}
            </Card>
            <Card
                component="main"
                sx={{ flexGrow: 1, width: "70%" }}
                variant="outlined"
            >
                <Card sx={{width: "100%",ml:0, height: 60 }}>
                    <Typography sx={{mt: 2,ml: 1, fontWeight: "bold", fontSize:18}}>
                        user or group name
                        <HelpCenterIcon sx={{color: "white", float: "right", cursor: "pointer", mr: 2}} />
                    </Typography>
                </Card>
                <Typography>
                    messaging
                </Typography>
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
