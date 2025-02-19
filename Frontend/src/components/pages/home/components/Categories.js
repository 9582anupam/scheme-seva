import { GraduationCap, Heart, Users, Briefcase, Home, Sprout, Book, Truck, Sun, Wifi, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ icon: Icon, title, description, color }) => (

    <div className="bg-white p-6 rounded-lg shadow-md  hover:shadow-[#74B83E] transition duration-300 cursor-pointer border border-gray-300">
        <Icon size={48} className={`${color} mb-4`} />
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 hidden group-hover:block">{description}</p>
    </div>
);


const Categories = () => {
    const navigate = useNavigate();
    const categories = [
        { icon: GraduationCap, title: "Education", description: "50+ schemes available", color: "text-blue-500" },
        { icon: Heart, title: "Healthcare", description: "40+ schemes available", color: "text-red-500" },
        { icon: Users, title: "Women Empowerment", description: "30+ schemes available", color: "text-purple-500" },
        { icon: Briefcase, title: "Employment", description: "45+ schemes available", color: "text-yellow-500" },
        { icon: Home, title: "Housing", description: "25+ schemes available", color: "text-green-500" },
        { icon: Sprout, title: "Agriculture", description: "35+ schemes available", color: "text-lime-500" },
        { icon: Book, title: "Skill Development", description: "20+ schemes available", color: "text-indigo-500" },
        { icon: Truck, title: "Transportation", description: "15+ schemes available", color: "text-orange-500" },
        { icon: Sun, title: "Energy", description: "10+ schemes available", color: "text-yellow-400" },
        { icon: Wifi, title: "Digital India", description: "25+ schemes available", color: "text-blue-400" },
        { icon: Zap, title: "Rural Development", description: "30+ schemes available", color: "text-green-600" },
    ];

    return (
        <section className="py-12">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Browse by Category</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {categories.map((category, index) => (
                        <div key={index} onClick={() => navigate(`/schemes?cat=${category.title}`)}>
                            <CategoryCard key={index} {...category} />
                            <h1>{category.description}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories

