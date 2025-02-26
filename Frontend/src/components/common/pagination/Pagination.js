import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // Calculate page range to show
    const getPageRange = () => {
        const pageRange = 2; // Show 2 pages on each side of current page
        let start = Math.max(1, currentPage - pageRange);
        let end = Math.min(totalPages, currentPage + pageRange);

        // Adjust range if at edges
        if (currentPage <= pageRange) {
            end = Math.min(totalPages, 5);
        }
        if (currentPage > totalPages - pageRange) {
            start = Math.max(1, totalPages - 4);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const pages = getPageRange();

    return (
        <div className="flex items-center justify-center space-x-2 py-10">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
                <ChevronLeft size={20} />
            </button>
            
            <div className="flex space-x-1">
                {currentPage > 3 && (
                    <>
                        <button
                            onClick={() => onPageChange(1)}
                            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                        >
                            1
                        </button>
                        {currentPage > 4 && (
                            <span className="px-4 py-2">...</span>
                        )}
                    </>
                )}

                {pages.map(page => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-4 py-2 rounded-lg ${
                            currentPage === page
                                ? 'bg-[#74B83E] text-white'
                                : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        {page}
                    </button>
                ))}

                {currentPage < totalPages - 2 && (
                    <>
                        {currentPage < totalPages - 3 && (
                            <span className="px-4 py-2">...</span>
                        )}
                        <button
                            onClick={() => onPageChange(totalPages)}
                            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                        >
                            {totalPages}
                        </button>
                    </>
                )}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
};

export default Pagination;
