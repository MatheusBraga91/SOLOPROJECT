import React from 'react';
import './TutorScreen.css';

const TutorScreen: React.FC = () => {
  return (
    <div className="tutor-screen">
      <div className="container container1">
        <div className="tutor-info">
          <h2>Santiago</h2>
          <img src="/path/to/tutor-image.jpg" alt="Tutor Santiago" />
        </div>
      </div>
      <div className="container container2">
        <div className="conversation-log">
          <p>Welcome to class! Here you will learn new skills to become stronger to fight the world bosses!</p>
        </div>
      </div>
      <div className="container container3">
        <h2 className="coding-class-label">CODING CLASS</h2>
      </div>
      <div className="container container4">
        <button className="action-button">TALK</button>
        <button className="action-button">BACK</button>
      </div>
    </div>
  );
};

export default TutorScreen;
