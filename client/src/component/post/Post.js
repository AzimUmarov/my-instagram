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
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import {Divider, InputBase} from "@mui/material";
import Box from "@mui/material/Box";
import Picker from 'emoji-picker-react';
import {useContext, useEffect, useMemo, useState} from "react";
import MoodIcon from '@mui/icons-material/Mood';
import ServiceAPI from "../../API/ServiceAPI";
import moment from "moment";
import { useEffectX } from "use-effect-x";
import UserContext from "../../context/GlobalData/User";
const GET_USER_WITH_ID = "/user/get-one/"
const GET_USER_COMMENTS = "/comment/get-user-comments/"
const POST_COMMENT_WITH_POST_ID = "/comment/create/"
const POST_LIKE_WITH_ID = "/post/like/"


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
    const  [comments, setComments] = useState([]);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(null);
    const [creator,setCreator] = useState(null);
    const {user} = useContext(UserContext)

    async function handleSubmit(e){
        e.preventDefault();
        const body = inputComment;
        try{
            setLoading("post-comment-loading");
            const response = await  ServiceAPI.post(POST_COMMENT_WITH_POST_ID + post?._id, {body});
            setLoading(false);
            setInputComment("")
            setComments([{body}, ...comments])
        }catch(err){
            setError(err);
        }finally{
            setInputComment("")
            setLoading(false);
        }
    }

    async function handleLike(e){
        e.preventDefault();
        try{
            const index = post.likes.indexOf(user._id);
            if (index === -1) {
                post.likes.push(user._id)
            }
            else
                post.likes.splice(index, 1);

            setLoading("like-loading");
            const response = await  ServiceAPI.patch(POST_LIKE_WITH_ID + post?._id);
            console.log(response.data);
            setLoading(false);
        }catch(err){
            setError(err);
        }finally{
            setLoading(false);
        }
    }


    useMemo(async () => {
                try{
                    setLoading(true);
                    const response2 = await  ServiceAPI.get(GET_USER_WITH_ID + post?.creator);
                    const response = await  ServiceAPI.get(GET_USER_COMMENTS + post?._id);
                    setCreator(response2?.data);
                    setComments(response?.data?.data);
                    setLoading(false);
                }catch(err){
                    setError(err);
                }finally{
                    setInputComment("")
                    setLoading(false);
                }
    }, [post?._id]);

    const onEmojiClick = (event, emojiObject) => {
        setInputComment(prevInput => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };

    return (
        <Card sx={{width: {md: 460, xs: "100%", sm: 460, xl: 460, lg: 460}, mt: 1.5,mb: 1.5, borderRadius: 2}} variant="outlined" >
            <CardHeader
                avatar={
                    <Avatar alt="Remy Sharp" src={creator?.avatar} aria-label="recipe">
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreHorizOutlinedIcon />
                    </IconButton>
                }
                title={creator?.firstName + " " + creator?.lastName}
                subheader={creator?.username}
            />
            <CardMedia
                component="img"
                height="60%"
                image={post?.media?.value}
                alt="Paella dish"
            />
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    {post.likes.includes(user._id) ? <FavoriteIcon onClick={handleLike}/> : <FavoriteBorderOutlinedIcon onClick={handleLike}/>}
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
                <Typography sx={{mt: "-5%", mb: "1%", fontWeight: "bold"}} component="div" >{post.likes.length} likes </Typography>
                <Typography variant="body1" >
                    {post.description}
                </Typography>
                {comments?.length && comments?.map((comment, index) =>
                    index < 3 ?
                <Typography component="div" sx={{mt: 1}}>
                    <span className="author" style={{fontWeight: "bold"}}> {user?.username} </span>
                    <span className="body" style={{}}>{comment.body}</span>
                    {false ? <FavoriteIcon sx={{float: "right", fontSize: 15, mt: 0.5}}/> : <FavoriteBorderOutlinedIcon sx={{float: "right", fontSize: 15, mt: 0.5}} />}
                </Typography> : null
                )}
                <Typography component="div" variant="body2" color="#A9A9A9" sx={{textTransform: "UpperCase", fontSize: 11, letterSpacing: 1, mt: 1}}>
                    {moment(post?.createdAt).fromNow()} &nbsp; <span style={{color: "white", cursor: "pointer", textTransform: "none", fontSize: 12, letterSpacing: 0.3, fontWeight: "bold"}}>See translation</span>
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

                    <Typography onClick={handleSubmit} component="span" sx={{color: loading === "post-comment-loading" ? "#5F9EA0" : "#483D8B", mr: 1, my: 0.5, cursor: "pointer" }}>
                        {loading === "post-comment-loading" ? "..." : "Post"}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
