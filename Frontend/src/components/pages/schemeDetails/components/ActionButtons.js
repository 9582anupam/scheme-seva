import React from 'react';
import { Download, Share2, Bookmark } from 'lucide-react';
import { generatePDF } from "../../../../helper/generatePdf";
import { shareScheme } from "../../../../helper/shareScheme";

const ActionButtons = ({
    handleSaveScheme,
    isSaving,
    isSaved,
    contentRef,
    schemeName
}) => {
    return (
        <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-100">
            <button
                onClick={handleSaveScheme}
                disabled={isSaving}
                className={`px-6 py-3 text-white rounded-lg flex items-center gap-2 transition-colors duration-200 shadow-sm ${isSaving ? 'opacity-50 cursor-not-allowed' : ''
                    } ${isSaved
                        ? 'bg-[#74B83E] hover:bg-[#629a33]'
                        : 'bg-gray-600 hover:bg-gray-700'
                    }`}
            >
                <Bookmark
                    className={`${isSaved ? 'fill-white' : ''} ${isSaving ? 'animate-pulse' : ''}`}
                    size={20}
                />
                {isSaving ? 'Processing...' : isSaved ? 'Saved' : 'Save'}
            </button>

            <button
                onClick={() => generatePDF(contentRef, schemeName)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors duration-200 shadow-sm"
            >
                <Download size={20} />
                Download PDF
            </button>

            <button
                onClick={() => shareScheme(schemeName)}
                className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 flex items-center gap-2 transition-colors duration-200 shadow-sm"
            >
                <Share2 size={20} />
                Share
            </button>
        </div>
    );
};

export default ActionButtons;
