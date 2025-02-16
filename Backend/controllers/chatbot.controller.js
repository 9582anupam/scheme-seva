import { generateSchemeResponse } from "../services/chatbot.service.js";
import Scheme from "../models/scheme.model.js";

export const getSchemeResponse = async (req, res) => {
    try {
        const { schemeId, question, language = 'en' } = req.body;

        if (!schemeId || !question) {
            return res.status(400).json({ 
                message: 'Scheme ID and question are required' 
            });
        }

        const scheme = await Scheme.findById(schemeId);
        if (!scheme) {
            return res.status(404).json({ 
                message: 'Scheme not found' 
            });
        }

        const response = await generateSchemeResponse(scheme, question, language);
        res.status(200).json({ response });
    } catch (error) {
        console.error('Error in chatbot response:', error);
        res.status(500).json({ 
            message: 'Error generating response' 
        });
    }
};
