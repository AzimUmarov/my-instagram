import React from 'react';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Home from "../../pages/home/Home";
import ShowPost from "../post/ShowPost";
import ShowUser from "../user/ShowUser";
import Navbar from "../navbar/Navbar";
import Explore from "../../pages/explore/Explore";
import SignIn from "../../pages/signIn/SignIn";
import Login from "../../pages/User/Login";
import SignUp from "../../pages/User/SignUp";

function PublicRouter(props){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/:id" element={<> <Navbar/> <ShowUser /> </>} />
                <Route path="/p/:id" element ={<> <Navbar/> <ShowPost /> </>}/>
                <Route path="/page/explore" element ={<> <Navbar/> <Explore /> </>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default PublicRouter;
