import {createContext, useEffect, useState} from 'react';
import ServiceAPI, {getLocalData} from "../../API/ServiceAPI"

const UserContext = createContext({});

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(getLocalData("user"));
    const [token, setToken] = useState(getLocalData("token"));

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);
    useEffect(() => {
        ServiceAPI.defaults.headers.common['Authorization'] = `Barer ${token}`;
        localStorage.setItem('token', JSON.stringify(token));
    }, [token]);

    return (
        <UserContext.Provider value={{ user, setUser, token, setToken}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;
