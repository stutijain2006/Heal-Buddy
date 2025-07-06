import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!token || !user?.isAdmin) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default AdminRoute;
