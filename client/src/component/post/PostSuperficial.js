import React from 'react';
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import {CardActionArea} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardCover from "@mui/joy/CardCover";

const size1 = {
    width: 300,
    height: 300,
    m: 1
}
const size2 = {
    width: 600,
    height: 600,
    m: 1
}


function PostSuperficial({size = 1, post}) {
    return (
        <Card sx={size === 1 ? size1 : size2}>
            <CardActionArea>
            <CardCover sx={{width: 300, height: 300,}}>
                <img
                    src={post.media.value}
                    alt="Image not found"
                />
            </CardCover>
            </CardActionArea>
        </Card>
    );
}

export default PostSuperficial;
