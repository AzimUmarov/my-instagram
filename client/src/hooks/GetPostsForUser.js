import {useEffect, useState} from "react";
import ServiceAPI from "../API/ServiceAPI";

const GET_POSTS = "/post/get-for-user";

export default async function useFetchPostsForUser() {
    const  [posts, setPosts] = useState(null);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);

    await useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true);
                    let response = await ServiceAPI.get(GET_POSTS);
                    console.log(response?.data)
                    await setPosts(response?.data);
                }catch(err){
                    setError(err);
                }finally{
                    setLoading(false)
                }
            }
        )()
    }, []);

    console.log(posts)
    return { error, posts, loading}

}