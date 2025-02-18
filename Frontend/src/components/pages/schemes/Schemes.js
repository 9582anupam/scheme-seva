import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SchemeSearch from "./SchemeSearch";
import { getFilteredSchemes } from "../../../services/schemes/schemeService";
import { Search } from 'lucide-react';
import { getAllSchemes } from "../../../services/schemes/schemeService";
import { ArrowRight } from 'lucide-react';
// import Markdown from "react-markdown";
const Schemes = () => {
    const navigate = useNavigate();
    const [schemes, setSchemes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getDefaultSchemes = async () => {
            const results = await getAllSchemes();
            setSchemes(results);
        };
        getDefaultSchemes();
    }, []);

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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {schemes.map((scheme) => (
                        <div
                            key={scheme._id}
                            className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                            <div className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#74B83E] transition-colors duration-300 line-clamp-2">
                                        {scheme.schemeName}
                                    </h2>
                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                                        {/* <Markdown> */}
                                            {scheme.detailedDescription_md}
                                        {/* </Markdown> */}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {scheme.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-green-50 text-[#74B83E] rounded-full text-xs font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <button
                                        onClick={() => handleSchemeClick(scheme._id)}
                                        className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        View Details
                                    </button>
                                    <button
                                        onClick={() => handleSchemeClick(scheme._id)}
                                        className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#74B83E] rounded-lg hover:bg-[#629a33] transition-colors duration-200 flex items-center justify-center gap-2 group"
                                    >
                                        Apply
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                                    </button>
                                </div>
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
    );
};

export default Schemes;
