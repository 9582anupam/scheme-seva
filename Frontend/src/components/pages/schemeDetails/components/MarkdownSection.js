import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownSection = ({ title, content, icon: Icon }) => {
    return (
        <section className="space-y-3">
            <h2 className="text-xl font-semibold flex items-center text-gray-800">
                <Icon className="mr-2 text-[#74B83E]" size={24} />
                {title}
            </h2>
            <div className="prose max-w-none text-gray-600 bg-gray-50 rounded-xl p-6">
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
        </section>
    );
};

export default MarkdownSection;
