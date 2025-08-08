import React from "react";
import { useSelector } from "react-redux";

export default function ProfilePage() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">My Profile</h1>
      {user ? (
        <div className="bg-white p-6 rounded-lg shadow-md space-y-2">
          <p className="text-lg">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      ) : (
        <p>Loading profile or not logged in.</p>
      )}
    </div>
  );
}
