import React, { useState } from 'react';
import './TutorScreen.css';
import { RootState } from './store';
import tutorImage from '../assets/npcs/warrior.png';
import { useSelector } from 'react-redux';




const TutorScreen: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [showClasses, setShowClasses] = useState(false); // Track if we're displaying classes
  const skills = useSelector((state: RootState) => state.skills.skills); // Get skills from Redux store

  // Filter for skills where isVisible is false
  const hiddenSkills = Object.values(skills).filter(skill => !skill.isVisible);

  return (
    <div className="tutor-screen">
      <div className="container1">
        <div className="tutor-info">
          <h2>Santiago</h2>
          <img src={tutorImage} alt="Tutor Santiago" />
        </div>
      </div>
      <div className="container2">
        <div className="conversation-log">
          <p>Welcome to class! Here you will learn new skills to become stronger to fight the world bosses!</p>
        </div>
      </div>
      <div className="container3">
        <h2 className="coding-class-label">CODING CLASS</h2>
      </div>
      <div className="container4">
        {showClasses ? (
          // Display hidden skills as buttons
          <>
            {hiddenSkills.map((skill, index) => (
              <button key={index} className="skill-button">
                {skill.name}: {skill.description}
              </button>
            ))}
            <button className="action-button" onClick={() => setShowClasses(false)}>BACK</button>
          </>
        ) : (
          // Main options with Classes and BACK buttons
          <>
            <button className="action-button" onClick={() => setShowClasses(true)}>Classes</button>
            <button className="action-button" onClick={onClose}>BACK</button>
          </>
        )}
      </div>
    </div>
  );
};

export default TutorScreen;