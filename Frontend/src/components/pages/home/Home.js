
import AboutUs from "./components/AboutUs";
import Categories from "./components/Categories";
import FAQ from "./components/FAQ";
import HeroSection from "./components/HeroSection";
import HowToApply from "./components/HowToApply";
import TotalSchemes from "./components/TotalSchemes";
import "./home.css";

const Home = () => {
    return (
        <div className="">
            <div className="w-full">
                <HeroSection/>
                <TotalSchemes/>
                <Categories/>
                <HowToApply/>
                <AboutUs/>
                <FAQ/>
            </div>
        </div>
    );
};

export default Home;
