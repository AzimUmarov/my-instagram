import React from 'react';
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import {CardActionArea} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";

function PostSuperficial({size}) {
    return (
        <Card sx={{ width: 300, height: 300}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    sx={{width: "100%", height: "100%", overflow: "hidden", background: "center no-repeat fixed"}}
                    image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-W9iJJ3w24EQ%2FXoWMjoLm1hI%2FAAAAAAAAZuw%2F6btoKXCZTWc2GWU_hTlBeHTRwsJdHU8fACLcBGAsYHQ%2Fs1600%2FBeautiful%252BLuxury%252BMansion%252Bin%252BCalifornia%252Bnew%252B1.jpg&f=1&nofb=1"
                    alt="green iguana"
                />
            </CardActionArea>
        </Card>
    );
}

export default PostSuperficial;
