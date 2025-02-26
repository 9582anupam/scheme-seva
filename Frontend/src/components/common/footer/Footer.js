// import logo from "../../../utils/images/footer/logo.svg";
// import location from "../../../utils/images/footer/location.svg";
import headphones from "../../../utils/images/footer/headphones.svg";
import mail from "../../../utils/images/footer/mail.svg";
import instagram from "../../../utils/images/footer/instagram.png";
import facebook from "../../../utils/images/footer/facebook.png";
import youtube from "../../../utils/images/footer/youtube.png";
import x from "../../../utils/images/footer/twitter.png";
import { Link } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import "./footer.css";

const Footer = () => {
    const quickLinks = [
        "about",
        "contact",
        "privacy policy",
        "terms & conditions",
        "account",
    ];
    const categories = [
        "Explore",
        "New Schemes",
        "Education",
        "Health",
        "Agriculture",
    ];
    const socialMedia = [facebook, x, instagram, youtube];

    return (
        <footer className="flex flex-col font-raleway ">
            <div className="flex bg-white justify-center py-8">
                <div className="flex flex-wrap gap-6 px-6 md:w-11/12 lg:w-10/12 justify-between">
                    <div className="flex flex-col gap-2">
                        {/* <img src={logo} alt="logo" />
                        <div className="flex gap-2">
                            <img
                                src={location}
                                alt="location"
                                className="w-6 h-6"
                            />
                            <p className="leading-5 font-medium">
                                <span className="font-bold">Address: </span>Shop
                                No. 10, lorem ipsum,
                                <br /> opp. to lorem, ipsum, Delhi 946254
                            </p>
                        </div> */}
                        <div className="flex gap-2">
                            {/* headphones img */}
                            <img src={headphones} alt="headphones" />
                            <p className="font-medium">
                                <span className="font-bold">Phone: </span>+91
                                1234567890
                            </p>
                        </div>
                        <div className="flex gap-2">
                            {/* mail img */}
                            <img src={mail} alt="mail" />
                            <p className="font-medium">
                                <span className="font-bold">Email: </span>
                                9582anupamk@gmail.com
                            </p>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-3xl mb-3">Quick Links</h3>
                        <div className="flex flex-col gap-1">
                            {quickLinks.map((link, index) => (
                                <p
                                    key={index}
                                    className="text-lg font-medium cursor-pointer w-fit">
                                    {link}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-3xl mb-3">Categories</h3>
                        <div className="flex flex-col gap-1">
                            {categories.map((category, index) => (
                                <p
                                    key={index}
                                    className="text-lg font-medium cursor-pointer w-fit">
                                    {category}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-3xl mb-3">Connect</h3>
                        <div className="flex gap-2 cursor-pointer">
                            {socialMedia.map((icon, index) => (
                                <div key={index}>
                                    <img
                                        src={icon}
                                        alt={index}
                                        className="w-8"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#000] w-full flex justify-center items-center flex-col">
                <p className="text-white mt-2 font-poppins font-medium text-xl">
                    &copy; 2025 SchemeSeva. All rights reserved.
                </p>
                <Link
                    to="https://www.linkedin.com/in/9582anupam"
                    className="flex items-center gap-2 mb-2">
                    <p className="font-mono font-bold text-xl py-1">
                        <span className="shiny-text text-[#FF0000]">
                            Developed by @9582anupam
                        </span>
                        {/* white color icon */}
                        <OpenInNewIcon className="w-6 h-6 text-white ml-1 " />
                    </p>
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
