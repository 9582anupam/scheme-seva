import Schemev2 from "../models/schemev2.model.js";
import User from "../models/user.model.js";

export const generateRecommendations = async (userId, options) => {
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

        // Use proper pagination options
        const paginationOptions = {
            page: options.page || 1,
            limit: options.limit || 9,
            sort: { createdAt: -1 },
            lean: true,
            select: 'schemeName schemeShortTitle state level nodalMinistryName Category tags'
        };

        let recommendations = await Schemev2.paginate(query, paginationOptions);

        // If no recommendations found with filters, try without filters
        if (!recommendations.docs.length) {
            const fallbackQuery = {};
            recommendations = await Schemev2.paginate(fallbackQuery, paginationOptions);
        }

        return {
            schemes: recommendations.docs,
            totalPages: recommendations.totalPages,
            currentPage: recommendations.page,
            totalSchemes: recommendations.totalDocs,
            hasNextPage: recommendations.hasNextPage,
            hasPrevPage: recommendations.hasPrevPage
        };

    } catch (error) {
        console.error('Error generating recommendations:', error.stack);
        throw new Error('Could not generate recommendations: ' + error.message);
    }
};
