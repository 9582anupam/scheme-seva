import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getSchemeById, saveFavoriteSchemes, removeFavoriteSchemes, getFavoriteSchemes } from "../../../services/schemes/schemeService";
import { ArrowLeft, Target, List, FileText, Users, Download, Share2, Bookmark } from 'lucide-react';
import ChatBot from "../../common/chatbot/ChatBot";
import { generatePDF } from "../../../helper/generatePdf";
import { shareScheme } from "../../../helper/shareScheme";
import DisplayFormatted from "./components/DisplayFormatted";
import DisplayMarkdown from './components/DisplayMarkdown';
import { toast } from "react-hot-toast";

const SchemeDetails = () => {
    const { id } = useParams();
    const [scheme, setScheme] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const contentRef = useRef(null);
    const [isSaved, setIsSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    const formatDate = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    useEffect(() => {
        const fetchSchemeDetails = async () => {
            try {
                const data = await getSchemeById(id);
                setScheme(data);
            } catch (err) {
                setError("Failed to fetch scheme details");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSchemeDetails();
    }, [id]);

    useEffect(() => {
        const checkIfSaved = async () => {
            try {
                const savedSchemes = await getFavoriteSchemes();
                const isSaved = savedSchemes.includes(id);
                setIsSaved(isSaved);
            } catch (error) {
                console.error('Error checking saved status:', error);
            }
        };

        if (id) {
            checkIfSaved();
        }
    }, [id]);

    const handleSaveScheme = async () => {
        if (isSaving) return;

        try {
            setIsSaving(true);
            if (isSaved) {
                await removeFavoriteSchemes(id);
                toast.success('Removed from favorites');
            } else {
                await saveFavoriteSchemes(id);
                toast.success('Added to favorites');
            }

            setIsSaved(!isSaved);
        } catch (error) {
            console.error('Error managing favorite:', error);
            toast.error('Please login to save schemes');
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return <div className="p-4 text-center">Loading...</div>;
    if (error) return <div className="p-4 text-red-500 text-center">{error}</div>;
    if (!scheme) return <div className="p-4 text-center">Scheme not found</div>;

    const tabs = [
        { id: 'overview', label: 'Overview', icon: Target },
        { id: 'eligibility', label: 'Eligibility', icon: Users },
        { id: 'benefits', label: 'Benefits', icon: List },
        { id: 'documents', label: 'Documents', icon: FileText },
        { id: 'apply', label: 'Apply', icon: FileText },
        { id: 'faq', label: 'FAQ', icon: List },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto p-6">
                <button
                    onClick={() => window.history.back()}
                    className="mb-8 px-4 py-2 text-gray-700 bg-white rounded-lg hover:bg-gray-50 flex items-center shadow-sm transition-all duration-200 group"
                >
                    <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" size={20} />
                    Back
                </button>

                <div ref={contentRef} className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
                    {/* Header Section */}
                    <header className="border-b border-gray-100 pb-6">
                        <h1 className="text-4xl font-bold mb-3 text-gray-900">{scheme?.schemeName}</h1>
                        {scheme?.schemeShortTitle && (
                            <p className="text-gray-500 text-lg">({scheme.schemeShortTitle})</p>
                        )}

                        {/* Tags */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            {scheme?.tags?.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-1.5 bg-green-50 text-[#74B83E] rounded-full text-sm font-medium"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Important Details */}
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4">
                            {scheme?.nodalMinistryName && (
                                <p className="text-gray-600">Ministry: <span className="font-medium text-gray-900">{scheme.nodalMinistryName}</span></p>
                            )}
                            {scheme?.state && (
                                <p className="text-gray-600">State: <span className="font-medium text-gray-900">{scheme.state}</span></p>
                            )}
                            {scheme?.level && (
                                <p className="text-gray-600">Level: <span className="font-medium text-gray-900">{scheme.level}</span></p>
                            )}
                            {scheme?.openDate && (
                                <p className="text-gray-600">Open Date: <span className="font-medium text-gray-900">{formatDate(scheme.openDate)}</span></p>
                            )}
                            {scheme?.closeDate && (
                                <p className="text-gray-600">Close Date: <span className="font-medium text-gray-900">{formatDate(scheme.closeDate)}</span></p>
                            )}
                        </div>
                    </header>

                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8 overflow-x-auto">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`
                                            flex items-center pb-4 px-1 border-b-2 font-medium text-sm
                                            ${activeTab === tab.id
                                                ? 'border-[#74B83E] text-[#74B83E]'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }
                                        `}
                                    >
                                        <Icon className="mr-2" size={20} />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="py-4">
                        {activeTab === 'overview' && (
                            <DisplayMarkdown content={scheme?.detailedDescription_md} />
                        )}

                        {activeTab === 'eligibility' && (
                            <DisplayMarkdown content={scheme?.eligibilityDescription_md} />
                        )}

                        {activeTab === 'benefits' && (
                            <div className="bg-gray-50 rounded-xl p-6">
                                <DisplayFormatted benefitsData={scheme?.benefits} />
                            </div>
                        )}

                        {activeTab === 'documents' && (
                            <div className="bg-gray-50 rounded-xl p-6">
                                <DisplayFormatted benefitsData={scheme?.documents_required} />
                            </div>
                        )}

                        {activeTab === 'apply' && (
                            <div className="space-y-4">
                                {scheme?.applicationProcess?.map((process, index) => (
                                    <div key={index} className="bg-gray-50 rounded-xl p-6">
                                        <h3 className="font-semibold text-gray-800 mb-3">{process?.mode}:</h3>
                                        <DisplayFormatted benefitsData={process?.process} />
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'faq' && scheme?.faqs?.length > 0 && (
                            <div className="space-y-4">
                                {scheme.faqs.map((faq, index) => (
                                    <div key={index} className="bg-gray-50 rounded-xl p-6">
                                        <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                                        <p className="text-gray-600">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
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
                            onClick={() => generatePDF(contentRef, scheme?.schemeName)}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors duration-200 shadow-sm"
                        >
                            <Download size={20} />
                            Download PDF
                        </button>
                        <button
                            onClick={() => shareScheme(scheme?.schemeName)}
                            className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 flex items-center gap-2 transition-colors duration-200 shadow-sm"
                        >
                            <Share2 size={20} />
                            Share
                        </button>
                    </div>
                </div>

                {scheme && <ChatBot schemeId={scheme?._id} />}
            </div>
        </div>
    );
};

export default SchemeDetails;