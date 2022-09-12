import axios from 'axios';
import {useContext} from "react";
import UserContext from "../context/GlobalData/User";

export function getLocalData(name) {
    const data = localStorage.getItem(name);
    return data ? JSON.parse(data) : {};
}
const token = getLocalData("token");

export default axios.create({
    baseURL: "http://localhost:4444/api",
    headers: {
        'Accept': 'application/vnd.GitHub.v3+json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
});