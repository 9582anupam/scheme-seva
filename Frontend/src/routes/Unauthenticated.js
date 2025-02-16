import { Outlet, Navigate } from "react-router-dom";

const Unauthenticated = () => {
    // Check if user is logged in then user should not be allowed to access pages like login, signup, reset password etc

    // extract accessToken from localstorage to check for user auth
    const accessToken = localStorage.getItem('accessToken');
    const user = accessToken ? true : false;
    console.log("user", user);
    return !user ? <Outlet /> : <Navigate to="/" />; // Redirect to home if authenticated
};

export default Unauthenticated;
