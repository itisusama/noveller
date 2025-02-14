import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const AddInfoManagement = () => {
  const [showCharacterPopup, setShowCharacterPopup] = useState(false);
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [locations, setlocations] = useState([]);

  const [character, setCharacter] = useState({
    realName: "",
    nickName: "",
    role: "",
  });


  const handleChange = (e) => {
    setCharacter({ ...character, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!character.realName || !character.nickName || !character.role) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true)
      await addDoc(collection(db, "characters"), {
        realName: character.realName,
        nickName: character.nickName,
        role: character.role,
      });
      alert("Character added successfully!");
      setCharacter({ realName: "", nickName: "", role: "" });
    } catch (error) {
      console.error("Error adding character: ", error);
      alert("Failed to add character");
    } finally {
        setLoading(false);
    }
  };

  const [location, setLocation] = useState({
    realNameLocation: "",
    nickNameLocation: "",
    roleLocation: "",
  });


  const handleChangeLocation = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  const handleSubmitLocation = async (e) => {
    e.preventDefault();
    if (!location.realNameLocation || !location.nickNameLocation || !location.roleLocation) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true)
      await addDoc(collection(db, "locations"), {
        realName: location.realNameLocation,
        nickName: location.nickNameLocation,
        role: location.roleLocation,
      });
      alert("Location added successfully!");
      setLocation({ realNameLocation: "", nickNameLocation: "", roleLocation: "" });
    } catch (error) {
      console.error("Error adding Location: ", error);
      alert("Failed to add Location");
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCollection = async (collectionName, setData) => {
      const querySnapshot = await getDocs(collectionName);
      const mapData = querySnapshot.docs.map(doc => doc.data());
      setData(mapData);
    };
  
    let characterCollection = collection(db, "characters");
  
    fetchCollection(characterCollection, setCharacters);
  
  }, []);
  

  return (
    <div className="flex flex-col h-screen p-6">
      <div className="space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
          onClick={() => setShowCharacterPopup(true)}
        >
          Add Characters
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
          onClick={() => setShowLocationPopup(true)}
        >
          Add Locations
        </button>
      </div>

      {/* Character Popup */}
      {showCharacterPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-lg font-semibold mb-4">Add Characters</h2>
            
            <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Real Name</label>
          <input
            type="text"
            name="realName"
            value={character.realName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter real name"
          />
        </div>
        <div>
          <label className="block text-gray-700">Nickname</label>
          <input
            type="text"
            name="nickName"
            value={character.nickName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter nickname"
          />
        </div>
        <div>
          <label className="block text-gray-700">Role</label>
          <input
            type="text"
            name="role"
            value={character.role}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter role"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Character" }
        </button>
      </form>
    </div>
            
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
              onClick={() => setShowCharacterPopup(false)}
            >
              X
            </button>
          </div>
        </div>
      )}

      {/* Location Popup */}
      {showLocationPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
          <h2 className="text-lg font-semibold mb-4">Add Location</h2>
          
          <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
    <form onSubmit={handleSubmitLocation} className="space-y-4">
      <div>
        <label className="block text-gray-700">Real Name Location</label>
        <input
          type="text"
          name="realNameLocation"
          value={location.realNameLocation}
          onChange={handleChangeLocation}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter real name"
        />
      </div>
      <div>
        <label className="block text-gray-700">Nickname Location</label>
        <input
          type="text"
          name="nickNameLocation"
          value={location.nickNameLocation}
          onChange={handleChangeLocation}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter nickname"
        />
      </div>
      <div>
        <label className="block text-gray-700">Role Location</label>
        <input
          type="text"
          name="roleLocation"
          value={location.roleLocation}
          onChange={handleChangeLocation}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter role"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Location" }
      </button>
    </form>
  </div>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
              onClick={() => setShowLocationPopup(false)}
            >
              X
            </button>
          </div>
        </div>
      )}

      <section className="grid grid-cols-2">
      
      <div>
      <h1 className="font-bold text-2xl">Chatacters</h1>
      {characters.map((character, index) => (
        <p key={index}>{character.realName}</p>
      ))}
      </div>
      
      <div>
        New Data
      </div>
      </section>

    </div>
  );
};

export default AddInfoManagement;
