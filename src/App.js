import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
const App = () => {
    let [theme, setTheme] = useState();
    useEffect(() => {
        if (window.localStorage.darkmode !== undefined || window.localStorage.darkmode !== null) {
            // eslint-disable-next-line
            theme = window.localStorage.darkmode;
            setTheme(theme);
        }
    }, [theme]);
    return (
        <div className={`home ${theme ? 'darkmode' : ''}`}>
            <Toaster />
            <div className="holder">
                <div className="waves-orange"></div>
                <Login />
            </div>
        </div>
    );
}
export default App;