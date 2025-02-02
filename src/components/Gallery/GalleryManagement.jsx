import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../config/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';

const GalleryManagement = () => {
  const [titles, setTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'gallery-images'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Trim titles to remove whitespace and deduplicate
      const uniqueTitles = [...new Set(data.map(item => item.imageTitle.trim()))];
      setTitles(uniqueTitles);
    });
    return () => unsubscribe();
  }, []);

  const handleTitleClick = (title) => {
    setSelectedTitle(title);
    const q = query(collection(db, 'gallery-images'));
    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        // Compare trimmed titles to group all variants
        .filter(item => item.imageTitle.trim() === title);
      setImages(data);
    });
  };

  return (
    <div className="min-h-screen overflow-x-auto bg-gray-50 p-4">
      <h1 className="text-xl font-semibold mb-4">Gallery</h1>
      <Link to="/add-images" className="mb-4 inline-block bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Add Images</Link>
      <div className="mt-4">
        <div className="flex flex-wrap gap-2 mt-2">
          {titles.map((title, index) => (
            <button
              key={index}
              onClick={() => handleTitleClick(title)}
              className="bg-gray-200 p-2 rounded-md cursor-pointer hover:bg-gray-300"
            >
              {title}
            </button>
          ))}
        </div>
      </div>
      {selectedTitle && (
        <div className="mt-6">
          <div className="grid grid-cols-3 gap-4 mt-2">
            {images.map((image) => (
              <img key={image.id} src={image.imageUrl} alt={image.imageTitle} className="w-full h-40 object-cover rounded-md cursor-pointer" onClick={() => setSelectedImage(image.imageUrl)}/>
            ))}
          </div>
        </div>
      )}
      {/* Full-screen Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full Screen"
            className="max-w-full max-h-full rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default GalleryManagement;