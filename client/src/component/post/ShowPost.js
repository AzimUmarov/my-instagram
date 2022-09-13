import React, {useContext, useEffect, useMemo, useState} from 'react';
import {useParams} from "react-router-dom";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import {Divider, InputBase} from "@mui/material";
import Box from "@mui/material/Box";
import MoodIcon from "@mui/icons-material/Mood";
import Picker from "emoji-picker-react";
import {styled} from "@mui/material/styles";
import CardContent from '@mui/material/CardContent';
import ServiceAPI from "../../API/ServiceAPI";
import UserContext from "../../context/GlobalData/User";
import moment from "moment/moment";
import Skeleton from "@mui/material/Skeleton";
const GET_USER_WITH_ID = "/user/get-one/"
const GET_COMMENTS = "/comment/get-post-comments/"
const POST_COMMENT_WITH_POST_ID = "/comment/create/"
const POST_LIKE_WITH_ID = "/post/like/"
const COMMENT_LIKE_WITH_ID = "/comment/like/"
const POST_SAVE_WITH_ID = "/post/save/"
const GET_POST_WI = "/post/get-one/"
const BASE_URL = "http://localhost:3000/p/"

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

function ShowPost(props) {
    const {id} = useParams();
    const [post, setPost] = useState(null);
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
            setLoading(null);
            const response = await  ServiceAPI.post(POST_COMMENT_WITH_POST_ID + post?._id, {body});
            setLoading(false);
            setInputComment("")
            setComments([{body, creator: user}, ...comments])
        }catch(err){
            setError(err);
        }finally{
            setInputComment("")
            setLoading(false);
        }
    }

    async function getPost(){
        try{
            setLoading("post");
            if(id){
                const res = await ServiceAPI.get(GET_POST_WI + id);
                setPost(res?.data);
            }
            setLoading(false);
        }catch(err){
            setError(err);
        }finally{
            setInputComment("")
            setLoading(false);
        }
    }

    async function getComments(){
        try{
            if(!creator)
            setLoading(true);
            if(post) {
                const resUser = await ServiceAPI.get(GET_USER_WITH_ID + post?.creator);
                const resComments = await ServiceAPI.get(GET_COMMENTS + post?._id);
                setCreator(resUser?.data);
                setComments(resComments?.data?.data);
            }
            setLoading(false);
        }catch(err){
            setError(err);
        }finally{
            setInputComment("")
            setLoading(false);
        }
    }

    useEffect(() => {
        if(id){
            getPost();
        }
    }, [id])
    useEffect(() => {
        if(post){
            getComments()
        }
    }, [post])

    async function handleLike(e, comment){
        e.preventDefault();
        try{

            // setLoading("like")
            let index;
            if(comment === "save")
                index = post.saves.indexOf(user._id);
            else if(comment)
                index = comment.likes.indexOf(user._id);
            else
                index = post.likes.indexOf(user._id);

            if (index === -1) {
                if(comment === "save")
                    post.saves.push(user._id)
                else if(comment)
                    comment.likes.push(user._id);
                else
                    post.likes.push(user._id)
            }
            else {
                if(comment === "save")
                    post.saves.splice(index, 1);
                else if(comment)
                    comment.likes.splice(index, 1);
                else
                    post.likes.splice(index, 1);
            }
            if(comment && comment !== "save"){
                comments.map(com => {
                    if(comment._id === com._id)
                        com = comment;
                })
                setComments([...comments])
            }
            else {
                setPost({...post})
            }
            const response = await  ServiceAPI.patch(comment ?
                (comment === "save") ? POST_SAVE_WITH_ID + post?._id : COMMENT_LIKE_WITH_ID + comment._id
                : POST_LIKE_WITH_ID + post?._id);
            console.log(response.data);
            // setLoading(false);
        }catch(err){
            setError(err);
        }finally{
            setLoading(false);
        }
    }


    const onEmojiClick = (event, emojiObject) => {
        setInputComment(prevInput => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };
    post?.media?.type === "image" ? <img
        src={post?.media?.value}
        alt="Image not found"
    /> : <video
        autoPlay
        controls
    >
        <source
            src={post?.media?.value}
            type="video/mp4"
        />
    </video>
    return (
        <Container>
            <Card sx={{ display: {xs: "block", sm: "block", xl: "flex",md: "flex", lg: "flex"}, mt: 3 }} variant="outlined" >
                <Card sx={{width: {xs:  "100%", sm:  "100%", xl:  "60%",md:  "60%", lg:  "60%"}, height: {xs: 400, sm: 600, xl: 800,md: 800, lg: 800}}} variant="outlined" >
                    {loading === "post" ?
                        <Skeleton sx={{ height: "100%" }} animation="wave" variant="rectangular" />
                        : post?.media?.type === "image" ? <CardMedia
                            component="img"
                            height="100%"
                            image={post?.media?.value}
                            alt="Paella dish"
                        /> : <video
                                    autoPlay
                                    controls
                                    width="100%"
                                    height="100%"
                                >
                                    <source
                                        src={post?.media?.value}
                                        type="video/mp4"
                                    />
                            </video>
                    }
                </Card>
                <Card
                    component="main"
                    sx={{ flexGrow: 1, width: {xs:  "100%", sm:  "100%", xl:  "35%",md:  "35%", lg:  "35%"} }}
                    variant="outlined"
                >
                    <CardHeader
                        avatar={
                            loading?
                                    <Skeleton animation="wave" variant="circular" width={40} height={40} /> :
                            <Avatar alt="Remy Sharp" src={creator?.avatar} aria-label="recipe">
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={
                            loading ? (
                                <Skeleton
                                    animation="wave"
                                    height={10}
                                    width="80%"
                                    style={{ marginBottom: 6 }}
                                />): (creator?.username
                        )}
                        subheader={
                            loading ? (
                                <Skeleton animation="wave" height={10} width="40%" />
                            ):
                                ( creator?.firstName + " " + creator?.lastName ) }
                    />
                    <CardContent>
                        <Typography component="div" sx={{height: {md: 519, xs: 350},width: {xs: "100%", md: '100%'},overflowY: "scroll"}}>

                            {loading ?  <Box sx={{ width: 300 }}>
                                <Skeleton />
                                <Skeleton animation="wave" />
                                <Skeleton animation="wave" />
                                <Skeleton animation="wave" />
                                <Skeleton animation={false} />
                            </Box>: <Typography component="div" sx={{mr: 1, mb: 1}}>
                                <span className="author" style={{fontWeight: "bold"}}>@{creator?.username} </span>
                                <span className="body" style={{}}>{post?.description}</span>
                            </Typography>}
                            {comments?.map((comment, index) =>
                                <Typography component="div" sx={{mt: 1}}>
                                <span className="author" style={{fontWeight: "bold"}}> <img src={comment?.creator?.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxsIVGXUz77jSd-Zgau2ZqRpL_STVm4gbxWQ&usqp=CAU"} style={{borderRadius: "50%", width: "25px", height: "25px", marginRight: "10px"}} /> @{comment?.creator?.username} </span>
                                <span className="body" style={{}}>{comment?.body}</span>
                                    {comment?.likes?.includes(user._id) ? <FavoriteIcon sx={{float: "right", cursor: "pointer", fontSize: 15, mt: 0.5}} onClick={(e) => handleLike(e, comment)}/> : <FavoriteBorderOutlinedIcon sx={{float: "right", fontSize: 15,cursor: "pointer", mt: 0.5}} onClick={(e) => handleLike(e, comment)}/>}
                                </Typography>
                                )}
                        </Typography>
                    </CardContent>
                    <Divider width="140%" sx={{ml: -10, mt: 2}}/>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites" onClick={handleLike} >
                            {post?.likes?.includes(user._id) ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon/>}
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon onClick={() => window.location.href = `mailto:name1@rapidtables.com?cc=name2@rapidtables.com&bcc=name3@rapidtables.com` +
                                `&subject=Share%post%` +
                                `&body=${post.description.split(' ').join("%")}%Link%For%Post%-%${BASE_URL}post._id}` } />
                        </IconButton>
                        <ExpandMore>
                            <IconButton aria-label="share" onClick={(e) => handleLike(e, "save")} >
                                {post?.saves?.includes(user._id) ? <BookmarkOutlinedIcon  /> :  <BookmarkBorderOutlinedIcon />}
                            </IconButton>
                        </ExpandMore>
                    </CardActions>
                    <CardContent>
                        <Typography sx={{mt: "-5%", mb: "1%", fontWeight: "bold"}} component="div" >{post?.likes?.length} likes</Typography>
                        <Typography component="div" variant="body2" color="#A9A9A9" sx={{textTransform: "UpperCase", fontSize: 11, letterSpacing: 1, mt: 1}}>
                            {moment(post?.createdAt).fromNow()} &nbsp; <span style={{color: "white", cursor: "pointer", textTransform: "none", fontSize: 12, letterSpacing: 0.3, fontWeight: "bold"}}>See translation</span>&nbsp;
                        </Typography>
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
                            <Typography onClick={handleSubmit} component="span" sx={{color: loading === null ? "#5F9EA0" : "#483D8B", mr: 1, my: 0.5, cursor: "pointer" }}>
                                {loading === null ? "..." : "Post"}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Card>
        </Container>
    );
}

export default ShowPost;
