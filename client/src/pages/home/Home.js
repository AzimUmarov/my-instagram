import React, {useEffect, useState} from 'react';
import Container from "@mui/material/Container";
import Post from "../../component/post/Post";
import HomeUsers from "../../component/user/UserList";
import ServiceAPI from "../../API/ServiceAPI";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
const GET_POSTS_FOR_USER_URL = "/post/get-for-user"

function Home(props) {
    const  [posts, setPosts] = useState(null);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true);
                    let response = await  ServiceAPI.get(GET_POSTS_FOR_USER_URL);
                    await setPosts(response?.data);
                }catch(err){
                    setError(err);
                }finally{
                    setLoading(false)
                }
            }
        )()
    }, []);

    return (
        <div>
            <Container maxWidth="sm" > {/*{xl: 1, lg:2, md: 3, sm: 4, xs: 5}*/}
                <Typography component="div" sx={{display: {xs: 'none', md: "flex", sm: "none", xl: "flex", lg: "flex"}, ml: {md: "65%", xs: "50%", sm: "50%", xl: "50%", lg: "50%"}, mr: {md: "-50%"}}}>
                    <HomeUsers posts={posts} />
                </Typography>
                <Typography sx={{ml: {md: "-27%", xs: 0, sm: "5%", xl: "-50%", lg: "-50%"}, mt: {xl: -82, lg: -82, md: -82}}}>
                    {loading ? Array.from(new Array(3)).map((item, index) => (
                        <Card sx={{width: {md: 460, xs: "100%", sm: 460, xl: 460, lg: 460}, mt: 1.5,mb: 1.5, borderRadius: 2}} variant="outlined">
                            <CardHeader
                                avatar={
                                    <Skeleton animation="wave" variant="circular" width={40} height={40} />
                                }
                                title={
                                    <Skeleton
                                            animation="wave"
                                            height={10}
                                            width="80%"
                                            style={{ marginBottom: 6 }}
                                    />
                                }
                                subheader={
                                    <Skeleton animation="wave" height={10} width="40%" />
                                }
                            />

                            <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />

                            <CardContent>
                                    <React.Fragment>
                                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                        <Skeleton animation="wave" height={10} width="80%" />
                                    </React.Fragment>
                            </CardContent>
                        </Card>
                    )) : null}
                    <h4 className={error ? "text-warning bg-secondary p-2 mb-0 mt-2 w-100 text-center border position-sticky" : "d-none"} aria-live="assertive">{error?.message}</h4>
                    {posts?.map(item =>
                        <Post post={item} where="home" />
                    )}
                </Typography>
            </Container>
        </div>
    );
}

export default Home;
