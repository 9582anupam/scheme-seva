import { useState } from "react"
import { Search, BookOpen, Users, Coins } from "lucide-react"

const SchemeSearch = ({ onSearch }) => {
    const [filters, setFilters] = useState({
        tags: "",
        gender: "",
        age: "",
        incomeGroup: "",
    })

    const handleFilterChange = (e) => {
        const { name, value } = e.target
        setFilters((prev) => ({
        ...prev,
        [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSearch(filters)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-4">
            <label htmlFor="tags" className="block text-lg sm:text-2xl font-medium text-gray-700 mb-1 pl-1">
                Category
            </label>
            <div className="relative">
                <select
                id="tags"
                name="tags"
                value={filters.tags}
                onChange={handleFilterChange}
                className="block w-full pl-3 pr-10 py-2 text-base focus:outline-none focus:ring-[#74B83E] focus:border-[#74B83E] rounded-md border border-green-600"
                >
                <option value="">Select Category</option>
                <option value="education">Education</option>
                <option value="health">Healthcare</option>
                <option value="agriculture">Agriculture</option>
                </select>
                <BookOpen className="pointer-events-none absolute top-2 text-gray-400 right-8 w-7 h-7"/>
            </div>
            </div>

            <div className="space-y-4">
            <label htmlFor="gender" className="block text-lg sm:text-2xl font-medium text-gray-700 mb-1 pl-1">
                Gender
            </label>
            <div className="relative">
                <select
                id="gender"
                name="gender"
                value={filters.gender}
                onChange={handleFilterChange}
                className="block w-full pl-3 pr-10 py-2 text-base focus:outline-none focus:ring-[#74B83E] focus:border-[#74B83E] rounded-md border border-green-600"
                >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                </select>
                <Users className="pointer-events-none absolute top-2 text-gray-400 right-8 w-7 h-7" />
            </div>
            </div>

            <div className="space-y-4">
            <label htmlFor="age" className="block text-lg sm:text-2xl font-medium text-gray-700 mb-1 pl-1">
                Age Group
            </label>
            <div className="relative">
                <select
                id="age"
                name="age"
                value={filters.age}
                onChange={handleFilterChange}
                className="block w-full pl-3 pr-10 py-2 text-base focus:outline-none focus:ring-[#74B83E] focus:border-[#74B83E] rounded-md border border-green-600"
                >
                <option value="">Select Age Group</option>
                <option value="18">18+ years</option>
                <option value="30">30+ years</option>
                <option value="60">60+ years</option>
                <option value="all">All Ages</option>
                </select>
                <Users className="pointer-events-none absolute top-2 text-gray-400 right-8 w-7 h-7" />
            </div>
            </div>

            <div className="space-y-4">
            <label htmlFor="incomeGroup" className="block text-lg sm:text-2xl font-medium text-gray-700 mb-1 pl-1">
                Income Group
            </label>
            <div className="relative">
                <select
                id="incomeGroup"
                name="incomeGroup"
                value={filters.incomeGroup}
                onChange={handleFilterChange}
                className="block w-full pl-3 pr-10 py-2 text-base focus:outline-none focus:ring-[#74B83E] focus:border-[#74B83E] rounded-md border border-green-600"
                >
                <option value="">Select Income Group</option>
                <option value="EWS">EWS</option>
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                </select>
                <Coins className="pointer-events-none absolute top-2 text-gray-400 right-8 w-7 h-7" />
            </div>
            </div>
        </div>

        <div className="text-center">
            <button
            type="submit"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#74B83E] hover:bg-[#5a9230] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#74B83E] shadow-sm transition-colors duration-200"
            >
            <Search className="mr-2" size={20} />
            Search Schemes
            </button>
        </div>
        </form>
    )
}

export default SchemeSearch

