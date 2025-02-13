import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";

const GetInfoManagement = () => {
  const [characters, setCharacters] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const charactersSnapshot = await getDocs(collection(db, "characters"));
        const locationsSnapshot = await getDocs(collection(db, "locations"));

        const charactersData = charactersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const locationsData = locationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setCharacters(charactersData);
        setLocations(locationsData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-screen p-6 bg-gray-100">
      <h1 className="text-xl font-bold mb-4">Get Info</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Characters</h2>
          <div className="grid grid-cols-2 gap-2">
            {characters.map((char) => (
              <div key={char.id} className="p-4 bg-white rounded shadow-md">
                <h3 className="font-bold">{char.realName}</h3>
                <p className="text-sm">{char.nickName}</p>
                <p className="text-xs text-gray-500">{char.role}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Locations</h2>
          <div className="grid grid-cols-2 gap-2">
            {locations.map((loc) => (
              <div key={loc.id} className="p-4 bg-white rounded shadow-md">
                <h3 className="font-bold">{loc.nickName}</h3>
                <p className="text-sm">{loc.realName}</p>
                <p className="text-xs text-gray-500">{loc.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInfoManagement;
