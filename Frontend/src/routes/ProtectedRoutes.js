import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
    // Check if user is loggedin then user should not be allowed to access pages that required user to be authenticated

    // extract accessToken from localsotrage to check for user auth
    const accessToken = localStorage.getItem('accessToken');
    const user = accessToken ? true : false;
    console.log("user", user);
    return user ? <Outlet /> : <Navigate to="/login" />; // Redirect to login if not authenticated
};

export default ProtectedRoutes;
