import React, { useState } from 'react';
import MapComponent from './components/MapComponent';
import MissionModal from './components/MissionModal';
import PolygonModal from './components/PolygonModal';
import './App.css';

const App = () => {
  const [isMissionModalOpen, setMissionModalOpen] = useState(false);
  const [isPolygonModalOpen, setPolygonModalOpen] = useState(false);
  const [lineStringCoords, setLineStringCoords] = useState([]);
  const [polygonCoords, setPolygonCoords] = useState([]);
  const [lineStringDistances, setLineStringDistances] = useState([]);
  const [polygonDistances, setPolygonDistances] = useState([]);

  const handleLineStringComplete = (coords, distances) => {
    setLineStringCoords(coords);
    setLineStringDistances(distances);
    setMissionModalOpen(true);
  };

  const handlePolygonComplete = (coords, distances) => {
    setPolygonCoords(coords);
    setPolygonDistances(distances);
    setPolygonModalOpen(true);
  };

  return (
    <div className="app-container">
      <h1>OpenLayers Drawing App</h1>
      <MapComponent 
        onLineStringComplete={handleLineStringComplete} 
        onPolygonComplete={handlePolygonComplete} 
      />
      <MissionModal
        isOpen={isMissionModalOpen}
        onRequestClose={() => setMissionModalOpen(false)}
        waypoints={lineStringCoords}
        distances={lineStringDistances}
      />
      <PolygonModal
        isOpen={isPolygonModalOpen}
        onRequestClose={() => setPolygonModalOpen(false)}
        waypoints={polygonCoords}
        distances={polygonDistances}
      />
    </div>
  );
};

export default App;