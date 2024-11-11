import React, { useState, useEffect } from 'react';
import './Menu.css';
import heroImage from '../assets/characters/profile1.png';
import book from '../assets/characters/book.png';
import { heroStats } from './HeroStats';
import { heroBag } from './Bag';
import { items } from './Items';
import { BagItem } from './Bag'; // Ensure BagItem is exported from Bag.ts

const Menu: React.FC = () => {
  // Health and essence percentages for progress bars
  const healthPercentage = (heroStats.health / heroStats.maxHealth) * 100;
  const essencePercentage = (heroStats.essence / heroStats.maxEssence) * 100;

  // State for fullscreen mode and viewing items
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isItemsView, setIsItemsView] = useState(false);

  // State to track inventory
  const [inventory, setInventory] = useState<Record<string, BagItem>>(heroBag.getInventory());

  // Update inventory state when items are used
  const updateInventory = () => {
    setInventory({ ...heroBag.getInventory() });
  };

  // Handle item use when clicked
  const handleItemClick = (itemId: string) => {
    heroBag.useItem(itemId);
    updateInventory(); // Update state to reflect the change
  };

  // Handle keydown event for toggling fullscreen
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'i' || event.key === 'I') {
      toggleFullscreen();
    }
  };

  // Add event listener for keydown
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen((prevState) => !prevState);
  };

  // Styling for the menu (fullscreen mode)
  const menuStyle: React.CSSProperties = {
    position: isFullscreen ? 'fixed' : 'relative',
    top: isFullscreen ? 0 : 'auto',
    left: isFullscreen ? 0 : 'auto',
    width: isFullscreen ? '100vw' : 'auto',
    height: isFullscreen ? '100vh' : 'auto',
    backgroundColor: isFullscreen ? 'rgba(0, 0, 0, 0.8)' : 'transparent',
    color: isFullscreen ? 'white' : 'inherit',
    zIndex: isFullscreen ? 100 : 'auto',
    transition: 'all 0.3s ease',
  };

  return (
    <div className="main-container" style={menuStyle}>
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
          <span className="stat-title2">ESSENCE</span>
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
        {!isItemsView ? (
          <>
            <p className="menu-option" onClick={() => setIsItemsView(true)}>ITEMS</p>
            <p className="menu-option">EXIT</p>
          </>
        ) : (
          <div>
            <button className="back-button" onClick={() => setIsItemsView(false)}>Back</button>
            <h3 className="items-title">Items in Bag</h3>
            <div className="items-list">
                {Object.keys(items).map((itemId) => {
                if (!items[itemId].isVisible) return null; // Skip items that are not visible
                const maxQuantity = 5; // Assume max quantity for each item
                const currentQuantity = inventory[itemId]?.quantity || 0;
                return (
                  <div key={itemId} className="item">
                    <p>{items[itemId].name} x{currentQuantity}/{maxQuantity}</p>
                    <button onClick={() => handleItemClick(itemId)} disabled={currentQuantity === 0}>Use</button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className="container6">
        <p className="gold-count">GOLD COUNT</p>
      </div>
    </div>
  
  );
};

export default Menu;
