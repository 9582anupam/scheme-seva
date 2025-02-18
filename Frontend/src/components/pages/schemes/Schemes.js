import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from 'lucide-react';
import SchemeSearch from "./SchemeSearch";
import SchemeCard from "../../common/schemeCard/SchemeCard";
import { getFilteredSchemes, getAllSchemes } from "../../../services/schemes/schemeService";

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
                        <SchemeCard 
                            key={scheme._id}
                            scheme={scheme}
                            onSchemeClick={handleSchemeClick}
                        />
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
