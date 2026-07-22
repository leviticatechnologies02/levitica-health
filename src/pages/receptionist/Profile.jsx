import React, { useState } from "react";
const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Leela",
    employeeId: "REC001",
    role: "Receptionist",
    email: "leela@hospital.com",
    mobile: "9876543210",
    department: "Reception",
  });

  const [edit, setEdit] = useState(false);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow-md">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Receptionist Profile
          </h1>
          <p className="mt-2 text-gray-500">
            View and update your profile information.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={profile.name}
              disabled={!edit}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-2 outline-none transition ${
                edit
                  ? "border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  : "cursor-not-allowed border-gray-300 bg-gray-100"
              }`}
            />
          </div>

          {/* Employee ID */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Employee ID
            </label>
            <input
              type="text"
              value={profile.employeeId}
              disabled
              className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 px-4 py-2"
            />
          </div>

          {/* Role */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Role
            </label>
            <input
              type="text"
              value={profile.role}
              disabled
              className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 px-4 py-2"
            />
          </div>

          {/* Department */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Department
            </label>
            <input
              type="text"
              value={profile.department}
              disabled
              className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 px-4 py-2"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={profile.email}
              disabled={!edit}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-2 outline-none transition ${
                edit
                  ? "border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  : "cursor-not-allowed border-gray-300 bg-gray-100"
              }`}
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Mobile
            </label>
            <input
              type="text"
              name="mobile"
              value={profile.mobile}
              disabled={!edit}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-2 outline-none transition ${
                edit
                  ? "border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  : "cursor-not-allowed border-gray-300 bg-gray-100"
              }`}
            />
          </div>
        </div>

        <button
          onClick={() => setEdit(!edit)}
          className={`mt-8 rounded-lg px-6 py-3 font-semibold text-white transition ${
            edit
              ? "bg-green-600 hover:bg-green-700"
              : "bg-[#f95e09] hover:bg-[#f95e09]/90"
          }`}
        >
          {edit ? "Save Profile" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

export default Profile;