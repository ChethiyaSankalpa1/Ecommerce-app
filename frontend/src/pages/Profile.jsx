import React, { useState, useEffect, useRef } from "react";

const Profile = () => {
  // Replace this with real API call to fetch user data
  const fetchUserData = () => ({
    name: "Jane Doe",
    email: "janedoe@example.com",
    phone: "123-456-7890",
    address: "123 Fashion St, Style City",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
  });

  const [user, setUser] = useState(fetchUserData());
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(user);
  const [isChanged, setIsChanged] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setFormData(user);
    setIsChanged(false);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      setIsChanged(Object.keys(user).some((key) => user[key] !== updated[key]));
      return updated;
    });
  };

  // Handle avatar file input and preview
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview locally using FileReader
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => {
        const updated = { ...prev, avatarUrl: reader.result };
        setIsChanged(true);
        return updated;
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setUser(formData);
    setEditMode(false);
    setIsChanged(false);

    alert("Profile updated successfully!");

    // TODO: send formData and avatar file (if changed) to backend here
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-10">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">My Profile</h1>

      <div className="flex flex-col items-center mb-10">
        <div className="relative">
          <img
            src={formData.avatarUrl}
            alt="User Avatar"
            className="w-36 h-36 rounded-full object-cover border-4 border-orange-500 mb-4"
          />
          {editMode && (
            <button
              onClick={() => fileInputRef.current.click()}
              type="button"
              className="absolute bottom-0 right-0 bg-transparent text-gray-700 p-2 rounded-full shadow-lg transition hover:bg-gray-200"
              title="Change Profile Picture"
            >
              ✏️
            </button>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleAvatarChange}
          />
        </div>
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="bg-orange-600 text-white px-6 py-3 rounded-lg shadow hover:bg-orange-700 transition"
          >
            Edit Profile
          </button>
        ) : (
          <p className="text-gray-600 italic">You can now edit your info below.</p>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isChanged) handleSave();
        }}
        className="space-y-6"
      >
        {[
          { label: "Name", type: "text", name: "name" },
          { label: "Email", type: "email", name: "email" },
          { label: "Phone", type: "tel", name: "phone" },
        ].map(({ label, type, name }) => (
          <div key={name}>
            <label htmlFor={name} className="block font-semibold text-gray-700 mb-1">
              {label}
            </label>
            {editMode ? (
              <input
                id={name}
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            ) : (
              <p className="text-gray-800">{user[name]}</p>
            )}
          </div>
        ))}

        <div>
          <label htmlFor="address" className="block font-semibold text-gray-700 mb-1">
            Address
          </label>
          {editMode ? (
            <textarea
              id="address"
              name="address"
              rows={3}
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          ) : (
            <p className="text-gray-800">{user.address}</p>
          )}
        </div>

        {editMode && (
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                setFormData(user);
                setEditMode(false);
                setIsChanged(false);
              }}
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isChanged}
              className={`px-6 py-2 rounded-md text-white ${
                isChanged ? "bg-orange-600 hover:bg-orange-700" : "bg-orange-300 cursor-not-allowed"
              } transition`}
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;
