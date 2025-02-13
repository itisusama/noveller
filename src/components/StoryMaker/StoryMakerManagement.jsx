import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";

const StoryMakerManagement = () => {
  const [storyName, setStoryName] = useState("");
  const [characters, setCharacters] = useState([]);
  const [locations, setLocations] = useState([]);
  const [stories, setStories] = useState([]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [showStoryBox, setShowStoryBox] = useState(false);
  const [editingStoryId, setEditingStoryId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const charCollection = collection(db, "characters");
      const graveCollection = collection(db, "character-graveyard");
      const locCollection = collection(db, "locations");
      const storiesCollection = collection(db, "stories");

      const charSnapshot = await getDocs(charCollection);
      const graveSnapshot = await getDocs(graveCollection);
      const locSnapshot = await getDocs(locCollection);
      const storiesSnapshot = await getDocs(storiesCollection);

      const charList = charSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const graveList = graveSnapshot.docs.map(doc => doc.data().realName);
      const locList = locSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const storiesList = storiesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setCharacters(charList.filter(char => !graveList.includes(char.realName)));
      setLocations(locList);
      setStories(storiesList);
    };

    fetchData();
  }, []);

  const handleCharacterSelection = (char) => {
    setSelectedCharacters((prev) =>
      prev.includes(char.id) ? prev.filter(id => id !== char.id) : [...prev, char.id]
    );
  };

  const handleLocationSelection = (loc) => {
    setSelectedLocations((prev) =>
      prev.includes(loc.id) ? prev.filter(id => id !== loc.id) : [...prev, loc.id]
    );
  };

  const createOrUpdateStory = async () => {
    if (!storyName.trim() || selectedCharacters.length === 0 || selectedLocations.length === 0) {
      alert("Please provide a story name and select at least one character and location.");
      return;
    }

    try {
      if (editingStoryId) {
        await updateDoc(doc(db, "stories", editingStoryId), {
          name: storyName,
          characters: selectedCharacters,
          locations: selectedLocations,
        });
        alert("Story updated successfully!");
      } else {
        await addDoc(collection(db, "stories"), {
          name: storyName,
          characters: selectedCharacters,
          locations: selectedLocations,
        });
        alert("Story created successfully!");
      }

      setStoryName("");
      setSelectedCharacters([]);
      setSelectedLocations([]);
      setShowStoryBox(false);
      setEditingStoryId(null);
    } catch (error) {
      console.error("Error saving story:", error);
    }
  };

  const editStory = (story) => {
    setStoryName(story.name);
    setSelectedCharacters(story.characters);
    setSelectedLocations(story.locations);
    setEditingStoryId(story.id);
    setShowStoryBox(true);
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
          onClick={() => setShowStoryBox(true)}
        >
          {editingStoryId ? "Update Story" : "Create Story"}
        </button>
      </div>

      {showStoryBox && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold">Select Characters</h2>
          <div className="flex flex-wrap gap-2">
            {characters.map((char) => (
              <button
                key={char.id}
                className={`p-2 border rounded ${
                  selectedCharacters.includes(char.id) ? 'bg-green-300' : ''
                }`}
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
                className={`p-2 border rounded ${
                  selectedLocations.includes(loc.id) ? 'bg-green-300' : ''
                }`}
                onClick={() => handleLocationSelection(loc)}
              >
                {loc.realName}
              </button>
            ))}
          </div>

          <button
            className="mt-4 p-2 bg-green-500 text-white rounded"
            onClick={createOrUpdateStory}
          >
            {editingStoryId ? "Update Story" : "Make Story"}
          </button>
        </div>
      )}

      <h2 className="text-lg font-bold mt-6">Your Stories</h2>
      <div className="bg-white p-4 rounded shadow">
        {stories.length === 0 ? (
          <p>No stories created yet.</p>
        ) : (
          stories.map((story) => (
            <div key={story.id} className="p-2 border-b flex justify-between items-center">
              <span>{story.name}</span>
              <button
                className="p-1 bg-yellow-400 text-white rounded"
                onClick={() => editStory(story)}
              >
                Edit
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StoryMakerManagement;
