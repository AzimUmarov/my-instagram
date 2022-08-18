import React from 'react';
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import {posts} from "../../fakeData";
import {Button} from "@mui/material";

function UserForList(props) {
    return (
        <Typography component="div">
            <CardHeader
                avatar={
                    <Avatar alt="Remy Sharp" aria-label="recipe">
                    </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <Button size="small">follow</Button>
        </Typography>
    );
}

export default UserForList;
