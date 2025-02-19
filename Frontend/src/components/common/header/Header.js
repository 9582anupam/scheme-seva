import React, { useState, useContext } from "react";
import { Menu, X, Home, Info, FileText, Mail, LogIn, LogOut } from 'lucide-react';
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import userAuthenticatedAxiosInstance from "../../../services/users/userAuthenticatedAxiosInstance";
import lionlogo from "../../../assets/lionsymbol.png";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isUserLoggedIn, setIsUserLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();
    
    const userAxiosInstance = userAuthenticatedAxiosInstance('/api/v1/users');

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
                <Link to="/contact" className="flex flex-col justify-center items-center text-white">
                    <Mail className="w-7 h-7" />
                    <p className="font-semibold">Contact</p>
                </Link>
            </nav>
            <div className="flex gap-4 items-center">
                <Link
                    to={isUserLoggedIn ? "#" : "/login"}
                    className="bg-white text-black rounded-md px-4 py-2 flex justify-center items-center cursor-pointer"
                    onClick={isUserLoggedIn ? handleLogout : null}
                >
                    {isUserLoggedIn ? <LogOut size={18} className="mr-2" /> : <LogIn size={18} className="mr-2" />}
                    <p>{isUserLoggedIn ? "Logout" : "Login"}</p>
                </Link>
                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)} name="Menu Button">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            {isOpen && (
                <div onClick={() => { setIsOpen(!isOpen); }} className="absolute top-20 left-0 right-0 bg-[#74B83E] md:hidden min-h-screen z-50 px-6">
                    <NavLink to="/" icon={<Home size={18} />}>Home</NavLink>
                    <NavLink to="/about" icon={<Info size={18} />}>About</NavLink>
                    <NavLink to="/schemes" icon={<FileText size={18} />}>Schemes</NavLink>
                    <NavLink to="/contact" icon={<Mail size={18} />}>Contact</NavLink>
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