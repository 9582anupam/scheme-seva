import { generateRecommendations } from "../services/recommendation.service.js";
import User from "../models/user.model.js";

export const getPersonalizedRecommendations = async (req, res) => {
    try {
        const userId = req.user._id;

        const recommendations = await generateRecommendations(userId);

        res.status(200).json(recommendations);
    } catch (error) {
        console.error('Error getting recommendations:', error);
        res.status(500).json({ message: 'Error getting recommendations' });
    }
};
