import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import jQuery from "jquery";
import axios from "axios";
import Loader from "./loading/Loading";
const Login = () => {
    const navigate = useNavigate();
    let [theme, setTheme] = useState();
    const pressed = (e) => {
        if (e.key === 'Enter') {
            document.querySelector("#signUp").click();

        }
    }
    const [username, setUsername] = useState('');
    const [passwords, setPasswords] = useState('');
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        axios.post('https://www.the-graffiti.com/login.php', { username, passwords })
            .then(response => {
                if (response.data.success === false) {
                    toast.error("Sorry, Permision denied!");
                } else {
                    jQuery(".btnn button").fadeOut({
                        duration: 10, done: function () {
                            jQuery(".btnn .loader").fadeIn({ duration: 10 });
                        }
                    });
                    window.localStorage.setItem("userId", username);
                    toast.success("login successed!");
                    setTimeout(() => {
                        navigate('/home');
                    }, 2000);
                }
            })
            .catch(error => {
                toast.error("Ooops, something wen't wrong!");
                console.log(error);
            });
    }
    useEffect(() => {
        jQuery(".btnn .loader").fadeOut({ duration: 10 });
        if (window.localStorage.darkmode !== undefined || window.localStorage.darkmode !== null) {
            // eslint-disable-next-line
            theme = window.localStorage.darkmode;
            setTheme(theme);
        }
    }, [navigate]);
    return (
        <div className={`box-for-checking-if  ${theme ? 'darkmode' : ''}`}>
            <div className="title login">
                <span>Graffiti.</span>
            </div>
            <div className="form" onKeyDown={pressed}>
                <div className="fill">
                    <span className="animate__animated animate__fadeInUp">Username</span>
                    <input type="text" className="animate__animated animate__fadeInUp animate__delay-1s" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="fill">
                    <span className="animate__animated animate__fadeInUp animate__delay-2s">Password</span>
                    <input type="password" className="animate__animated animate__fadeInUp animate__delay-3s" value={passwords} onChange={(e) => setPasswords(e.target.value)} />
                </div>
                <div className="btnn">
                    <Loader />
                    <button type="submit" className="btn-small animate__animated animate__fadeInUp animate__delay-4s" onClick={handleFormSubmit}><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg></span> sign in</button>
                </div>
                <div className="dont">
                    <p><Link to={`sign-up`} className="link animate__animated animate__fadeInUp animate__delay-5s">don't have an account?</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login;