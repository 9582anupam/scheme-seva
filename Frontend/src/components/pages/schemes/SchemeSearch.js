import { useState } from "react";
import { Search, BookOpen, Users, Coins, Calendar, Building2, MapPin, Filter, ChevronDown } from "lucide-react";

// Constants for select options
const CATEGORIES = [
    "Women and Child Utility & Sanitation",
    "Travel & Tourism",
    "Transport & Infrastructure Sports & Culture",
    "Social welfare & Empowerment",
    "Skills & Employment",
    "Science, IT & Communications",
    "Public Safety,Law & Justice",
    "Housing & Shelter",
    "Health & Wellness",
    "Education & Learning",
    "Business & Entrepreneurship",
    "Banking, Financial Services and Insurance",
    "Agriculture,Rural & Environment"
];

const MINISTRIES = [
    "Ministry of Culture",
    "Ministry of Petroleum and Natural Gas",
    "Ministry of Rural Development",
    "Ministry of Housing & Urban Affairs",
    "Ministry of Heavy Industries",
    "Ministry of Health & Family Welfare",
    "Ministry of Science And Technology",
    "Ministry of Law and Justice",
    "Ministry of Agriculture and Farmers Welfare",
    "Ministry of Labour and Employment",
    "Ministry of External Affairs",
    "Ministry Of Youth Affairs & Sports",
    "Ministry Of Micro, Small and Medium Enterprises",
    "Ministry of Commerce And Industry",
    "Ministry of Minority Affairs",
    "Ministry Of New and Renewable Energy",
    "Ministry Of Social Justice and Empowerment",
    "Ministry of Finance",
    "Ministry of Women and Child Development",
    "Ministry of Jal Shakti",
    "Ministry of Education",
    "Ministry Of Skill Development And Entrepreneurship"
];

const STATES = [
    "Andaman and Nicobar Islands", "Arunachal Pradesh", "Assam", "Bihar",
    "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
    "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
    "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Delhi", "Puducherry"
];

const LEVELS = ["State/ UT", "Central", "State"];

const SchemeSearch = ({ onSearch }) => {
    const [filters, setFilters] = useState({
        search: "",
        schemeName: "",
        openDate: "",
        closeDate: "",
        state: "",
        nodalMinistryName: "",
        level: "",
        category: "",
        gender: "",
        incomeGroup: "",
    });

    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(filters);
    };

    const SelectField = ({ label, name, value, onChange, options, icon: Icon }) => (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="relative">
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full p-3 pl-4 pr-12 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#74B83E] focus:border-transparent transition-all duration-200 appearance-none text-gray-700"
                >
                    <option value="">Select {label}</option>
                    {options.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none text-gray-400">
                    <Icon size={18} />
                    <ChevronDown size={16} />
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Hero search section */}
                <div className="relative max-w-3xl mx-auto">
                    <div className="absolute inset-0 bg-[#74B83E] blur-3xl opacity-5 rounded-full"></div>
                    <div className="relative">
                        <div className="flex items-center bg-white border-2 border-[#74B83E] rounded-2xl overflow-hidden shadow-sm focus-within:shadow-lg transition-shadow duration-300">
                            <input
                                type="text"
                                name="search"
                                placeholder="Search for government schemes..."
                                value={filters.search}
                                onChange={handleFilterChange}
                                className="flex-1 px-6 py-4 text-lg border-none focus:outline-none focus:ring-0"
                            />
                            <button
                                type="submit"
                                className="px-8 py-5  bg-[#74B83E] text-white hover:bg-[#5a9230] transition-colors duration-200 flex items-center gap-2 cursor-pointer"
                            >
                                <Search size={20} />
                                <span className="hidden sm:inline">Search</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Advanced filters toggle */}
                <div className="text-center">
                    <button
                        type="button"
                        onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                    >
                        <Filter size={20} />
                        {showAdvancedFilters ? "Hide Advanced Filters" : "Show Advanced Filters"}
                        <ChevronDown
                            size={16}
                            className={`transform transition-transform duration-200 ${showAdvancedFilters ? 'rotate-180' : ''}`}
                        />
                    </button>
                </div>

                {/* Advanced filters */}
                <div className={`transition-all duration-300 ease-in-out space-y-8 ${showAdvancedFilters ? 'opacity-100' : 'opacity-0 hidden'}`}>
                    {/* Location and Ministry section */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900">Location & Administration</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <SelectField
                                label="State"
                                name="state"
                                value={filters.state}
                                onChange={handleFilterChange}
                                options={STATES}
                                icon={MapPin}
                            />
                            <SelectField
                                label="Ministry"
                                name="nodalMinistryName"
                                value={filters.nodalMinistryName}
                                onChange={handleFilterChange}
                                options={MINISTRIES}
                                icon={Building2}
                            />
                            <SelectField
                                label="Level"
                                name="level"
                                value={filters.level}
                                onChange={handleFilterChange}
                                options={LEVELS}
                                icon={Filter}
                            />
                        </div>
                    </div>

                    {/* Categories and Eligibility section */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900">Categories & Eligibility</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <SelectField
                                label="Category"
                                name="category"
                                value={filters.category}
                                onChange={handleFilterChange}
                                options={CATEGORIES}
                                icon={BookOpen}
                            />
                            <SelectField
                                label="Gender"
                                name="gender"
                                value={filters.gender}
                                onChange={handleFilterChange}
                                options={["Male", "Female", "Other"]}
                                icon={Users}
                            />
                            <SelectField
                                label="Income Group"
                                name="incomeGroup"
                                value={filters.incomeGroup}
                                onChange={handleFilterChange}
                                options={["EWS", "General", "OBC", "SC", "ST"]}
                                icon={Coins}
                            />
                        </div>
                    </div>

                    {/* Date Range section */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900">Date Range</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Open Date
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        name="openDate"
                                        value={filters.openDate}
                                        onChange={handleFilterChange}
                                        className="w-full p-3 pl-4 pr-12 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#74B83E] focus:border-transparent transition-all duration-200"
                                    />
                                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Close Date
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        name="closeDate"
                                        value={filters.closeDate}
                                        onChange={handleFilterChange}
                                        className="w-full p-3 pl-4 pr-12 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#74B83E] focus:border-transparent transition-all duration-200"
                                    />
                                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SchemeSearch;