import React, { useEffect, useRef, useState } from 'react';
import { Map, View } from 'ol';
import { fromLonLat } from 'ol/proj';
import { Draw } from 'ol/interaction';
import 'ol/ol.css';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { OSM } from 'ol/source';
import { Tile as TileLayer } from 'ol/layer';
import { getDistance } from 'ol/sphere';
import DrawingInfoDropdown from './DrawingInfoDropdown';

const MapComponent = ({ onLineStringComplete, onPolygonComplete }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [drawType, setDrawType] = useState(null);
  const [drawInteraction, setDrawInteraction] = useState(null);
  const [vectorSource] = useState(new VectorSource());
  const [waypoints, setWaypoints] = useState([]);
  const [distances, setDistances] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Initialize the map only once
    const initialMap = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: vectorSource,
        }),
      ],
      view: new View({
        center: fromLonLat([-74.006, 40.7128]),
        zoom: 10,
      }),
    });
    setMap(initialMap);

    // Cleanup function to remove the map target
    return () => {
      initialMap.setTarget(null);
    };
  }, []); // Empty dependency array ensures this runs only once

  const startDrawing = (type) => {
    if (map) {
      const draw = new Draw({
        source: vectorSource,
        type: type,
      });

      draw.on('drawstart', (event) => {
        setWaypoints([]);
        setDistances([]);
        setShowDropdown(true);
      });

      draw.on('drawend', (event) => {
        const coords = event.feature.getGeometry().getCoordinates();
        const distances = calculateDistances(coords);

        if (type === 'LineString') {
          onLineStringComplete(coords, distances);
        } else if (type === 'Polygon') {
          onPolygonComplete(coords, distances);
        }

        setWaypoints(coords);
        setDistances(distances);
        map.removeInteraction(draw);
      });

      map.addInteraction(draw);
      setDrawInteraction(draw);
      setDrawType(type);
    }
  };

  const calculateDistances = (coords) => {
    const distances = [];
    for (let i = 1; i < coords.length; i++) {
      const distance = getDistance(coords[i - 1], coords[i]);
      distances.push(distance);
    }
    return distances;
  };

  const handleDrawButtonClick = (type) => {
    if (drawInteraction) {
      map.removeInteraction(drawInteraction);
    }
    startDrawing(type);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <div>
      <div ref={mapRef} style={{ width: '100%', height: '500px' }}></div>
      <button onClick={() => handleDrawButtonClick('LineString')}>Draw Line</button>
      <button onClick={() => handleDrawButtonClick('Polygon')}>Draw Polygon</button>
      {showDropdown && (
        <DrawingInfoDropdown
          waypoints={waypoints}
          distances={distances}
          onClose={closeDropdown}
        />
      )}
    </div>
  );
};

export default MapComponent;