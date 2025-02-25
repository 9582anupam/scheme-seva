import React, { useState, useContext, useRef, useEffect } from "react";
import { Menu, X, Home, Info, FileText, LogIn, ShieldCheck   , User } from 'lucide-react';
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import userAuthenticatedAxiosInstance from "../../../services/users/userAuthenticatedAxiosInstance";
import lionlogo from "../../../assets/lionsymbol.png";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { isUserLoggedIn, setIsUserLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();
    const profileRef = useRef(null);
    
    const userAxiosInstance = userAuthenticatedAxiosInstance('/api/v1/users');

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            const response = await userAxiosInstance.post("/logout");
            console.log(response);
            console.log("User logged out successfully");
        } catch (error) {
            console.error("An error occurred", error.message);
        } finally {
            localStorage.removeItem("accessToken");
            setIsUserLoggedIn(false);
            setIsProfileOpen(false);
            navigate("/");
            console.log("User logged out unsuccessfully");
        }
    };

    return (
        <header className="bg-[#74B83E] h-20 flex items-center justify-between px-4 md:px-8 w-full relative">
            <Link className="pt-1 flex items-center" to="/">
                <img src={lionlogo || "/placeholder.svg"} alt="logo" className="w-12 md:w-16 mr-2" />
                <h1 className="text-white text-2xl md:text-3xl font-bold">SchemeSeva</h1>
            </Link>
            <nav className="hidden md:flex justify-between items-center gap-10">
                <Link to="/" className="flex flex-col justify-center items-center text-white">
                    <Home className="w-7 h-7" />
                    <p className="font-semibold">Home</p>
                </Link>
                <Link to="/about" className="flex flex-col justify-center items-center text-white">
                    <Info className="w-7 h-7" />
                    <p className="font-semibold">About</p>
                </Link>
                <Link to="/schemes" className="flex flex-col justify-center items-center text-white">
                    <FileText className="w-7 h-7" />
                    <p className="font-semibold">Schemes</p>
                </Link>
                <Link to="/recommendations" className="flex flex-col justify-center items-center text-white">
                    <ShieldCheck    className="w-7 h-7" />
                    <p className="font-semibold">Suggests</p>
                </Link>
            </nav>
            <div className="flex gap-4 items-center">
                {isUserLoggedIn ? (
                    <div className="relative" ref={profileRef}>
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="bg-white text-black rounded-full p-2 hover:bg-gray-100 transition-colors"
                        >
                            <User size={24} className="text-[#74B83E]" />
                        </button>
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                <Link
                                    to="/profile"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    onClick={() => setIsProfileOpen(false)}
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="bg-white text-black rounded-md px-4 py-2 flex justify-center items-center cursor-pointer"
                    >
                        <LogIn size={18} className="mr-2" />
                        <p>Login</p>
                    </Link>
                )}
                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)} name="Menu Button">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            {isOpen && (
                <div onClick={() => { setIsOpen(!isOpen); }} className="absolute top-20 left-0 right-0 bg-[#74B83E] md:hidden min-h-screen z-50 px-6">
                    <NavLink to="/" icon={<Home size={18} />}>Home</NavLink>
                    <NavLink to="/about" icon={<Info size={18} />}>About</NavLink>
                    <NavLink to="/schemes" icon={<FileText size={18} />}>Schemes</NavLink>
                    <NavLink to="/recommendations" icon={<ShieldCheck size={18} />}>Suggests</NavLink>
                </div>
            )}
        </header>
    );
};

const NavLink = ({ to, children, icon }) => (
    <Link to={to} className="text-white hover:text-green-200 py-2 md:inline md:py-0 flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {children}
    </Link>
);

export default Header;