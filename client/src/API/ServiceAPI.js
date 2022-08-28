import axios from 'axios';

export function getLocalData(name) {
    const data = localStorage.getItem(name);
    return data ? JSON.parse(data) : {};
}

export default axios.create({
    baseURL: "http://localhost:4444/api",
    headers: {
        'Accept': 'application/vnd.GitHub.v3+json',
        'Content-Type': 'application/json'
    }
});