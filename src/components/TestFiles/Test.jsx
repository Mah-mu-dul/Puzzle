import React, { useEffect, useState } from "react";

const Test = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    interests: [],
    comments: "",
    subscription: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle checkbox inputs differently
    if (type === "checkbox") {
      const updatedInterests = checked
        ? [...formData.interests, value]
        : formData.interests.filter((interest) => interest !== value);

      setFormData((prev) => ({
        ...prev,
        interests: updatedInterests,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Subscription Plan:</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="subscription"
                value="free"
                checked={formData.subscription === "free"}
                onChange={handleChange}
                className="mr-2"
              />
              Free Plan
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="subscription"
                value="basic"
                checked={formData.subscription === "basic"}
                onChange={handleChange}
                className="mr-2"
              />
              Basic Plan ($9.99/month)
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="subscription"
                value="premium"
                checked={formData.subscription === "premium"}
                onChange={handleChange}
                className="mr-2"
              />
              Premium Plan ($19.99/month)
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Interests:</label>
          <div>
            <label className="mr-4">
              <input
                type="checkbox"
                name="interests"
                value="coding"
                onChange={handleChange}
                className="mr-2"
              />
              Coding
            </label>
            <label className="mr-4">
              <input
                type="checkbox"
                name="interests"
                value="reading"
                onChange={handleChange}
                className="mr-2"
              />
              Reading
            </label>
            <label>
              <input
                type="checkbox"
                name="interests"
                value="traveling"
                onChange={handleChange}
                className="mr-2"
              />
              Traveling
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Comments:</label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white"
            rows="4"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Test;
