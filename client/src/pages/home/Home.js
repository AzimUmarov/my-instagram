import React from 'react';
import {posts} from "../../fakeData"
import Container from "@mui/material/Container";
import Post from "../../component/post/Post";
import HomeUsers from "../../component/user/UserList";
import Typography from "@mui/material/Typography";
import PostSuperficial from "../../component/post/PostSuperficial";
import BasicCard from "../../component/post/Test";
import Explore from "../explore/Explore";

function Home(props) {
    console.log(posts)
    return (
        <div>
            <Container maxWidth="sm" > {/*{xl: 1, lg:2, md: 3, sm: 4, xs: 5}*/}
                <Typography component="div" sx={{display: {xs: 'none', md: "flex", sm: "none", xl: "flex", lg: "flex"}, ml: {md: "65%", xs: "50%", sm: "50%", xl: "50%", lg: "50%"}, mr: {md: "-50%"}}}>
                    <HomeUsers posts={posts} />
                </Typography>
                <Typography sx={{ml: {md: "-27%", xs: 0, sm: "5%", xl: "-50%", lg: "-50%"}, mt: {xl: -82, lg: -82, md: -82}}}>
                    {posts.map(item =>
                        <Post post={item} where="home" />
                    )}
                </Typography>
            </Container>
        </div>
    );
}

export default Home;
