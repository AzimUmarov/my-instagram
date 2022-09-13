import React from 'react';
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import {CardActionArea} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardCover from "@mui/joy/CardCover";
import {useNavigate} from "react-router-dom";

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
    const navigate = useNavigate();
    return (
        <Card sx={size === 1 ? size1 : size2} onClick={() =>{navigate(`/p/${post._id}`)}}>
            <CardActionArea>
            <CardCover sx={{width: 300, height: 300,}}>
                {post.media.type === "image" ? <img
                    src={post.media.value}
                    alt="Image not found"
                /> : <video
                    autoPlay
                    muted
                >
                    <source
                        src={post.media.value}
                        type="video/mp4"
                    />
                </video>}
            </CardCover>
            </CardActionArea>
        </Card>
    );
}

export default PostSuperficial;
