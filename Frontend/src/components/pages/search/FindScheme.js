import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SchemeSearch from "../../../components/common/SchemeSearch/SchemeSearch";
import { getFilteredSchemes } from "../../../services/schemes/schemeService";
import { Search } from 'lucide-react';
import { getAllSchemes } from "../../../services/schemes/schemeService";
const FindScheme = () => {
    const navigate = useNavigate();
    const [schemes, setSchemes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const getDefaultSchemes = async() => {
            const results = await getAllSchemes();
            setSchemes(results);
        }
        getDefaultSchemes();
    },[])

    const handleSearch = async (filters) => {
        try {
            setLoading(true);
            setError(null);
            const results = await getFilteredSchemes(filters);
            setSchemes(results);
        } catch (err) {
            setError("Failed to fetch schemes. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSchemeClick = (schemeId) => {
        console.log(schemeId);
        
        navigate(`/scheme/${schemeId}`);
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <section className="container mx-auto py-12">
                <h1 className="text-4xl font-bold pt-10 mb-8 text-center">Find Schemes for You</h1>
                <div className="bg-green-100 rounded-lg shadow-md px-6 py-10 mb-8">
                    <SchemeSearch onSearch={handleSearch} />
                </div>

                {loading && (
                    <div className="text-center py-8">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#74B83E]"></div>
                        <p className="mt-2 text-xl">Loading schemes...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8" role="alert">
                        <p>{error}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {schemes.map((scheme) => (
                        <div 
                            key={scheme._id} 
                            className="bg-white border-2 border-gray-400 rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => handleSchemeClick(scheme._id)}
                        >
                            <h2 className="text-xl font-bold mb-2 text-[#74B83E]">{scheme.title}</h2>
                            <p className="text-gray-600 mb-4">{scheme.objective}</p>
                            <div className="flex justify-start gap-6 items-center mb-5">
                                <button className="px-2 py-1 rounded-sm border-2 border-[#74B83E] cursor-pointer text-xl bg-gray-100 text-gray-700 hover:bg-gray-200">
                                    View Details
                                </button>
                                <button className="px-3 py-1 rounded-sm text-white bg-[#74B83E] text-xl cursor-pointer hover:bg-[#629a33] border border-[#629a33]">
                                    Apply
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {scheme.tags.map((tag, index) => (
                                    <span 
                                        key={index}
                                        className="px-3 py-1 bg-green-200 text-gray-500 rounded-full text-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {schemes.length === 0 && !loading && (
                    <div className="text-center py-8">
                        <Search size={48} className="text-gray-400 mx-auto mb-4" />
                        <p className="text-xl text-gray-600">
                            No schemes found. Try adjusting your search filters.
                        </p>
                    </div>
                )}
            </section>
        </div>
    )
}

export default FindScheme
