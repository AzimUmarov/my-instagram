import {createContext, useEffect, useState} from 'react';

function getLocalData(name) {
    const data = localStorage.getItem(name);
    return data ? JSON.parse(data) : {};
}

const UserContext = createContext({});

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(getLocalData("user"));

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;
