import React, {useEffect, useState} from 'react';
import PostSuperficial from "../../component/post/PostSuperficial";
import {CardActionArea, Container as Container2, Grid} from "@mui/material"
import Box from "@mui/material/Box";
import Footer from "../../component/footer/Footer";
import ServiceAPI from "../../API/ServiceAPI";
import SkeletonColor from "../../component/loaders/ForPosts";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import CardCover from "@mui/joy/CardCover";
import Card from "@mui/material/Card";
const GET_POSTS_FOR_USER_URL = "/post/get-for-user"
const NOT_FOUND_IMAGE = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNzUycHQiIGhlaWdodD0iNzUycHQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDc1MiA3NTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8Zz4KICA8cGF0aCBkPSJtNTE0LjkgMTc4LjZoLTI3Ny43OWMtMzMuMDkgMC02MC4wMDggMjYuOTI2LTYwLjAwOCA2MC4wMTZ2MTgxLjE3YzAgMzMuMDkgMjYuOTE4IDYwLjAwOCA2MC4wMDggNjAuMDA4aDgwLjM5NWM2LjQ2MDkgMCAxMS43MDMtNS4yMzQ0IDExLjcwMy0xMS43MDNzLTUuMjM4My0xMS43MDMtMTEuNzAzLTExLjcwM2gtODAuMzk1Yy0yMC4xODQgMC0zNi42MDktMTYuNDE4LTM2LjYwOS0zNi42MDl2LTE4MS4xNmMwLTIwLjE4OCAxNi40MjItMzYuNjA5IDM2LjYwOS0zNi42MDloMjc3Ljc5YzIwLjE4NCAwIDM2LjYwOSAxNi40MTggMzYuNjA5IDM2LjYwOXYxNDQuOTRjMCA2LjQ2ODggNS4yMzgzIDExLjcwMyAxMS43MDMgMTEuNzAzIDYuNDYwOSAwIDExLjY5OS01LjIzODMgMTEuNjk5LTExLjcwM3YtMTQ0Ljk0YzAtMzMuMDktMjYuOTE4LTYwLjAxNi02MC4wMDgtNjAuMDE2eiIvPgogIDxwYXRoIGQ9Im00MzkuNDYgMzMyLjUxYzAtOC4xNjgtNC44Nzg5LTE3LjA3NC0xMi43MTUtMjIuODk4bC02Ny43NS00Ny4xMjljLTE0LjMxMi0xMC42MzctNDcuMjU0LTEuNzYxNy00Ny4yNTQgMTkuMzcxdjk0LjY5NWMwIDE0LjkyMiAxNi4yMTUgMjQuMTUyIDMxLjIzOCAyNC4xNTIgNi4yNzM0IDAgMTEuODEyLTEuNjU2MiAxNS40NDktNC4zODY3bDcyLjk4LTQ3Ljc1YzUuMTkxNC0zLjg1OTQgOC4wNTA4LTkuNTYyNSA4LjA1MDgtMTYuMDU1em0tOTQuMTk5IDQ0LjQ4NGMtMC4xODM1OSAwLjA4MjAzMS0wLjk0MTQxIDAuMzA4NTktMi4yNzczIDAuMzA4NTktMy4zNTk0IDAtNi40ODgzLTEuMjkzLTcuODM1OS0yLjIzODNsLTAuMDAzOTA3LTkxLjcxNWMxLjM1MTYtMC45NjA5NCA0LjQ4MDUtMi4yMzgzIDcuODQzOC0yLjIzODMgMS4zMzIgMCAyLjA5NzcgMC4yMTg3NSAyLjM0NzcgMC4zNjMyOGw2Ny43NDYgNDcuMTQ1YzEuMDAzOSAwLjc0MjE5IDEuNzgxMiAxLjY3OTcgMi4yOTY5IDIuNDkyMnoiLz4KICA8cGF0aCBkPSJtNDE4LjA5IDQ2NS45NWMtMi4yMjI3IDIuMTAxNi0zLjUwNzggNS4xNTIzLTMuNTA3OCA4LjE5MTRzMS4yODUyIDYuMDgyIDMuNTA3OCA4LjMwNDdjMi4xMDk0IDIuMjI2NiA1LjE1MjMgMy4zOTQ1IDguMTkxNCAzLjM5NDUgMy4xNjAyIDAgNi4wODU5LTEuMTY0MSA4LjMwNDctMy4zOTQ1IDIuMjIyNy0yLjIyNjYgMy4zOTQ1LTUuMjY1NiAzLjM5NDUtOC4zMDQ3cy0xLjE2OC02LjA4OTgtMy4zOTQ1LTguMTkxNGMtNC4zMjQyLTQuNDQ5Mi0xMi4yNzctNC40NDkyLTE2LjQ5NiAweiIvPgogIDxwYXRoIGQ9Im01MzUuNzUgNDEyLjcxaC0xMzYuMzVjLTE5LjM4MyAwLTM1LjEwMiAxNS43MTUtMzUuMTAyIDM1LjEwMnY1NS41NzhjLTAuNDQ1MzEgMS45NzY2LTAuNTU4NTkgMy45NzY2IDAgNS44NzExdjI5LjAzNWMwIDE5LjM4MyAxNS43MTkgMzUuMTAyIDM1LjEwMiAzNS4xMDJoMTM2LjM1YzE5LjM4MyAwIDM1LjEwMi0xNS43MTUgMzUuMTAyLTM1LjEwMnYtOTAuNDkyYy0wLjAwMzkwNi0xOS4zODMtMTUuNzE5LTM1LjA5NC0zNS4xMDItMzUuMDk0em0xMS42OTUgMTI1LjU4YzAgNi40NDkyLTUuMjUzOSAxMS43MDMtMTEuNzAzIDExLjcwM2gtMTM2LjM0Yy02LjQ0OTIgMC0xMS43MDMtNS4yNDYxLTExLjcwMy0xMS43MDN2LTEyLjMyNGwxOS4yMyAxMC41NDNjNC4yMTQ4IDIuMzA0NyA4Ljg1NTUgMy40NTMxIDEzLjQ3NyAzLjQ1MzEgNi4wODk4IDAgMTIuMTUyLTEuOTc2NiAxNy4xNzYtNS44NzExbDU2Ljg0NC00NC4wNTljMS42OTE0LTEuMzEyNSA0LjA0My0xLjMwMDggNS43MjY2IDAuMDMxMjVsNDMuMDg2IDM0LjQwNmMxLjI4NTIgMS4wMjM0IDIuNzE4OCAxLjcxODggNC4yMDcgMi4xMjV6bTAtNDAuNDEtMzIuNjk5LTI2LjEwOWMtMTAuMTY0LTguMTAxNi0yNC40MTgtOC4xOTE0LTM0LjY1Ni0wLjIyNjU2bC01Ni44MzYgNDQuMDQ3Yy0xLjQ2NDggMS4xMTcyLTMuNDUzMSAxLjI5My01LjA3MDMgMC4zOTg0NGwtMzAuNDg0LTE2LjcwN3YtNTEuNDhjMC02LjQ0OTIgNS4yNTM5LTExLjcwMyAxMS43MDMtMTEuNzAzaDEzNi4zNWM2LjQ0OTIgMCAxMS43MDMgNS4yNDYxIDExLjcwMyAxMS43MDN2NTAuMDc4eiIvPgogPC9nPgo8L3N2Zz4K";


function Explore({user, type}) {
    const  [posts, setPosts] = useState(null);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true);
                    let response;
                    if(user){
                        if(type === "saved")
                            response = await  ServiceAPI.get(`/post/get-saved/${user}`);
                        else if(type === "hashtag")
                            response = {data: []}
                        else
                            response = await  ServiceAPI.get(`/post/get-user-posts/${user}`);
                    }
                    else
                        response = await  ServiceAPI.get(GET_POSTS_FOR_USER_URL);
                    console.log(response);
                    await setPosts(response?.data);
                    setLoading(false);
                }catch(err){
                    setError(err);
                }finally{
                    setLoading(false);
                }
            }
        )()
    }, []);

    return (
        <Container2 >
            <Box sx={{ flexGrow: 1, m: 1, ml: {md: 12, xl: 4, lg: 3, sm: 10, xs : 0} }}>
                <Grid container spacing={0}>
                    {loading ? Array.from(new Array(3)).map((item, index) => (
                        <Grid item xs="auto">
                            <Skeleton  variant="rectangular" width={300} sx={{m: 1}} height={300} />
                        </Grid>
                    )) : posts?.length === 0  ?
                        <div style={{display: "block", marginLeft: "25%"}}>
                            <Typography
                                component="img"
                                sx={{height: 400, width: 400 }}
                                src={NOT_FOUND_IMAGE}
                            />
                            <Typography
                                component="span"
                                sx={{fontSize:35, fontFamily: 'italic', marginLeft: "25%"}}
                                component="p">No Posts here :)</Typography>
                             </div> : null}

                    <h4 className={error ? "text-warning bg-secondary p-2 mb-0 mt-2 w-100 text-center border" : "d-none"} aria-live="assertive">{error?.message}</h4>

                    { posts?.map( (post, index) =>
                    <Grid item xs="auto"> <PostSuperficial size={1} post={post} /> </Grid>
                    )}

                </Grid>
            </Box>
            &emsp; <Footer />
        </Container2>
    );
}

export default Explore;
