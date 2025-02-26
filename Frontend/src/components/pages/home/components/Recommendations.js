import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { UserContext } from '../../../../context/UserContext';
import SchemeCard from '../../../common/schemeCard/SchemeCard';
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
                console.log(data.schemes);
                setRecommendations(data.schemes);
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
            <section className="bg-gray-100 py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-8 text-center">Personalized Recommendations</h2>
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                        <h3 className="text-2xl font-bold mb-4">Get Personalized Scheme Recommendations</h3>
                        <p className="text-xl mb-6">Create an account to receive scheme recommendations based on your profile</p>
                        <button
                            onClick={() => navigate('/signup')}
                            className="px-8 py-4 bg-[#74B83E] text-white font-bold text-xl rounded-lg hover:bg-[#629a33] transition-colors duration-200"
                        >
                            Sign Up Now →
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    if (loading) {
        return (
            <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#74B83E]"></div>
                <p className="mt-2 text-xl">Loading recommendations...</p>
            </div>
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
        <section className="bg-gray-100 py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold mb-8 text-center">Recommended for You</h2>
                {recommendations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recommendations.map((scheme) => (
                        <Link to={`/scheme/${scheme._id}`} key={scheme._id}>
                            <SchemeCard scheme={scheme} />
                        </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <Search size={48} className="text-gray-400 mx-auto mb-4" />
                        <p className="text-xl text-gray-600">
                            No recommendations found. Complete your profile to get personalized suggestions.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Recommendations;
