import React from 'react';
import { FileText } from 'lucide-react';
import DisplayFormatted from './DisplayFormatted';

const ApplicationSection = ({ applicationProcess }) => {
    return (
        <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center text-gray-800">
                <FileText className="mr-2 text-[#74B83E]" size={24} />
                How to Apply
            </h2>
            {applicationProcess?.map((process, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-800 mb-3">{process?.mode}:</h3>
                    <DisplayFormatted benefitsData={process?.process} />
                </div>
            ))}
        </section>
    );
};

export default ApplicationSection;
