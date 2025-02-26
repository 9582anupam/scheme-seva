import { useState } from "react";
import { Search, BookOpen, Users, Coins, Calendar, Building2, MapPin, Filter, ChevronDown, X } from "lucide-react";

// Constants remain the same
const CATEGORIES = [
    "Women and Child",
    "Utility & Sanitation",
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
    "Ministry Of Culture",
    "Ministry Of Petroleum and Natural Gas",
    "Ministry Of Rural Development",
    "Ministry Of Housing & Urban Affairs",
    "Ministry Of Heavy Industries",
    "Ministry Of Health & Family Welfare",
    "Ministry Of Science And Technology",
    "Ministry Of Law and Justice",
    "Ministry Of Agriculture and Farmers Welfare",
    "Ministry Of Labour and Employment",
    "Ministry Of External Affairs",
    "Ministry Of Youth Affairs & Sports",
    "Ministry Of Micro, Small and Medium Enterprises",
    "Ministry Of Commerce And Industry",
    "Ministry Of Minority Affairs",
    "Ministry Of New and Renewable Energy",
    "Ministry Of Social Justice and Empowerment",
    "Ministry Of Finance",
    "Ministry Of Women and Child Development",
    "Ministry Of Jal Shakti",
    "Ministry Of Education",
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

    const [activeTab, setActiveTab] = useState('basic');

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

    const clearFilter = (filterName) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: "",
        }));
    };

    const SelectField = ({ label, name, value, onChange, options, icon: Icon }) => (
        <div className="relative">
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full p-2.5 pl-10 pr-12 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#74B83E] focus:border-transparent transition-all duration-200 appearance-none text-gray-700 focus:outline-none text-sm"
                style={{ maxWidth: '100%' }}
            >
                <option value="">Select {label}</option>
                {options.map(option => (
                    <option key={option} value={option} className="max-w-full text-ellipsis">
                        {option}
                    </option>
                ))}
            </select>
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
        </div>
    );

    const tabs = [
        { id: 'basic', label: 'Basic Filters', icon: Filter },
        { id: 'location', label: 'Location', icon: MapPin },
        { id: 'eligibility', label: 'Eligibility', icon: Users },
        { id: 'dates', label: 'Dates', icon: Calendar },
    ];

    return (
        <div className="bg-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Search Bar */}
                    <div className="relative max-w-3xl mx-auto">
                        <div className="flex items-center bg-white border-2 border-[#74B83E] rounded-xl overflow-hidden shadow-sm focus-within:shadow-md transition-shadow duration-200">
                            <input
                                type="text"
                                name="search"
                                placeholder="Search for government schemes..."
                                value={filters.search}
                                onChange={handleFilterChange}
                                className="flex-1 px-4 sm:py-3 text-base border-none focus:outline-none focus:ring-0 min-w-0"
                            />
                            <button
                                type="submit"
                                className="px-4 sm:px-6 py-3 bg-[#74B83E] text-white hover:bg-[#5a9230] transition-colors duration-200 flex items-center gap-2 flex-shrink-0"
                            >
                                <Search size={18} />
                                <span className="hidden sm:inline">Search</span>
                            </button>
                        </div>
                    </div>

                    {/* Active Filters */}
                    {Object.entries(filters).some(([_, value]) => value) && (
                        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(filters).map(([key, value]) => 
                                    value && (
                                        <div key={key} 
                                            className="flex items-center gap-1.5 bg-[#74B83E] bg-opacity-10 text-[#74B83E] px-2 py-0.5 rounded-md text-sm font-medium">
                                            {key}: {value}
                                            <button
                                                type="button"
                                                onClick={() => clearFilter(key)}
                                                className="hover:text-red-500 transition-colors"
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}

                    {/* Filter Tabs */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-[#74B83E]">
                        <div className="flex overflow-x-auto border-b border-gray-200">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-1.5 px-3 sm:px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors duration-200 flex-1
                                        ${activeTab === tab.id 
                                            ? 'text-[#74B83E] border-b-2 border-[#74B83E] bg-green-50' 
                                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                                >
                                    <tab.icon size={16} className="flex-shrink-0" />
                                    <span className="hidden sm:inline">{tab.label}</span>
                                </button>
                            ))}
                        </div>

                        <div className="p-4">
                            {activeTab === 'basic' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <SelectField
                                        label="Category"
                                        name="category"
                                        value={filters.category}
                                        onChange={handleFilterChange}
                                        options={CATEGORIES}
                                        icon={BookOpen}
                                    />
                                    <SelectField
                                        label="Ministry"
                                        name="nodalMinistryName"
                                        value={filters.nodalMinistryName}
                                        onChange={handleFilterChange}
                                        options={MINISTRIES}
                                        icon={Building2}
                                    />
                                </div>
                            )}

                            {activeTab === 'location' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <SelectField
                                        label="State"
                                        name="state"
                                        value={filters.state}
                                        onChange={handleFilterChange}
                                        options={STATES}
                                        icon={MapPin}
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
                            )}

                            {activeTab === 'eligibility' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                            )}

                            {activeTab === 'dates' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="relative">
                                        <input
                                            type="date"
                                            name="openDate"
                                            value={filters.openDate}
                                            onChange={handleFilterChange}
                                            className="w-full p-[.430rem] pl-10 pr-4 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#74B83E] focus:border-transparent transition-all duration-200"
                                            placeholder="Open Date"
                                        />
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            name="closeDate"
                                            value={filters.closeDate}
                                            onChange={handleFilterChange}
                                            className="w-full p-[.430rem] pl-10 pr-4 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#74B83E] focus:border-transparent transition-all duration-200"
                                            placeholder="Close Date"
                                        />
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SchemeSearch;