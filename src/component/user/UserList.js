import * as React from 'react';
import Box from "@mui/material/Box";
import {Button, List, ListItem} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";

export default function EllipsisList({posts}) {
    return (
        <Box sx={{ width: 320, height: 660 }}>
            <List>
                <CardHeader
                    sx={{ width: 460}}
                    component="div"
                    avatar={
                        <Avatar sx={{ width: 56, height: 56 }} alt="Remy Sharp" src={posts[0].creator_img} aria-label="recipe">
                        </Avatar>
                    }
                    title="Shrimp and Chorizo Paella"
                    subheader={ <div><span style={{marginRight: 77}}>"September 4, 2016"</span> <Button size="small" sx={{mt: -3}}>follow</Button></div> }
                />
                <CardHeader
                    sx={{ width: 460}}
                    component="div"
                    avatar={
                        <Avatar alt="Remy Sharp" src={posts[0].creator_img} aria-label="recipe">
                        </Avatar>
                    }
                    title="Shrimp and Chorizo Paella"
                    subheader={ <div><span style={{marginRight: 77}}>"September 4, 2016"</span> <Button size="small" sx={{mt: -3}} >follow</Button></div> }
                /> <CardHeader
                    sx={{ width: 460}}
                    component="div"
                    avatar={
                        <Avatar alt="Remy Sharp" src={posts[0].creator_img} aria-label="recipe">
                        </Avatar>
                    }
                    title="Shrimp and Chorizo Paella"
                    subheader={ <div><span style={{marginRight: 77}}>"September 4, 2016"</span> <Button size="small" sx={{mt: -3}} >follow</Button></div> }
                /> <CardHeader
                    sx={{ width: 460}}
                    component="div"
                    avatar={
                        <Avatar alt="Remy Sharp" src={posts[0].creator_img} aria-label="recipe">
                        </Avatar>
                    }
                    title="Shrimp and Chorizo Paella"
                    subheader={ <div><span style={{marginRight: 77}}>"September 4, 2016"</span> <Button size="small" sx={{mt: -3}} >follow</Button></div> }
                /> <CardHeader
                    sx={{ width: 460}}
                    component="div"
                    avatar={
                        <Avatar alt="Remy Sharp" src={posts[0].creator_img} aria-label="recipe">
                        </Avatar>
                    }
                    title="Shrimp and Chorizo Paella"
                    subheader={ <div><span style={{marginRight: 77}}>"September 4, 2016"</span> <Button size="small" sx={{mt: -3}} >follow</Button></div> }
                />

            </List>
        </Box>
    );
}
