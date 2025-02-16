import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateSchemeResponse = async (scheme, question, language = 'en') => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        // Create a context-aware prompt with language instruction
        const prompt = `
        Given this government scheme:
        Title: ${scheme.title}
        Objective: ${scheme.objective}
        Key Features: ${scheme.keyFeatures.join(', ')}
        Eligibility: Income Groups - ${scheme.category.incomeGroup.join(', ')}, Gender - ${scheme.category.gender.join(', ')}
        How to Apply: Online - ${scheme.howToApply.online}, Offline - ${scheme.howToApply.offline}
        Required Documents: ${scheme.documentsRequired.join(', ')}

        User Question: ${question}

        Please provide a clear, concise, and helpful response about this scheme.
        If the question is about eligibility, reference the specific criteria.
        If the question is about application process, provide step-by-step guidance.
        If the question is about documents, list the specific requirements.

        Important: Respond in ${language === 'hi' ? 'Hindi' : language === 'pa' ? 'Punjabi' : 'English'} language.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Error generating chatbot response:', error);
        return "I apologize, but I'm having trouble processing your question. Please try asking in a different way or contact support for assistance.";
    }
};
