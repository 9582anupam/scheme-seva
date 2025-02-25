import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import SchemeCard from '../../common/schemeCard/SchemeCard';
import { getPersonalizedRecommendations } from '../../../services/recommendations/recommendationService';

const Recommendations = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const data = await getPersonalizedRecommendations();
                console.log(data.data.schemes);
                setRecommendations(data.data.schemes);
            } catch (error) {
                console.error('Failed to fetch recommendations:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    const handleSchemeClick = (schemeId) => {
        navigate(`/scheme/${schemeId}`);
    };

    if (loading) {
        return (
            <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#74B83E]"></div>
                <p className="mt-2 text-xl">Loading recommendations...</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <section className="container mx-auto py-12">
                <h1 className="text-4xl font-bold pt-10 mb-8 text-center">Recommended Schemes for You</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recommendations.map((scheme) => (
                        <SchemeCard
                            key={scheme._id}
                            scheme={scheme}
                            onSchemeClick={handleSchemeClick}
                        />
                    ))}
                </div>

                {recommendations.length === 0 && (
                    <div className="text-center py-8">
                        <Search size={48} className="text-gray-400 mx-auto mb-4" />
                        <p className="text-xl text-gray-600">
                            No recommendations found. Please update your profile preferences.
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Recommendations;
