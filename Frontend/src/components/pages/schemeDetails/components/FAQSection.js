import React from 'react';
import { List } from 'lucide-react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQSection = ({ faqs, expanded, handleAccordionChange }) => {
    return (
        <section className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center text-gray-800">
                <List className="mr-2 text-[#74B83E]" size={24} />
                Frequently Asked Questions
            </h2>
            <div className="space-y-3">
                {faqs?.map((faq, index) => (
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
    );
};

export default FAQSection;
