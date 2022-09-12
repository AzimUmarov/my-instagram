import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FilterHdrIcon from '@mui/icons-material/FilterHdr';
import {Link as LinkRoute, useNavigate} from "react-router-dom";
import ServiceAPI from "../../API/ServiceAPI";
import {useContext, useState} from "react";
import UserContext from "../../context/GlobalData/User";
import {CircularProgress} from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
const LOGIN_URL = "/auth/signin";

export default function Login() {
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { setUser, setToken} = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get("username");
        const password = data.get("password");
        try {
            setLoading(true);
            setErrorMessage("");
            const response = await ServiceAPI.post(LOGIN_URL, JSON.stringify({username, password}));
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
                setErrorMessage(err.response?.data?.message || 'Login Failed, Try again later');
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
                    Sign In
                </Typography>}
                <h4 className={errorMessage ? "text-warning bg-secondary p-2 mb-0 mt-2 w-100 text-center border" : "d-none"} aria-live="assertive">{errorMessage}</h4>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="username"
                                label="username"
                                name="username"
                                autoComplete="username"
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
                        Login
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <LinkRoute to="/register">
                                <Link  variant="body2">
                                    Do not have an account? Sign Up
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
                        mt: 6
                    }}
                >
                    Welcome to My Instagram project Qwasar.io Azimjon Umarov
                </Typography>
            </Box>
        </Container>
    );
}
