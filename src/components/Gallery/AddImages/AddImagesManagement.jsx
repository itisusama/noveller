import React, { useState } from "react";
import { db } from "../../../config/firebase";
import { collection, addDoc } from "firebase/firestore";

const AddImagesManagement = () => {
  const [imageTitle, setImageTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageTitle || !imageUrl) {
      alert("Both fields are required");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "gallery-images"), {
        imageTitle,
        imageUrl,
        createdAt: new Date()
      });
      setImageTitle("");
      setImageUrl("");
      alert("Image added successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error adding image");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center bg-white p-4">
      <div className="bg-white p-6 rounded-lg w-full">
        <h2 className="text-xl font-semibold mb-4">Add Image</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={imageTitle}
              onChange={(e) => setImageTitle(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter image title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter image URL"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            {loading ? "Adding..." : "Add Image"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddImagesManagement;
