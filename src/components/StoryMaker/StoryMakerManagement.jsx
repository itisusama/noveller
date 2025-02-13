import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

const StoryMakerManagement = () => {
  const [storyName, setStoryName] = useState("");
  const [characters, setCharacters] = useState([]);
  const [graveyard, setGraveyard] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [showStoryBox, setShowStoryBox] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const charCollection = collection(db, "characters");
      const graveCollection = collection(db, "character-graveyard");
      const locCollection = collection(db, "locations");
  
      const charSnapshot = await getDocs(charCollection);
      const graveSnapshot = await getDocs(graveCollection);
      const locSnapshot = await getDocs(locCollection);
  
      const charList = charSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const graveList = graveSnapshot.docs.map(doc => doc.data().realName); // Extract realNames
      const locList = locSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
      console.log("Characters from Firestore:", charList);
      console.log("Character Graveyard:", graveList);
  
      // Exclude characters whose realName is in graveList
      const filteredCharacters = charList.filter(char => !graveList.includes(char.realName));
  
      setCharacters(filteredCharacters);
      setLocations(locList);
    };
  
    fetchData();
  }, []);  

  const handleCharacterSelection = (char) => {
    setSelectedCharacters((prev) =>
      prev.includes(char) ? prev.filter(c => c !== char) : [...prev, char]
    );
  };

  const handleLocationSelection = (loc) => {
    setSelectedLocations((prev) =>
      prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]
    );
  };

  const createStoryBox = () => {
    if (storyName.trim() !== "") {
      setShowStoryBox(true);
    }
  };

  const saveStory = async () => {
    if (!storyName.trim() || selectedCharacters.length === 0 || selectedLocations.length === 0) {
      alert("Please provide a story name and select at least one character and location.");
      return;
    }

    try {
      await addDoc(collection(db, "stories"), {
        name: storyName,
        characters: selectedCharacters,
        locations: selectedLocations
      });
      alert("Story created successfully!");
      setStoryName("");
      setSelectedCharacters([]);
      setSelectedLocations([]);
      setShowStoryBox(false);
    } catch (error) {
      console.error("Error creating story:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-y-auto p-6 bg-gray-100">
      <div className="mb-4">
        <input
          type="text"
          className="p-2 border rounded w-full"
          placeholder="Enter Story Name"
          value={storyName}
          onChange={(e) => setStoryName(e.target.value)}
        />
        <button
          className="mt-2 p-2 bg-blue-500 text-white rounded"
          onClick={createStoryBox}
        >
          Create Story
        </button>
      </div>

      {showStoryBox && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold">Select Characters</h2>
          <div className="flex flex-wrap gap-2">
            {characters.filter(char => !graveyard.includes(char.id)).map((char) => (
              <button
                key={char.id}
                className={`p-2 border rounded ${selectedCharacters.includes(char) ? 'bg-green-300' : ''}`}
                onClick={() => handleCharacterSelection(char)}
              >
                {char.realName}
              </button>
            ))}
          </div>

          <h2 className="text-lg font-bold mt-4">Select Locations</h2>
          <div className="flex flex-wrap gap-2">
            {locations.map((loc) => (
              <button
                key={loc.id}
                className={`p-2 border rounded ${selectedLocations.includes(loc) ? 'bg-green-300' : ''}`}
                onClick={() => handleLocationSelection(loc)}
              >
                {loc.realName}
              </button>
            ))}
          </div>

          <button
            className="mt-4 p-2 bg-green-500 text-white rounded"
            onClick={saveStory}
          >
            Make Story
          </button>
        </div>
      )}
    </div>
  );
};

export default StoryMakerManagement;
