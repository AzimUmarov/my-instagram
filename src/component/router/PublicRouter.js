import React from 'react';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Home from "../../pages/home/Home";
import ShowPost from "../post/ShowPost";
import ShowUser from "../user/ShowUser";
import Navbar from "../navbar/Navbar";
import Explore from "../../pages/explore/Explore";

function PublicRouter(props){
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:id" element={<ShowUser />} />
                <Route path="/p/:id" element ={<ShowPost />}/>
                <Route path="/page/explore" element ={<Explore />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default PublicRouter;
