"use client";

import React, { useState, useEffect } from "react";
import {
    User,
    Mail,
    Phone,
    Heart,
    DollarSign,
    MapPin,
    Calendar,
    Edit2,
    Save,
    X,
    Star,
    Shield,
} from "lucide-react";
import { getUserProfile, updateUserProfile } from "../../../services/users/user";
import { toast } from "react-hot-toast";

// Constants matching the user model
const INCOME_GROUPS = ["EWS", "General", "OBC", "SC", "ST"];

const STATES = [
    "Andaman and Nicobar Islands", "Arunachal Pradesh", "Assam", "Bihar",
    "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
    "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
    "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Delhi", "Puducherry"
];

const INTERESTS = [
    "Women and Child",
    "Utility & Sanitation",
    "Travel & Tourism",
    "Transport & Infrastructure Sports & Culture",
    "Sports & Culture",
    "Sports & Culture",
    "Social welfare & Empowerment",
    "Skills & Employment",
    "Science, IT & Communications",
    "Public Safety,Law & Justice",
    "Housing & Shelter",
    "Health & Wellness",
    "Education & Learning",
    "Business & Entrepreneurship",
    "Banking, Financial Services and Insurance",
    "Agriculture,Rural & Environment"
];

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        interests: [],
        incomeGroup: "",
        state: "",
        age: "",
        gender: "",
        role: "",
        favorites: [],
    });

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getUserProfile();
                if (response.success) {
                    setUserData(response.data);
                    console.log(response.data);
                } else {
                    toast.error("Failed to fetch profile data");
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
                toast.error(error.response?.data?.message || "Error fetching profile");
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleInterestsChange = (interest) => {
        setUserData((prev) => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter((i) => i !== interest)
                : [...prev.interests, interest],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateUserProfile(userData);
            if (response.success) {
                toast.success("Profile updated successfully");
                setIsEditing(false);
            } else {
                toast.error("Failed to update profile");
            }
        } catch (error) {
            console.error("Failed to update profile:", error);
            toast.error(error.response?.data?.message || "Error updating profile");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 min-h-[calc(100svh-4rem)]">
            <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center text-[#74B83E] hover:text-[#629a33] transition-colors"
                        >
                            <Edit2 className="w-4 h-4 mr-2" />
                            Edit Profile
                        </button>
                    ) : null}
                </div>

                {!isEditing ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ProfileItem icon={<User />} label="Name" value={userData.name} />
                        <ProfileItem icon={<Mail />} label="Email" value={userData.email} />
                        <ProfileItem
                            icon={<Phone />}
                            label="Phone"
                            value={userData.phoneNumber}
                        />
                        <ProfileItem icon={<Calendar />} label="Age" value={userData.age} />
                        <ProfileItem
                            icon={<User />}
                            label="Gender"
                            value={
                                userData.gender &&
                                userData.gender?.charAt(0).toUpperCase() +
                                userData.gender?.slice(1)
                            }
                        />
                        <ProfileItem icon={<MapPin />} label="State" value={userData.state} />
                        <ProfileItem
                            icon={<Heart />}
                            label="Interests"
                            value={userData.interests.join(", ")}
                        />
                        <ProfileItem
                            icon={<DollarSign />}
                            label="Income Group"
                            value={userData.incomeGroup}
                        />
                        <ProfileItem icon={<Shield />} label="Role" value={userData.role} />
                        <ProfileItem
                            icon={<Star />}
                            label="Favorites"
                            value={`${userData.favorites.length} schemes`}
                        />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                                icon={<User />}
                                label="Name"
                                name="name"
                                value={userData.name}
                                onChange={handleChange}
                                required
                            />
                            <InputField
                                icon={<Phone />}
                                label="Phone Number"
                                name="phoneNumber"
                                value={userData.phoneNumber}
                                onChange={handleChange}
                                pattern="[0-9]{10}"
                                title="Please enter a valid 10-digit phone number"
                            />
                            <InputField
                                icon={<Calendar />}
                                label="Age"
                                name="age"
                                type="number"
                                min="18"
                                max="100"
                                value={userData.age}
                                onChange={handleChange}
                            />
                            <SelectField
                                icon={<User />}
                                label="Gender"
                                name="gender"
                                value={userData.gender}
                                onChange={handleChange}
                                options={[
                                    { value: "male", label: "Male" },
                                    { value: "female", label: "Female" },
                                    { value: "other", label: "Other" },
                                ]}
                            />
                            <SelectField
                                icon={<MapPin />}
                                label="State"
                                name="state"
                                value={userData.state}
                                onChange={handleChange}
                                options={STATES.map((state) => ({
                                    value: state,
                                    label: state,
                                }))}
                            />
                            <SelectField
                                icon={<DollarSign />}
                                label="Income Group"
                                name="incomeGroup"
                                value={userData.incomeGroup}
                                onChange={handleChange}
                                options={INCOME_GROUPS.map((group) => ({
                                    value: group,
                                    label: group,
                                }))}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Interests
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {INTERESTS.map((interest) => (
                                    <button
                                        key={interest}
                                        type="button"
                                        onClick={() => handleInterestsChange(interest)}
                                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${userData.interests.includes(interest)
                                            ? "bg-[#74B83E] text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            }`}
                                    >
                                        {interest}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4 pt-6">
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
                            >
                                <X className="w-4 h-4 mr-2" />
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-white bg-[#74B83E] rounded-lg hover:bg-[#629a33] transition-colors flex items-center"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

const ProfileItem = ({ icon, label, value }) => (
    <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
        <div className="text-gray-600">{icon}</div>
        <div>
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="text-sm font-semibold text-gray-800">{value}</p>
        </div>
    </div>
);

const InputField = ({
    icon,
    label,
    name,
    value,
    onChange,
    type = "text",
    required = false,
    pattern,
    title,
}) => (
    <div className="flex items-center space-x-2">
        <div className="text-gray-600">{icon}</div>
        <div className="flex-grow">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                pattern={pattern}
                title={title}
                className="mt-1 block outline-1 border border-1 w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
        </div>
    </div>
);

const SelectField = ({ icon, label, name, value, onChange, options }) => (
    <div className="flex items-center space-x-2">
        <div className="text-gray-600">{icon}</div>
        <div className="flex-grow">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2 w-full"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    </div>
);

export default Profile;
