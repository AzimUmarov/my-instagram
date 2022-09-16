import React, {useState} from 'react';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {storage} from "../../../firebase";
import {v4} from "uuid";
import {Grid, Modal} from "@mui/material";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { style } from "../UploadFile/UploadFile"

function ChangeAvatar({modal, setM}) {


    return (
        <Modal
            keepMounted
            open={modal}
            onClose={setM(false)}
            sx={{}}
        >
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={style}
            >

                <Grid item xs={3}>
                    <AccountCircleIcon fontSize="large" sx={{width: 200, height: 200}}/>
                </Grid>
                <Grid item xs={1}>
                    <Typography
                        component="span"
                        sx={{fontSize:20}}
                        component="p">Drag photos and videos here</Typography>
                </Grid>
                <Grid  item xs={3}>
                    <Stack direction="row" alignItems="center" spacing={2}>

                    </Stack>
                </Grid>
            </Grid>
        </Modal>
    );
}

export default ChangeAvatar;