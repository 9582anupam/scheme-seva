import { generateRecommendations } from "../services/recommendation.service.js";
import User from "../models/user.model.js";

export const getPersonalizedRecommendations = async (req, res) => {
    try {
        console.log("getPersonalizedRecommendations");
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        

        const recommendations = await generateRecommendations({
            age: user.age,
            gender: user.gender,
            incomeGroup: user.incomeGroup,
            interests: user.interests
        });

        res.status(200).json(recommendations);
    } catch (error) {
        console.error('Error getting recommendations:', error);
        res.status(500).json({ message: 'Error getting recommendations' });
    }
};
