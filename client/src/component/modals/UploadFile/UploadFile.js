import React, {useState} from 'react';
import Button from '@mui/material/Button';
import {storage} from "../../../firebase";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import {Grid, Modal} from "@mui/material";
import {v4} from "uuid"
import TextField from "@mui/material/TextField";
import ServiceAPI from "../../../API/ServiceAPI";
import Picker from "emoji-picker-react";
import MoodIcon from "@mui/icons-material/Mood";
const UPLOAD_IMAGE = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNzUycHQiIGhlaWdodD0iNzUycHQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDc1MiA3NTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8Zz4KICA8cGF0aCBkPSJtNTE0LjkgMTc4LjZoLTI3Ny43OWMtMzMuMDkgMC02MC4wMDggMjYuOTI2LTYwLjAwOCA2MC4wMTZ2MTgxLjE3YzAgMzMuMDkgMjYuOTE4IDYwLjAwOCA2MC4wMDggNjAuMDA4aDgwLjM5NWM2LjQ2MDkgMCAxMS43MDMtNS4yMzQ0IDExLjcwMy0xMS43MDNzLTUuMjM4My0xMS43MDMtMTEuNzAzLTExLjcwM2gtODAuMzk1Yy0yMC4xODQgMC0zNi42MDktMTYuNDE4LTM2LjYwOS0zNi42MDl2LTE4MS4xNmMwLTIwLjE4OCAxNi40MjItMzYuNjA5IDM2LjYwOS0zNi42MDloMjc3Ljc5YzIwLjE4NCAwIDM2LjYwOSAxNi40MTggMzYuNjA5IDM2LjYwOXYxNDQuOTRjMCA2LjQ2ODggNS4yMzgzIDExLjcwMyAxMS43MDMgMTEuNzAzIDYuNDYwOSAwIDExLjY5OS01LjIzODMgMTEuNjk5LTExLjcwM3YtMTQ0Ljk0YzAtMzMuMDktMjYuOTE4LTYwLjAxNi02MC4wMDgtNjAuMDE2eiIvPgogIDxwYXRoIGQ9Im00MzkuNDYgMzMyLjUxYzAtOC4xNjgtNC44Nzg5LTE3LjA3NC0xMi43MTUtMjIuODk4bC02Ny43NS00Ny4xMjljLTE0LjMxMi0xMC42MzctNDcuMjU0LTEuNzYxNy00Ny4yNTQgMTkuMzcxdjk0LjY5NWMwIDE0LjkyMiAxNi4yMTUgMjQuMTUyIDMxLjIzOCAyNC4xNTIgNi4yNzM0IDAgMTEuODEyLTEuNjU2MiAxNS40NDktNC4zODY3bDcyLjk4LTQ3Ljc1YzUuMTkxNC0zLjg1OTQgOC4wNTA4LTkuNTYyNSA4LjA1MDgtMTYuMDU1em0tOTQuMTk5IDQ0LjQ4NGMtMC4xODM1OSAwLjA4MjAzMS0wLjk0MTQxIDAuMzA4NTktMi4yNzczIDAuMzA4NTktMy4zNTk0IDAtNi40ODgzLTEuMjkzLTcuODM1OS0yLjIzODNsLTAuMDAzOTA3LTkxLjcxNWMxLjM1MTYtMC45NjA5NCA0LjQ4MDUtMi4yMzgzIDcuODQzOC0yLjIzODMgMS4zMzIgMCAyLjA5NzcgMC4yMTg3NSAyLjM0NzcgMC4zNjMyOGw2Ny43NDYgNDcuMTQ1YzEuMDAzOSAwLjc0MjE5IDEuNzgxMiAxLjY3OTcgMi4yOTY5IDIuNDkyMnoiLz4KICA8cGF0aCBkPSJtNDE4LjA5IDQ2NS45NWMtMi4yMjI3IDIuMTAxNi0zLjUwNzggNS4xNTIzLTMuNTA3OCA4LjE5MTRzMS4yODUyIDYuMDgyIDMuNTA3OCA4LjMwNDdjMi4xMDk0IDIuMjI2NiA1LjE1MjMgMy4zOTQ1IDguMTkxNCAzLjM5NDUgMy4xNjAyIDAgNi4wODU5LTEuMTY0MSA4LjMwNDctMy4zOTQ1IDIuMjIyNy0yLjIyNjYgMy4zOTQ1LTUuMjY1NiAzLjM5NDUtOC4zMDQ3cy0xLjE2OC02LjA4OTgtMy4zOTQ1LTguMTkxNGMtNC4zMjQyLTQuNDQ5Mi0xMi4yNzctNC40NDkyLTE2LjQ5NiAweiIvPgogIDxwYXRoIGQ9Im01MzUuNzUgNDEyLjcxaC0xMzYuMzVjLTE5LjM4MyAwLTM1LjEwMiAxNS43MTUtMzUuMTAyIDM1LjEwMnY1NS41NzhjLTAuNDQ1MzEgMS45NzY2LTAuNTU4NTkgMy45NzY2IDAgNS44NzExdjI5LjAzNWMwIDE5LjM4MyAxNS43MTkgMzUuMTAyIDM1LjEwMiAzNS4xMDJoMTM2LjM1YzE5LjM4MyAwIDM1LjEwMi0xNS43MTUgMzUuMTAyLTM1LjEwMnYtOTAuNDkyYy0wLjAwMzkwNi0xOS4zODMtMTUuNzE5LTM1LjA5NC0zNS4xMDItMzUuMDk0em0xMS42OTUgMTI1LjU4YzAgNi40NDkyLTUuMjUzOSAxMS43MDMtMTEuNzAzIDExLjcwM2gtMTM2LjM0Yy02LjQ0OTIgMC0xMS43MDMtNS4yNDYxLTExLjcwMy0xMS43MDN2LTEyLjMyNGwxOS4yMyAxMC41NDNjNC4yMTQ4IDIuMzA0NyA4Ljg1NTUgMy40NTMxIDEzLjQ3NyAzLjQ1MzEgNi4wODk4IDAgMTIuMTUyLTEuOTc2NiAxNy4xNzYtNS44NzExbDU2Ljg0NC00NC4wNTljMS42OTE0LTEuMzEyNSA0LjA0My0xLjMwMDggNS43MjY2IDAuMDMxMjVsNDMuMDg2IDM0LjQwNmMxLjI4NTIgMS4wMjM0IDIuNzE4OCAxLjcxODggNC4yMDcgMi4xMjV6bTAtNDAuNDEtMzIuNjk5LTI2LjEwOWMtMTAuMTY0LTguMTAxNi0yNC40MTgtOC4xOTE0LTM0LjY1Ni0wLjIyNjU2bC01Ni44MzYgNDQuMDQ3Yy0xLjQ2NDggMS4xMTcyLTMuNDUzMSAxLjI5My01LjA3MDMgMC4zOTg0NGwtMzAuNDg0LTE2LjcwN3YtNTEuNDhjMC02LjQ0OTIgNS4yNTM5LTExLjcwMyAxMS43MDMtMTEuNzAzaDEzNi4zNWM2LjQ0OTIgMCAxMS43MDMgNS4yNDYxIDExLjcwMyAxMS43MDN2NTAuMDc4eiIvPgogPC9nPgo8L3N2Zz4K";
const POST_CREATE_URL = "/post/create"
export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "70%",
    bgcolor: 'background.paper',
    borderRadius: '20px',
    boxShadow: 24,
    outline: 0,
    p: 4,
    display: {md: "flex", sm: "flex", xl: "flex", lg: "flex", xs: "none"},
    height: '80%'
};
function UploadFile({currentNav, setCurrentNav}) {
    const [newPost, setNewPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = React.useState('');
    const [showPicker, setShowPicker] = useState(false);
    const onEmojiClick = (event, emojiObject) => {
        setValue(prevInput => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const uploadMedia = (e) => {
        setLoading(true)
        const media = e.target.files[0];
        console.log( media);
        if(media == null) return;
        const mediaRef = ref(storage, `media/${media.name + v4() }` );
        uploadBytes(mediaRef, media).then((res) => {
            console.log(res.ref);
            getDownloadURL(res.ref).then((value) => {
                const type = media.type.split("/")[0];
                const post = {media: {
                        type,
                        value
                    }};
                setNewPost(post);
                setLoading(false)
                console.log({media: {
                        type,
                        value
                    }});
                console.log(newPost)
            })
        })
    };

    const PostPublish = async (e) => {

        try {
            setLoading(true);
            const post = {description: value, ...newPost};
            const response = await ServiceAPI.post(POST_CREATE_URL, JSON.stringify(post))
            const resPost = response?.data?.data;
            console.log(resPost);
            setLoading(false);
            setCurrentNav("home");
        } catch (err) {
            setLoading(false);
            if (!err?.response)
                alert('Login Failed, Try again later');
            else
                alert(err.response?.data?.message || 'Login Failed, Try again later');
        }
    }

    return (
        <div>
            <Modal
                keepMounted
                open={currentNav === "upload"}
                onClose={() => setCurrentNav("home")}
                sx={{}}
            >
                {newPost ?
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        sx={style}
                    >
                            <>
                                {newPost?.media?.type === "image" ? <Typography
                                        component="img"
                                        sx={{height: 400}}
                                        src={newPost?.media?.value}
                                    />
                                    : <video
                                        autoPlay
                                        style={{height: 400}}
                                    >
                                        <source
                                            src={newPost?.media?.value}
                                            type="video/mp4"
                                        />
                                    </video>
                                }
                            <Grid item xs={1}>
                                <MoodIcon sx={{ color: 'action.active', mr: 2, mt: -3}} onClick={() => setShowPicker(val => !val)} />
                                {showPicker && <Picker
                                    disableSearchBar
                                    native
                                    pickerStyle={{backgroundColor: "#FAEBD7" , position: "absolute", zIndex: "12", marginTop: -370 , marginLeft: 0 }}
                                    onEmojiClick={onEmojiClick} />}
                                <textarea
                                    style={{backgroundColor: "inherit",color:"inherit", outline: "none", borderRadius: 5, width: 500, height: 100, marginBottom: 6, marginTop: 20}}
                                    value={value}
                                    onChange={handleChange}
                                    tabIndex="5"
                                    placeholder="Type your post here"
                               />
                            </Grid>
                                <Grid  item xs={1}>
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Button
                                            variant="contained"
                                            disabled={loading}
                                            component="label"
                                            onClick={PostPublish}
                                        >
                                            Publish
                                        </Button>
                                    </Stack>
                                </Grid>
                            </>

                    </Grid>
                    : <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        sx={style}
                    >

                        <Grid item xs={3}>
                            <Typography
                                component="img"
                                sx={{height: 400, width: 400 }}
                                src={UPLOAD_IMAGE}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <Typography
                                component="span"
                                sx={{fontSize:20}}
                                component="p">Drag photos and videos here</Typography>
                        </Grid>
                        <Grid  item xs={3}>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Button
                                    variant="contained"
                                    disabled={loading}
                                    component="label">
                                    {loading ? "Please wait..." : "Select from Computer"}
                                    <input onChange={uploadMedia} hidden accept="image/*, video/*" type="file"/>
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                }
            </Modal>
        </div>
    );
}

export default UploadFile;