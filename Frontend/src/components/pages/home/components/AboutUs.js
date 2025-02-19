import { Info, Target, Users, Shield } from "lucide-react";

const AboutUs = () => {
    return (
        <section className="px-8 py-12 ">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
                <div className="max-w-4xl mx-auto text-center">
                    <Info size={48} className="text-[#74B83E] mx-auto mb-4" />
                    <p className="text-gray-600 mb-8 text-lg">
                        We are dedicated to bridging the gap between citizens and government schemes. Our mission is to provide easy
                        access to all government schemes, ensuring that every citizen can take advantage of the benefits they are
                        entitled to.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <Target className="text-[#74B83E] mx-auto mb-2" size={32} />
                            <h3 className="font-semibold mb-2">Our Mission</h3>
                            <p className="text-sm text-gray-600">
                                To empower citizens by providing comprehensive information about government schemes.
                            </p>
                        </div>
                        <div>
                            <Users className="text-[#74B83E] mx-auto mb-2" size={32} />
                            <h3 className="font-semibold mb-2">Who We Serve</h3>
                            <p className="text-sm text-gray-600">
                                All citizens looking to benefit from government initiatives and programs.
                            </p>
                        </div>
                        <div>
                            <Shield className="text-[#74B83E] mx-auto mb-2" size={32} />
                            <h3 className="font-semibold mb-2">Our Commitment</h3>
                            <p className="text-sm text-gray-600">
                                Providing accurate, up-to-date information and guidance on all available schemes.
                            </p>
                        </div>
                    </div>
                    <button className="bg-[#74B83E] text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-300">
                        Learn More About Us
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AboutUs

