import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(localStorage.getItem("accessToken") ? true : false);

    useEffect(() => {
        const handleStorageChange = () => {
            setIsUserLoggedIn(localStorage.getItem("accessToken") ? true : false);
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange); // Cleanup event listener
        };
    }, []);

    return (
        <UserContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;