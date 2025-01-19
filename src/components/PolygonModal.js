import React from 'react';
import Modal from 'react-modal';

const PolygonModal = ({ isOpen, onRequestClose, waypoints, distances }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Polygon Waypoints</h2>
      <table>
        <thead>
          <tr>
            <th>WP</th>
            <th>Coordinates</th>
            <th>Distance (m)</th>
          </tr>
        </thead>
        <tbody>
          {waypoints.map((coord, index) => {
            // Ensure coord is an array and has the expected structure
            if (Array.isArray(coord) && coord.length === 2) {
              return (
                <tr key={index}>
                  <td>WP{index < 10 ? `0${index}` : index}</td>
                  <td>{`${coord[0].toFixed(6)}, ${coord[1].toFixed(6)}`}</td>
                  <td>{distances[index] ? distances[index].toFixed(2) : 'N/A'}</td>
                </tr>
              );
            } else {
              return (
                <tr key={index}>
                  <td>WP{index < 10 ? `0${index}` : index}</td>
                  <td>Invalid Coordinates</td>
                  <td>N/A</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default PolygonModal;