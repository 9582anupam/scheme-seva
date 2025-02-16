import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPersonalizedRecommendations } from '../../../services/recommendations/recommendationService';

const Recommendations = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const data = await getPersonalizedRecommendations();
                setRecommendations(data);
            } catch (error) {
                console.error('Failed to fetch recommendations:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    if (loading) return <div>Loading recommendations...</div>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-4xl font-bold mb-8">Your Recommended Schemes</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map(scheme => (
                    <div 
                        key={scheme._id}
                        className="neu-card p-6 cursor-pointer"
                        onClick={() => navigate(`/scheme/${scheme._id}`)}
                    >
                        <h2 className="text-xl font-bold mb-2">{scheme.title}</h2>
                        <p className="mb-4">{scheme.objective}</p>
                        <div className="flex flex-wrap gap-2">
                            {scheme.tags.map((tag, idx) => (
                                <span 
                                    key={idx}
                                    className="px-3 py-1 bg-violet-200 border-2 border-black rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recommendations;
