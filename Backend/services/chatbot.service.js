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
        
        Basic Information:
        - Name: ${scheme.schemeName}
        - Short Title: ${scheme.schemeShortTitle}
        - Level: ${scheme.level}
        - State: ${scheme.state || 'Not specified'}
        - Ministry: ${scheme.nodalMinistryName?.label || 'Not specified'}
        
        Timeline:
        - Open Date: ${scheme.openDate ? new Date(scheme.openDate).toLocaleDateString() : 'Not specified'}
        - Close Date: ${scheme.closeDate ? new Date(scheme.closeDate).toLocaleDateString() : 'Not specified'}
        
        Categories and Tags:
        - Categories: ${scheme.schemeCategory?.join(', ')}
        - Tags: ${scheme.tags?.join(', ')}
        
        Detailed Information:
        - Description: ${scheme.detailedDescription_md}
        - Eligibility Criteria: ${scheme.eligibilityDescription_md}
        
        Application Process:
        ${scheme.applicationProcess?.map(process => `
            Mode: ${process.mode}
            Process: ${JSON.stringify(process.process)}
        `).join('\n')}
        
        Required Documents:
        ${scheme.documents_required?.map(doc => JSON.stringify(doc)).join('\n')}
        
        Benefits:
        ${scheme.benefits?.map(benefit => JSON.stringify(benefit)).join('\n')}
        
        References:
        ${scheme.references?.map(ref => `- ${ref.title}: ${ref.url}`).join('\n')}
        
        FAQs:
        ${scheme.faqs?.map(faq => `Q: ${faq.question}\nA: ${faq.answer}`).join('\n')}

        User Question: ${question}

        Please provide a clear, concise, and helpful response about this scheme.
        If the question is about eligibility, reference the specific criteria.
        If the question is about application process, provide step-by-step guidance.
        If the question is about documents, list the specific requirements.
        If the question is about benefits, explain them clearly.
        If the question is about deadlines, mention both open and close dates if available.

        Important: 
        1. Respond in ${language === 'hi' ? 'Hindi' : language === 'pa' ? 'Punjabi' : 'English'} language
        2. Keep the response focused and relevant to the question
        3. If information is not available, clearly state that
        4. For dates, mention if they are current or past
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Error generating chatbot response:', error);
        return "I apologize, but I'm having trouble processing your question. Please try asking in a different way or contact support for assistance.";
    }
};
