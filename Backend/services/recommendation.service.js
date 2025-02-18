import Schemev2 from "../models/schemev2.model.js";
import User from "../models/user.model.js";

export const generateRecommendations = async (userId) => {
    try {
        const userProfile = await User.findById(userId);
        if (!userProfile) {
            throw new Error('User not found');
        }

        // Build the query
        const query = {
            $and: [
                // Match state
                { state: userProfile.state }
            ]
        };

        // Add Category-interests matching if user has interests
        if (userProfile.interests && userProfile.interests.length > 0) {
            query.$and.push({
                Category: {
                    $elemMatch: {
                        $in: userProfile.interests
                    }
                }
            });
        }

        console.log('Query:', JSON.stringify(query, null, 2));

        let recommendations = await Schemev2.find(query);

        // If no recommendations found, fall back to basic matching
        if (!recommendations.length) {
            recommendations = await Schemev2.find({
                state: userProfile.state
            }).limit(6);
        }

        console.log(`Found ${recommendations.length} recommendations`);
        return recommendations;

    } catch (error) {
        console.error('Error generating recommendations:', error.stack);
        throw new Error('Could not generate recommendations: ' + error.message);
    }
};
