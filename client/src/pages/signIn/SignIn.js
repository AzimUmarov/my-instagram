import React, {useContext, useState} from 'react';
import ServiceAPI from "../../API/ServiceAPI";
import UserContext from "../../context/GlobalData/User";
const LOGIN_URL = "/auth/signin";

function SignIn(props) {
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { setUser} = useContext(UserContext);

    async function signIn(e) {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        try {
            setLoading(true);
            setErrorMessage("");
            const response = await ServiceAPI.post(LOGIN_URL, JSON.stringify({username, password}));
            const token = response?.data?.data?.token;
            setLoading(false);
            ServiceAPI.defaults.headers.common['Authorization'] = `Barer ${token}`;
            setUser(response?.data?.data?.user);
        } catch (err) {
            setLoading(false);
            if (!err?.response)
                setErrorMessage('Login Failed, Try again later');
            else
                setErrorMessage(err.response?.data?.message || 'Login Failed, Try again later');
        }
    }

    return (
        <>
            <div id="insta_wrapper">
                <div id="container">
                    <div className="column left">
                        <div className="carousel" id="carousel">
                            <img className="sliderimage"
                                 src="https://www.instagram.com/static/images/homepage/screenshot1.jpg/aafd8c6b005d.jpg"/>
                        </div>
                    </div>
                    <div className="column right">
                        <div className="login">
                            <h1><img
                                src="https://images.squarespace-cdn.com/content/5a08b5a2914e6b339a5fc1eb/1517228465154-SFQGFVOTGBKF84MUR2UB/Instagram_logo.svg.png?format=1000w&content-type=image%2Fpng"
                                width="200px" height="68px"/></h1>
                            <form onSubmit={signIn} >

                                <input placeholder="username" className="input" type="text" name="username"/>
                                <input placeholder="Password" className="input" type="password" name="password"/>

                                <input type="submit" className="input" value="Log In"/><br/>
                            </form>

                            <div className="divider"><b>OR</b></div>

                            <div className="fbwrapper">
                                <div className="fb"><a href="https://facebook.com"><img
                                    src="https://i.imgur.com/exksovo.png"/> Log in with Facebook</a></div>
                            </div>

                            <div className="forgotwrapper">
                                <div className="forgot"><a href="forget.html">Forgot password?</a></div>
                            </div>
                        </div>


                        <div className="infobox">

                            <p>Don't have an account? <a href="login.html">Sign up</a></p>

                        </div>
                        <div className="get-app-panel">
                            Get the app.
                            <div className="app-buttons">
                                <a href="#" className="a"><img className="app-store"
                                                 src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/4b70f6fae447.png"/></a>
                                <a href="#" className="a"><img className="google-play"
                                                 src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/f06b908907d5.png"/></a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    );
}

export default SignIn;