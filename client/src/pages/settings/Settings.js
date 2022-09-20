import React, {useContext, useState} from 'react';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import UserCard from "../../component/user/UserCard";
import ListItemButton from "@mui/material/ListItemButton";
import {Button, ListItemIcon} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import FormControl  from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Footer from "../../component/footer/Footer";
import {useNavigate} from "react-router-dom";
import UserContext from "../../context/GlobalData/User";
import ServiceAPI from "../../API/ServiceAPI";
const UPDATE_USER = "/user/update"
const UPDATE_PASSWORD = "/auth/update-password"

function Settings({whatFor}) {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);
    const [update, setUpdate] = useState(user)
    const [error, setError] = React.useState(false);

    const settings = (
        <div>
            <List>
                {["Edit profile" ,
                "Change password",
                "Apps and websites",
                "Email notifications" ,
                "Push notifications",
                "Manage contacts",
                "Privacy and security",
                "Login activity",
                "Emails from Instagram",
                "Help"
                ].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => {text === "Change password" ? navigate(`/page/settings/password`) : navigate(`/page/settings`)}}>
                            <ListItemIcon>
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
                </List>
        </div>
    );
    function myFilter(obj, cb) {
        return Object.fromEntries(Object.entries(obj).
        filter(([key, val]) => cb(val, key)));
    }

    async function handleSubmit(e){
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let body = {};
        let url;
        if(whatFor === "changePassword"){
            console.log(data.get("Username")+ "--" + data.get("Website"));

            if(data.get("Username") !== data.get("Website")){
                setError({message: "New Password don't match"});
                return 0;
            }
            url =  UPDATE_PASSWORD;
            body.currentPassword = data.get("Name");
            body.password = data.get("Username");
        }
        else {
            url = UPDATE_USER;
            body.firstName = data.get("Name").split(" ")[0];
            body.lastName = data.get("Name").split(" ").length > 1 ? data.get("Name").split(" ")[1] : update?.lastName;
            body.username = data.get("Username");
            body.website = data.get("Website");
            body.bio = data.get("Bio");
            body.email = data.get("Email");
            body.gender = data.get("Phone number");
            body = myFilter(body, item => item !== "");
        }
        try{
            console.log(url, body);
            const response = await  ServiceAPI.patch(url, body);
            console.log(response);
            setUpdate(response?.data);
            setUser(response?.data);
            setError(response?.data);
        }catch(err){
            console.log(err);
            setError(err.response?.data);
        }finally{
        }
    }





    return (
        <Container>
            <Card sx={{ display: 'flex', mt: 4, height: "80%"}} variant="outlined">
                <Card sx={{width: "25%", height: "80%", display: {xs: "none", sm: "none", xl: "block",md: "block", lg: "block"}}} >
                    {settings}
                </Card>
                <Card
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: "auto" } }
                    variant="outlined"
                >
                    <Typography sx={{ml: {xs: -4, sm: 2, xl: 10,md: 10, lg: 10}}}>
                        <UserCard user={update} forWhat="settings" userAvatar={user?.avatar} />
                    <Box component="form" noValidate autoComplete="off"  onSubmit={handleSubmit} sx={{mt: 5}}>
                        <h4 className={error ? "text-warning bg-secondary p-2 mb-0 mt-2 w-100 text-center border position-sticky" : "d-none"} aria-live="assertive">{error?.message}</h4>
                        <FormControl sx={{ width: '25ch' }} onChange={() =>  setError(null)}>
                            <TextField
                                sx={{m: 3, width: "200%"}}
                                label={whatFor === "changePassword" ? "Current Password" : "Name"}
                                type={whatFor === "changePassword" ? "password" : "text"}
                                id="Name"
                                name="Name"
                                />
                            <TextField
                                sx={{m: 3, width: "200%"}}
                                label={whatFor === "changePassword" ? "New Password" : "Username"}
                                type={whatFor === "changePassword" ? "password" : "text"}
                                id="Username"
                                name="Username"
                            />
                            <TextField
                                sx={{m: 3, width: "200%"}}
                                label={whatFor === "changePassword" ? "Verify new password" : "Website"}
                                type={whatFor === "changePassword" ? "password" : "text"}
                                id="Website"
                                name="Website"
                            />
                            {whatFor !== "changePassword" ? <>
                                    <TextField
                                        sx={{m: 3, width: "200%"}}
                                        label="Bio"
                                        id="Bio"
                                        name="Bio"
                                    />
                                    <TextField
                                        sx={{m: 3, width: "200%"}}
                                        id="Email"
                                        label="Email"
                                        name="Email"
                                    />
                                    <TextField
                                        sx={{m: 3, width: "200%"}}
                                        id="Phone number"
                                        label="Phone number"
                                        name="Phone number"
                                    />
                                </> : null}
                            <Button
                            type="submit"
                            sx={{ml: "90%"}}
                            >
                                Submit
                            </Button>
                        </FormControl>
                    </Box>
                    </Typography>
                </Card>
            </Card>
            &emsp;<Footer />
        </Container>
    );
}

export default Settings;
