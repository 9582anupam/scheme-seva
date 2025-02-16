import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../../context/UserContext';
import { getPersonalizedRecommendations } from '../../../../services/recommendations/recommendationService';

const Recommendations = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { isUserLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecommendations = async () => {
            if (!isUserLoggedIn) return;
            
            try {
                setLoading(true);
                const data = await getPersonalizedRecommendations();
                setRecommendations(data);
            } catch (err) {
                setError("Failed to fetch recommendations");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, [isUserLoggedIn]);

    if (!isUserLoggedIn) {
        return (
            <section className="neu-section mx-4 my-20 max-w-7xl md:mx-auto bg-white">
                <h2 className="text-4xl font-bold mb-8">Personalized Recommendations</h2>
                <div className="neu-card p-8 text-center">
                    <h3 className="text-2xl font-bold mb-4">Get Personalized Scheme Recommendations</h3>
                    <p className="text-xl mb-6">Create an account to receive scheme recommendations based on your profile</p>
                    <button 
                        onClick={() => navigate('/signup')}
                        className="neu-button px-8 py-4 bg-violet-200 font-bold text-xl hover:bg-violet-300"
                    >
                        Sign Up Now →
                    </button>
                </div>
            </section>
        );
    }

    if (loading) {
        return (
            <section className="neu-section mx-4 my-20 max-w-7xl md:mx-auto bg-white">
                <h2 className="text-4xl font-bold mb-8">Your Recommendations</h2>
                <div className="neu-card p-6">
                    <p className="text-xl text-center">Loading your personalized recommendations...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="neu-section mx-4 my-20 max-w-7xl md:mx-auto bg-white">
                <h2 className="text-4xl font-bold mb-8">Your Recommendations</h2>
                <div className="neu-card p-6 border-red-500">
                    <p className="text-xl text-red-500 text-center">{error}</p>
                </div>
            </section>
        );
    }

    return (
        <section className="neu-section mx-4 my-20 max-w-7xl md:mx-auto bg-white">
            <h2 className="text-4xl font-bold mb-8">Recommended for You</h2>
            {recommendations.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recommendations.map((scheme) => (
                        <div 
                            key={scheme._id} 
                            className="neu-card p-6 cursor-pointer hover:translate-x-1 hover:-translate-y-1 transition-transform bg-white"
                            onClick={() => navigate(`/scheme/${scheme._id}`)}
                        >
                            <h3 className="text-xl font-bold mb-2">{scheme.title}</h3>
                            <p className="text-gray-700 mb-4">{scheme.objective}</p>
                            <div className="flex flex-wrap gap-2">
                                {scheme.tags.map((tag, index) => (
                                    <span 
                                        key={index}
                                        className="px-3 py-1 bg-violet-200 border-2 border-black rounded-full text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="neu-card p-6 text-center">
                    <p className="text-xl">No recommendations found. Complete your profile to get personalized suggestions.</p>
                </div>
            )}
        </section>
    );
};

export default Recommendations;
