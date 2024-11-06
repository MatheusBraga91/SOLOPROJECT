import React, { useEffect, useState } from 'react';
import './Menu.css'; // Import the CSS file for styling/
import heroImage from '../assets/characters/profile1.png';
import book from '../assets/characters/book.png';
import { heroStats, } from "./HeroStats"; // Import your hero stats


const Menu: React.FC = () => {
    const healthPercentage = (heroStats.health / heroStats.maxHealth) * 100;
    const essencePercentage = (heroStats.essence / heroStats.maxEssence) * 100;
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Function to handle keydown event for the "I" key
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'i' || event.key === 'I') {
            toggleFullscreen();
        }
    };

    // Function to toggle fullscreen mode
    const toggleFullscreen = () => {
        setIsFullscreen((prevState) => !prevState);
    };

    useEffect(() => {
        // Add keydown event listener
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            // Remove keydown event listener on cleanup
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // Fullscreen styling
    const menuStyle: React.CSSProperties = {
        position: isFullscreen ? 'fixed' : 'relative',
        top: isFullscreen ? 0 : 'auto',
        left: isFullscreen ? 0 : 'auto',
        width: isFullscreen ? '100vw' : 'auto',
        height: isFullscreen ? '100vh' : 'auto',
        backgroundColor: isFullscreen ? 'rgba(0, 0, 0, 0.8)' : 'transparent',
        color: isFullscreen ? 'white' : 'inherit',
        zIndex: isFullscreen ? 100 : 'auto',
        transition: 'all 0.3s ease', // Smooth transition
    };

    return (
        <div className="main-container"style={menuStyle}>
        <div className="container1">
          <img src={heroImage} alt="Hero" className="hero-img" />
          <h2 className="hero-name">HERO NAME</h2>
          <div className="stats">
            <span className="stat-title">HEALTH</span>
            <div className="health-bar">
              <div
                className="health-fill"
                style={{
                  width: `${healthPercentage}%`,
                  background: `linear-gradient(to right, #ff0000 ${healthPercentage}%, #b30000 0%)`,
                }}
              />
            </div>
            <span className="stat-title">ESSENCE</span>
            <div className="essence-bar">
              <div
                className="essence-fill"
                style={{
                  width: `${essencePercentage}%`,
                  background: `linear-gradient(to right, #00bfff ${essencePercentage}%, #005f7f 0%)`,
                }}
              />
            </div>
          </div>
        </div>
     
        
            <div className="container2">
                <h3 className="titleB">.JSON OF FOES</h3>
                <img src={book} alt="JSON of Foes" className="json-img" />
            </div>
            <div className="container3">
                <img src="path-to-HERO2.png" alt="Hero 2" className="hero2-img" />
                <p className="hero-name2">hero2name</p>
                <p className="hero2-health">hero2health</p>
                <img src="path-to-HERO3.png" alt="Hero 3" className="hero3-img" />
                <p className="hero-name3">hero3name</p>
                <p className="hero3-health">hero3health</p>

            </div>
            <div className="container4">
                <h3 className="titleE">EQUIPMENT</h3>
                <img src="path-to-EQUIP1.png" alt="Equip 1" className="equip-img" />
                <img src="path-to-EQUIP2.png" alt="Equip 2" className="equip-img" />
            </div>
            <div className="container5">
                <p className="menu-option">MAP</p>
                <p className="menu-option">SETTINGS</p>
                <p className="menu-option">EXIT</p>
            </div>
            <div className="container6">
                <p className="gold-count">GOLD COUNT</p>
            </div>
        </div>
    );
};

export default Menu;
