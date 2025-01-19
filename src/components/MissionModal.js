import React from 'react';
import Modal from 'react-modal';

const MissionModal = ({ isOpen, onRequestClose, waypoints, distances }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Mission Waypoints</h2>
      <table>
        <thead>
          <tr>
            <th>WP</th>
            <th>Coordinates</th>
            <th>Distance (m)</th>
          </tr>
        </thead>
        <tbody>
          {waypoints.map((coord, index) => (
            <tr key={index}>
              <td>WP{index < 10 ? `0${index}` : index}</td>
              <td>{`${coord[0].toFixed(6)}, ${coord[1].toFixed(6)}`}</td>
              <td>{distances[index] ? distances[index].toFixed(2) : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default MissionModal;