import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [dogImage, setDogImage] = useState('');

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        const data = await response.json();
        setBreeds(Object.keys(data.message));
      } catch (error) {
        console.error('Error fetching breeds:', error);
      }
    };

    fetchBreeds();
  }, []);

  const fetchDogImage = async () => {
    try {
      const response = await fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`);
      const data = await response.json();
      setDogImage(data.message);
    } catch (error) {
      console.error('Error fetching dog image:', error);
    }
  };

  const handleBreedChange = (event) => {
    setSelectedBreed(event.target.value);
  };

  const handleButtonClick = () => {
    fetchDogImage();
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-blue-200 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl mb-6 text-center font-bold text-blue-900">¡Elige tu raza de perro favorita!</h1>
        <select
          className="w-full mb-6 p-3 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedBreed}
          onChange={handleBreedChange}
        >
          <option value="">Selecciona una raza</option>
          {breeds.map((breed, index) => (
            <option key={index} value={breed} className="text-blue-900">{breed}</option>
          ))}
        </select>
        <button
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
          onClick={handleButtonClick}
        >
          Ver imagen
        </button>
        {dogImage && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4 text-blue-900">¡Aquí está tu adorable amigo!</h2>
            <img className="w-full rounded-lg" src={dogImage} alt={selectedBreed} />
          </div>
        )}
      </div>
    </div>
  );
  
}

export default App;
