import { Outlet, useLocation } from "react-router-dom";
import Profile from "./Profile";

const Layout =() =>{
    const location= useLocation();
    const showProfile = location.pathname === '/profile';
    return(
        <>
            <Outlet />
            {showProfile && (
                <div style={overlayStyle}>
                    <Profile />
                </div>
            )}
        </>
    );
};

const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    zIndex: 999,
    display: "flex",
    justifyContent: "flex-end",
};

export default Layout;