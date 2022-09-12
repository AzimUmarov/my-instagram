import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Home from "../../pages/home/Home";
import ShowUser from "../user/ShowUser";
import ShowPost from "../post/ShowPost";
import Explore from "../../pages/explore/Explore";
import Chat from "../../pages/chat/Chat";
import Like from "../../pages/like/Like";
import Upload from "../../pages/upload/Upload";
import Settings from "../../pages/settings/Settings";

function PrivateRouter(props) {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:id" element={<ShowUser />} />
                <Route path="/:id/saved" element={ <ShowUser type={"saved"} /> } />
                <Route path="/:id/hashtag" element={<ShowUser type={"hashtag"} />} />
                <Route path="/page/saved" element={<ShowUser where="saved"/>} />
                <Route path="/p/:id" element ={<ShowPost />}/>
                <Route path="/page/explore" element ={<Explore />}/>
                <Route path="/page/upload" element ={<Upload />}/>
                <Route path="/page/chat" element ={<Chat />}/>
                <Route path="/page/settings" element ={<Settings />}/>
                <Route path="/page/settings/password" element ={<Settings whatFor="changePassword"/>}/>
                <Route path="/page/like" element ={<Like />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default PrivateRouter;
