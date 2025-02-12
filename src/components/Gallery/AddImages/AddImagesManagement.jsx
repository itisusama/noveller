import React, { useState } from "react";
import { Client, Storage } from "appwrite";
import { db } from "../../../config/firebase";
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Change if using self-hosted Appwrite
  .setProject("67acd8ab002061939f7d");

const storage = new Storage(client);

const AddImagesManagement = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageTitle, setImageTitle] = useState(""); // State for image title
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setImageTitle(event.target.value);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file || !imageTitle) return alert("Please enter a title and select a file!");

    try {
      setLoading(true);
      // Upload file to Appwrite storage
      const response = await storage.createFile(
        "67acd98e000f1bb7a628", // Bucket ID
        "unique()", // Unique file ID
        file
      );

      // Generate public file preview URL
      const fileId = response.$id;
      const previewUrl = storage.getFilePreview("67acd98e000f1bb7a628", fileId);
      setImageUrl(previewUrl);

      // Save title and imageUrl in Firestore
      await addDoc(collection(db, "gallery-images"), {
        imageTitle: imageTitle,
        imageUrl: previewUrl,
        createdAt: new Date() // Store timestamp
      });

      alert("Image uploaded and saved successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed! Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Image</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Image Title</label>
            <input 
              type="text" 
              className="mt-1 p-2 w-full border rounded-md" 
              placeholder="Enter the title" 
              value={imageTitle} 
              onChange={handleTitleChange} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image File</label>
            <input 
              type="file" 
              onChange={handleFileChange} 
              className="mt-1 p-2 w-full border rounded-md" 
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600" disabled={loading}>
            { loading ? "uploading..." : "Upload" }
          </button>
        </form>

        {imageUrl && (
          <div className="mt-4">
            <h3 className="text-lg font-medium">Uploaded Image</h3>
            <p className="text-sm mt-2 text-gray-600">
              Image URL: <a href={imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">{imageUrl}</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddImagesManagement;
