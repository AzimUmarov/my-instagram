import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ServiceAPI from "../../API/ServiceAPI";
import UserContext from "../../context/GlobalData/User";
import {useContext, useState} from "react";
import {Link as LinkRoute, useNavigate} from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import {CircularProgress} from "@mui/material";
const SIGNUP_URL = "/auth/signup";

export default function SignUp() {
    const { setUser, setToken } = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get("username");
        const password = data.get("password");
        const firstName = data.get("firstName");
        const lastName = data.get("lastName");
        const email = data.get("email");
        try {
            setLoading(true);
            setErrorMessage("");
            const response = await ServiceAPI.post(SIGNUP_URL, JSON.stringify({username, password, firstName, lastName, email}));
            const token = response?.data?.data?.token;
            setLoading(false);
            setToken(token);
            setUser(response?.data?.data?.user);
            navigate("/");
        } catch (err) {
            setLoading(false);
            if (!err?.response)
                setErrorMessage('Login Failed, Try again later');
            else
                setErrorMessage(err.response.data.message);
        }
    };

    return (
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <InstagramIcon sx={{ display: { xs: 'block', md: 'flex' }, mr: 1, mb: -1, fontSize: "100px" }}  />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{

                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            mb: 5
                        }}
                    >
                        INSTAGRAM
                    </Typography>
                    {loading ?  <CircularProgress /> : <Typography component="h1" variant="h5" sx={{ml: -1.5}}>
                        Sign Up
                    </Typography>}
                    <h4 className={errorMessage ? "text-warning bg-secondary p-2 mb-0 mt-2 w-100 text-center border" : "d-none"} aria-live="assertive">{errorMessage}</h4>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    onChange={()    => setErrorMessage("")}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={()    => setErrorMessage("")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    onChange={()    => setErrorMessage("")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    onChange={()    => setErrorMessage("")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={()    => setErrorMessage("")}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <LinkRoute to="/">
                                    <Link  variant="body2">
                                        Already have an account? Sign In
                                    </Link>
                                </LinkRoute>
                            </Grid>
                        </Grid>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: '',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            mt: 2
                        }}
                    >
                        Welcome to My Instagram project Qwasar.io Azimjon Umarov
                    </Typography>
                </Box>
            </Container>
    );
}
