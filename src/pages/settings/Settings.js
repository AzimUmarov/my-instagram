import React from 'react';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import UserCard from "../../component/user/UserCard";
import ListItemButton from "@mui/material/ListItemButton";
import {Button, ListItemIcon} from "@mui/material";
import {InboxIcon, MailIcon} from "@heroicons/react/solid";
import ListItemText from "@mui/material/ListItemText";
import {users} from "../../fakeData"
import Typography from "@mui/material/Typography";
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Footer from "../../component/footer/Footer";


function Settings(props) {
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
                        <ListItemButton>
                            <ListItemIcon>
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
                </List>
        </div>
    );
    const [name, setName] = React.useState('Cat in the Hat');
    const handleChange = (event) => {
        setName(event.target.value);
    };

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
                        <UserCard user={users[0]} forWhat="settings"/>
                    <Box component="form" noValidate autoComplete="off" sx={{mt: 5}}>
                        <FormControl sx={{ width: '25ch' }}>
                            <TextField
                                sx={{m: 3, width: "200%"}}
                                id="outlined-name"
                                label="Name"
                                value={name}
                                onChange={handleChange}
                            /><
                            TextField
                                sx={{m: 3, width: "200%"}}
                                id="outlined-name"
                                label="Username"
                                value={name}
                                onChange={handleChange}
                            />
                            <TextField
                                sx={{m: 3, width: "200%"}}
                                id="outlined-name"
                                label="Website"
                                value={name}
                                onChange={handleChange}
                            />
                            <TextField
                                sx={{m: 3, width: "200%"}}
                                id="outlined-name"
                                label="Bio"
                                value={name}
                                onChange={handleChange}
                            />
                            <TextField
                                sx={{m: 3, width: "200%"}}
                                id="outlined-name"
                                label="Email"
                                value={name}
                                onChange={handleChange}
                            />
                            <TextField
                                sx={{m: 3, width: "200%"}}
                                id="outlined-name"
                                label="Phone number"
                                value={name}
                                onChange={handleChange}
                            />
                            <TextField
                                sx={{m: 3, width: "200%"}}
                                id="outlined-name"
                                label="Gender"
                                value={name}
                                onChange={handleChange}
                            />
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
