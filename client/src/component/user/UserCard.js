import React, {useContext, useState} from 'react';
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import {Button, Link} from "@mui/material";
import {styles} from "./UserCardStyleObjects";
import ServiceAPI from "../../API/ServiceAPI";
import UserContext from "../../context/GlobalData/User";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../firebase";
import {v4} from "uuid";
const FOLLOW_WITH_ID = "/user/follow/"
const UPDATE_USER = "/user/update"


function UserCard({forWhat, user, userAvatar}) {
    const [avatar, setAvatar] = useState(userAvatar);
    const [loading, setLoading] = useState(false);
    const [following, setFollowing] = useState(false)
    const context = useContext(UserContext);
    const id = context.user._id;

    const uploadPhoto = (e) => {
        setLoading(true)
        const media = e.target.files[0];
        console.log( media);
        if(media == null) return;
        const mediaRef = ref(storage, `avatar/${media.name + v4() }` );
        uploadBytes(mediaRef, media).then((res) => {
            console.log(res.ref);
            getDownloadURL(res.ref).then(async (value) => {
                setAvatar(value);
                try{
                    const response = await ServiceAPI.patch(UPDATE_USER, {avatar: value})
                    context.setUser(response?.data)
                    console.log(response)
                }catch(err){
                }finally{
                }
                setLoading(false);
            })
        })
    };


    async function follow(e){
        if(forWhat === "currentUserOnHomepage")
            return;

        try{
            const response = await  ServiceAPI.post(FOLLOW_WITH_ID + user._id);
            console.log(response?.data);
            setFollowing(!following);
        }catch(err){
        }finally{
        }
    }



    if(forWhat !== "chat" && forWhat !== "currentUserOnHomepage" && forWhat !== "settings" && user.followers.includes(id))
        return null;

    return (
        <CardHeader
            sx={{ width: {xl: 460, lg: 460, md: 400}}}
            component="div"
            avatar={
                <Avatar sx={forWhat === "currentUserOnHomepage" || forWhat === "settings"  ? styles.forCurrentUserOnHomePage.avatar : null} alt="R" /* add skeleton*/ src={forWhat === "settings" ? avatar : user?.avatar} aria-label="recipe">
                </Avatar>
            }
            title={forWhat === "settings" ? <h6 style={{fontWeight: "bold"}}>{user?.username}</h6> : user?.username}
            subheader={ <div>
                {forWhat === "settings" ?
                    <Link
                        sx={{fontWeight: "bold", textDecoration: "none", color: loading ? "#FAEBD7" : null}}
                        disabled={loading}
                        component="label" >
                        {loading ? "Please wait..." : "Change your profile photo"}
                        <input onChange={uploadPhoto} hidden accept="image/*" type="file"/>
                    </Link>
                    :<div style={{width: "66%", float: "left"}}>{`${user?.firstName} ${user?.lastName}`}</div>}
                <Button size="small" onClick={follow} sx={{mt: -3, textTransform: "capitalize", fontWeight: "bold", color: following ? "white" : null}}> {forWhat === "currentUserOnHomepage" ? "switch" : forWhat === "chat" || forWhat === "settings" ?  null : following ? "following" :  "follow"}</Button>
            </div>}
        />
    );
}

export default UserCard;
