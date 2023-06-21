import React, { Children } from "react";
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import './app.css';
import 'animate.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { Home, Login, Registration } from "./components";
import { Profile, CustomerPost, AppSettings, LogOut } from './components/SideBarWidget';
AOS.init();
const root = createRoot(document.getElementById('root'));
const router = createBrowserRouter(
    [
        { path:'/', element:<App/>},
        {path:'sign-up',element:<Registration/>},
        {path:'sign-in',element:<Login/>},
        {path:'home',element:<Home/>},
        { path:'profile', element:<div><Profile/></div>},
        { path:'your-post', element:<CustomerPost/>},
        { path:'settings', element:<AppSettings/>},
        { path:'log-out', element:<LogOut/>},
        
    ]
);
root.render(
    <React.StrictMode>
        <RouterProvider router={ router }>
            {Children}
        </RouterProvider>
    </React.StrictMode>
);