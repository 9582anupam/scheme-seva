import { GraduationCap, Heart, Users, Briefcase, Home, Sprout, Book, Truck, Sun, Wifi, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const getHoverStyle = (bgColor) => {
    const styles = {
        'blue-500': 'hover:bg-blue-500',
        'red-500': 'hover:bg-red-500',
        'purple-500': 'hover:bg-purple-500',
        'yellow-500': 'hover:bg-yellow-500',
        'green-500': 'hover:bg-green-500',
        'lime-500': 'hover:bg-lime-500',
        'indigo-500': 'hover:bg-indigo-500',
        'orange-500': 'hover:bg-orange-500',
        'yellow-400': 'hover:bg-yellow-400',
        'blue-400': 'hover:bg-blue-400',
        'green-600': 'hover:bg-green-600',
    };
    return styles[bgColor] || '';
};

const CategoryCard = ({ icon: Icon, title, description, color }) => (
    <div className={`bg-white p-6 rounded-lg border border-gray-200 transition-all duration-300 cursor-pointer 
        ${getHoverStyle(color.bg)} group`}>
        <Icon
            size={48}
            className={`${color.text} mb-4 transition-colors duration-300 group-hover:text-white`}
        />
        <h3 className="text-xl font-semibold mb-2 text-gray-900 transition-colors duration-300 group-hover:text-white">
            {title}
        </h3>
        <p className="text-gray-600 transition-colors duration-300 group-hover:text-white/90">
            {description}
        </p>
    </div>
);

const Categories = () => {
    const navigate = useNavigate();
    const categories = [
        { icon: GraduationCap, title: "Education", description: "50+ schemes available", color: { text: "text-blue-500", bg: "blue-500" } },
        { icon: Heart, title: "Healthcare", description: "40+ schemes available", color: { text: "text-red-500", bg: "red-500" } },
        { icon: Users, title: "Women Empowerment", description: "30+ schemes available", color: { text: "text-purple-500", bg: "purple-500" } },
        { icon: Briefcase, title: "Employment", description: "45+ schemes available", color: { text: "text-yellow-500", bg: "yellow-500" } },
        { icon: Home, title: "Housing", description: "25+ schemes available", color: { text: "text-green-500", bg: "green-500" } },
        { icon: Sprout, title: "Agriculture", description: "35+ schemes available", color: { text: "text-lime-500", bg: "lime-500" } },
        { icon: Book, title: "Skill Development", description: "20+ schemes available", color: { text: "text-indigo-500", bg: "indigo-500" } },
        { icon: Truck, title: "Transportation", description: "15+ schemes available", color: { text: "text-orange-500", bg: "orange-500" } },
        { icon: Sun, title: "Energy", description: "10+ schemes available", color: { text: "text-yellow-400", bg: "yellow-400" } },
        { icon: Wifi, title: "Digital India", description: "25+ schemes available", color: { text: "text-blue-400", bg: "blue-400" } },
        { icon: Zap, title: "Rural Development", description: "30+ schemes available", color: { text: "text-green-600", bg: "green-600" } }
    ];

    return (
        <section className="py-12">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Browse by Category</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {categories.map((category, index) => (
                        <div key={index} onClick={() => navigate(`/schemes?cat=${category.title}`)}>
                            <CategoryCard {...category} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;

