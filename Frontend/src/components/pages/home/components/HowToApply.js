import { UserPlus, Search, CheckSquare } from "lucide-react";

const StepCard = ({ icon: Icon, title, description }) => (
    <div className="flex flex-col items-center text-center">
        <Icon size={48} className="text-[#74B83E] mb-4" />
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const HowToApply = () => {
    return (
        <section className=" px-8 py-12 bg-gray-100">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">How to Apply</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StepCard
                        icon={UserPlus}
                        title="Enter Details"
                        description="Start by entering your details to find relevant schemes"
                    />
                    <StepCard icon={Search} title="Search" description="Our search engine helps you find the relevant schemes" />
                    <StepCard
                        icon={CheckSquare}
                        title="Select and Apply"
                        description="Choose the schemes you're eligible for and apply online"
                    />
                </div>
            </div>
        </section>
    );
};

export default HowToApply

