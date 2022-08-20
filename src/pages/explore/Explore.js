import React from 'react';
import {posts} from "../../fakeData"
import PostSuperficial from "../../component/post/PostSuperficial";
import {Container as Container2, Grid} from "@mui/material"
import Box from "@mui/material/Box";


function Explore() {
    return (
        <Container2 >
            <Box sx={{ flexGrow: 1, m: 1, ml: {md: 12, xl: 4, lg: 3, sm: 10, xs : 0} }}>
                <Grid container spacing={0}>
                { posts.map( (post, index) =>
                    <Grid item xs="auto"> <PostSuperficial size={1} post={post} /> </Grid>
                )}
                </Grid>
            </Box>
        </Container2>
    );
}

export default Explore;
