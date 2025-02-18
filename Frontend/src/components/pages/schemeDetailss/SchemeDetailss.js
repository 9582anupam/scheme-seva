import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getSchemeById, saveFavoriteSchemes, removeFavoriteSchemes, getFavoriteSchemes } from "../../../services/schemes/schemeService";
import { ArrowLeft, Target, List, FileText, Users, Building, Download, Share2, CalendarRange, Tag, Bookmark } from 'lucide-react';
import ChatBot from "../../common/chatbot/ChatBot";
import { generatePDF } from "../../../helper/generatePdf";
import { shareScheme } from "../../../helper/shareScheme";
import DisplayFormatted from "./DisplayFormatted";
import ReactMarkdown from 'react-markdown';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { toast } from "react-hot-toast";

const SchemeDetailss = () => {
    const { id } = useParams();
    // const navigate = useNavigate();
    const [scheme, setScheme] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const contentRef = useRef(null);
    const [expanded, setExpanded] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    // const [savedSchemes, setSavedSchemes] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    console.log();

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

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
                await removeFavoriteSchemes(id); // Use route param ID instead of scheme._id
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
                    <header className="border-b border-gray-100 pb-6">
                        <h1 className="text-4xl font-bold mb-3 text-gray-900">{scheme?.schemeName}</h1>
                        {scheme?.schemeShortTitle && (
                            <p className="text-gray-500 text-lg">({scheme.schemeShortTitle})</p>
                        )}
                    </header>

                    <section className="space-y-3">
                        <h2 className="text-xl font-semibold flex items-center text-gray-800">
                            <Tag className="mr-2 text-[#74B83E]" size={24} />
                            Tags
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {scheme?.tags?.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-1.5 bg-green-50 text-[#74B83E] rounded-full text-sm font-medium"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-semibold flex items-center text-gray-800">
                            <Target className="mr-2 text-[#74B83E]" size={24} />
                            Description
                        </h2>
                        <div className="prose max-w-none text-gray-600 bg-gray-50 rounded-xl p-6">
                            <ReactMarkdown>{scheme?.detailedDescription_md}</ReactMarkdown>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold flex items-center text-gray-800">
                            <FileText className="mr-2 text-[#74B83E]" size={24} />
                            How to Apply
                        </h2>
                        {scheme?.applicationProcess?.map((process, index) => (
                            <div key={index} className="bg-gray-50 rounded-xl p-6">
                                <h3 className="font-semibold text-gray-800 mb-3">{process?.mode}:</h3>
                                <DisplayFormatted benefitsData={process?.process} />
                            </div>
                        ))}
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-semibold flex items-center text-gray-800">
                            <Users className="mr-2 text-[#74B83E]" size={24} />
                            Eligibility
                        </h2>
                        <div className="prose max-w-none text-gray-600 bg-gray-50 rounded-xl p-6">
                            <ReactMarkdown>{scheme?.eligibilityDescription_md}</ReactMarkdown>
                        </div>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-semibold flex items-center text-gray-800">
                            <FileText className="mr-2 text-[#74B83E]" size={24} />
                            Required Documents
                        </h2>
                        <div className="bg-gray-50 rounded-xl p-6">
                            <DisplayFormatted benefitsData={scheme?.documents_required} />
                        </div>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-semibold flex items-center text-gray-800">
                            <List className="mr-2 text-[#74B83E]" size={24} />
                            Benefits
                        </h2>
                        <div className="bg-gray-50 rounded-xl p-6">
                            <DisplayFormatted benefitsData={scheme?.benefits} />
                        </div>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <section className="space-y-3">
                            <h2 className="text-xl font-semibold flex items-center text-gray-800">
                                <Building className="mr-2 text-[#74B83E]" size={24} />
                                Categories
                            </h2>
                            <div className="flex flex-wrap gap-2 bg-gray-50 rounded-xl p-6">
                                {scheme?.category?.map((category, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
                                    >
                                        {category}
                                    </span>
                                ))}
                            </div>
                        </section>

                        <section className="space-y-3">
                            <h2 className="text-xl font-semibold flex items-center text-gray-800">
                                <CalendarRange className="mr-2 text-[#74B83E]" size={24} />
                                Important Details
                            </h2>
                            <div className="space-y-2 bg-gray-50 rounded-xl p-6">
                                {scheme?.nodalMinistryName ? (
                                    <p className="text-gray-600">Ministry: <span className="font-medium text-gray-900">{scheme.nodalMinistryName}</span></p>
                                ) : (

                                    <p className="text-gray-600">State: <span className="font-medium text-gray-900">{scheme?.state}</span></p>
                                )}
                                {scheme?.level &&
                                    <p className="text-gray-600">Level: <span className="font-medium text-gray-900">{scheme?.level}</span></p>
                                }
                                {/* open and close date if exist */}
                                {scheme?.openDate && (
                                    <p className="text-gray-600">
                                        Open Date: <span className="font-medium text-gray-900">
                                            {formatDate(scheme.openDate)}
                                        </span>
                                    </p>
                                )}
                                {scheme?.closeDate && (
                                    <p className="text-gray-600">
                                        Close Date: <span className="font-medium text-gray-900">
                                            {formatDate(scheme.closeDate)}
                                        </span>
                                    </p>
                                )}

                            </div>
                        </section>
                    </div>

                    {scheme?.references?.length > 0 && (
                        <section className="space-y-3">
                            <h2 className="text-xl font-semibold mb-3">References</h2>
                            <div className="flex flex-wrap gap-3">
                                {scheme?.references?.map((ref, index) => (
                                    <a
                                        key={index}
                                        href={ref?.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 transition-colors duration-200 flex items-center gap-2"
                                    >
                                        <FileText size={18} />
                                        {ref?.title}
                                    </a>
                                ))}
                            </div>
                        </section>
                    )}

                    <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-100">
                        <button
                            onClick={handleSaveScheme}
                            disabled={isSaving}
                            className={`px-6 py-3 text-white rounded-lg flex items-center gap-2 transition-colors duration-200 shadow-sm ${
                                isSaving ? 'opacity-50 cursor-not-allowed' : ''
                            } ${
                                isSaved 
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

                    {/* faq accordion */}
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold flex items-center text-gray-800">
                            <List className="mr-2 text-[#74B83E]" size={24} />
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-3">
                            {scheme?.faqs?.map((faq, index) => (
                                <Accordion
                                    key={index}
                                    expanded={expanded === `panel${index}`}
                                    onChange={handleAccordionChange(`panel${index}`)}
                                    sx={{
                                        backgroundColor: 'rgb(249 250 251)',
                                        boxShadow: 'none',
                                        '&:before': {
                                            display: 'none',
                                        },
                                        borderRadius: '0.75rem !important',
                                        marginBottom: '0.75rem',
                                    }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon sx={{ color: '#74B83E' }} />}
                                        sx={{
                                            '& .MuiAccordionSummary-content': {
                                                margin: '12px 0',
                                            },
                                        }}
                                    >
                                        <span className="font-medium text-gray-900">{faq.question}</span>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <p className="text-gray-600">{faq.answer}</p>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </div>
                    </section>

                </div>

                {scheme && <ChatBot schemeId={scheme?._id} />}
            </div>
        </div>
    );
};

export default SchemeDetailss;