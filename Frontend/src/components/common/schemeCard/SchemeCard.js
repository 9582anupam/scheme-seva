import { ArrowRight } from 'lucide-react';

const SchemeCard = ({ scheme, onSchemeClick }) => {
    return (
        <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
            <div className="p-6 space-y-4">
                {/* Title and Description */}
                <div className="space-y-2">
                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-[#74B83E] transition-colors duration-300 line-clamp-2">
                        {scheme.schemeName}
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                        {scheme.detailedDescription_md}
                    </p>
                </div>

                {/* Tags with improved styling */}
                <div className="flex flex-wrap gap-2">
                    {scheme.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-green-50 text-[#74B83E] rounded-full text-xs font-medium hover:bg-green-100 transition-colors duration-200">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Action Buttons with enhanced styling */}
                <div className="flex gap-3 pt-2">
                    <button
                        onClick={() => onSchemeClick(scheme._id)}
                        className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 border border-gray-200"
                    >
                        View Details
                    </button>
                    <button
                        onClick={() => onSchemeClick(scheme._id)}
                        className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-[#74B83E] rounded-lg hover:bg-[#629a33] transition-colors duration-200 flex items-center justify-center gap-2 group shadow-sm"
                    >
                        Apply Now
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SchemeCard;