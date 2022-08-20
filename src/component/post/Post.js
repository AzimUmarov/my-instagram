import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import {Divider, InputBase} from "@mui/material";
import Box from "@mui/material/Box";
import Picker from 'emoji-picker-react';
import {useState} from "react";
import MoodIcon from '@mui/icons-material/Mood';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Post({post, where}) {
    const [inputComment, setInputComment] = useState('');
    const [showPicker, setShowPicker] = useState(false);

    const onEmojiClick = (event, emojiObject) => {
        setInputComment(prevInput => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };

    return (
        <Card sx={{width: {md: 460, xs: "100%", sm: 460, xl: 460, lg: 460}, mt: 1.5,mb: 1.5, borderRadius: 2}} variant="outlined" >
            <CardHeader
                avatar={
                    <Avatar alt="Remy Sharp" src={post.creator_img} aria-label="recipe">
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <CardMedia
                component="img"
                height="60%"
                image={post.img}
                alt="Paella dish"
            />
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    {false ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
                </IconButton>
                <IconButton aria-label="add to favorites">
                    <ModeCommentOutlinedIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <ExpandMore aria-label="share">
                    {false ? <BookmarkOutlinedIcon /> :  <BookmarkBorderOutlinedIcon />}
                </ExpandMore>
            </CardActions>
            <CardContent>
                <Typography sx={{mt: "-5%", mb: "1%", fontWeight: "bold"}} component="div" >12 likes</Typography>
                <Typography variant="body1" >
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
                <Typography component="div" sx={{mt: 1}}>
                    <span className="author" style={{fontWeight: "bold"}}> user </span>
                    <span className="body" style={{}}>this is a comment</span>
                    {false ? <FavoriteIcon sx={{float: "right", fontSize: 15, mt: 0.5}}/> : <FavoriteBorderOutlinedIcon sx={{float: "right", fontSize: 15, mt: 0.5}} />}
                </Typography>
                <Typography component="div" variant="body2" color="#A9A9A9" sx={{textTransform: "UpperCase", fontSize: 11, letterSpacing: 1, mt: 1}}>
                    17 hours ago &nbsp; <span style={{color: "white", cursor: "pointer", textTransform: "none", fontSize: 12, letterSpacing: 0.3, fontWeight: "bold"}}>See translation</span>
                </Typography>
                <Divider width="140%" sx={{ml: -10, mt: 2}}/>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 1.5, mb : -1.3}}>
                    <MoodIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} onClick={() => setShowPicker(val => !val)} />
                    {showPicker && <Picker
                        disableSearchBar
                        native
                        pickerStyle={{backgroundColor: "#FAEBD7" , position: "absolute", zIndex: "12", marginBottom: 36, marginLeft: -24 }}
                        onEmojiClick={onEmojiClick} />}
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        value={inputComment}
                        onChange={(e) => setInputComment(e.target.value)}
                        placeholder="Add a comment..."
                    />

                    <Typography component="span" sx={{color: "#483D8B", mr: 1, my: 0.5, cursor: "pointer" }}>
                        Post
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
