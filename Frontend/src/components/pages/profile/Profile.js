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
} from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    phn: "",
    interest: [],
    incomeGroup: "",
    name: "",
    state: "",
    age: 0,
    gender: "",
    favourites: [],
  });

  useEffect(() => {
    const data = {
      email: "email@.email.com",
      phn: "5464563",
      interest: ["healthCare", "education"],
      incomeGroup: "obc",
      name: "Abc",
      state: "delhi",
      age: 21,
      gender: "female",
      favourites: ["id1", "id2", "id3"],
    };
    setUserData(data);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated User Data:", userData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg flex  flex-col  items-center">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Profile
          </button>
        )}
      </div>

      {!isEditing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProfileItem icon={<User />} label="Name" value={userData.name} />
          <ProfileItem icon={<Calendar />} label="Age" value={userData.age} />
          <ProfileItem icon={<User />} label="Gender" value={userData.gender} />
          <ProfileItem icon={<MapPin />} label="State" value={userData.state} />
          <ProfileItem icon={<Mail />} label="Email" value={userData.email} />
          <ProfileItem icon={<Phone />} label="Phone" value={userData.phn} />
          <ProfileItem
            icon={<Heart />}
            label="Interests"
            value={userData.interest.join(", ")}
          />
          <ProfileItem
            icon={<DollarSign />}
            label="Income Group"
            value={userData.incomeGroup}
          />
          <ProfileItem
            icon={<Star />}
            label="Favourites"
            value={userData.favourites.join(", ")}
          />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            icon={<User />}
            label="Name"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
          <InputField
            icon={<Calendar />}
            label="Age"
            name="age"
            value={userData.age}
            onChange={handleChange}
            type="number"
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
            options={[
              { value: "delhi", label: "Delhi" },
              { value: "maharashtra", label: "Maharashtra" },
              { value: "tamil nadu", label: "Tamil Nadu" },
              { value: "karnataka", label: "Karnataka" },
              { value: "uttar pradesh", label: "Uttar Pradesh" },
            ]}
          />
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 flex items-center"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </button>
          </div>
        </form>
      )}
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

const InputField = ({ icon, label, name, value, onChange, type = "text" }) => (
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
