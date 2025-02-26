import { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import { Search } from 'lucide-react';
import SchemeSearch from "./SchemeSearch";
import SchemeCard from "../../common/schemeCard/SchemeCard";
import { getFilteredSchemes, getAllSchemes } from '../../../services/schemes/schemeService';
import Pagination from '../../common/pagination/Pagination';

const Schemes = () => {
    const [schemes, setSchemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalSchemes, setTotalSchemes] = useState(0);
    const [filters, setFilters] = useState({});
    const [error, setError] = useState(null);

    const fetchSchemes = useCallback(async (page) => {
        try {
            setLoading(true);
            setError(null);
            let data;
            
            if (Object.keys(filters).length > 0) {
                data = await getFilteredSchemes(filters, page);
            } else {
                data = await getAllSchemes(page);
            }

            setSchemes(data.schemes);
            setTotalPages(data.totalPages);
            setCurrentPage(data.currentPage);
            setTotalSchemes(data.totalSchemes);
        } catch (error) {
            setError("Failed to fetch schemes. Please try again.");
            console.error('Error fetching schemes:', error);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchSchemes(currentPage);
    }, [currentPage, fetchSchemes]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const handleSearch = async (filters) => {
        setFilters(filters);
        setCurrentPage(1);
    };

    const schemesCountText = totalSchemes > 0 
        ? `Showing ${(currentPage-1)*9}-${currentPage*9} of ${totalSchemes} schemes`
        : '';

    return (
        <div className="bg-gray-100 min-h-screen">
            <section className="container mx-auto py-12">
                <h1 className="text-4xl font-bold pt-10 mb-8 text-center">Find Schemes for You</h1>
                <div className="bg-gray-200 rounded-lg shadow-md sm:px-6 sm:py-10 mb-8">
                    <SchemeSearch onSearch={handleSearch} />
                </div>

                {!loading && schemesCountText && (
                    <p className="text-gray-600 mb-4">{schemesCountText}</p>
                )}

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
                        <Link
                            to={`/scheme/${scheme._id}`}
                            key={scheme._id}
                        >

                            <SchemeCard
                                key={scheme._id}
                                scheme={scheme}
                            />
                        </Link>
                    ))}
                </div>

                {!loading && schemes.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}

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
