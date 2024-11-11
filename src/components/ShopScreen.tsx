// src/components/ShopScreen.tsx

import React, { useState } from 'react';
import './ShopScreen.css';
import { heroBag } from './Bag';
import merchantImg from '../assets/npcs/merchant.png';

const merchantQuotes = [
  "Welcome, traveler! What do you need?",
  "A wise choice is always a full bag!",
  "Fill up your potions, you never know what's ahead.",
  "I see you're ready for adventure!",
  "These vials will serve you well!",
  "Travel safe and well-prepared, hero.",
  "Stock up while you can, supplies are scarce.",
  "Ah, it's always good to see a returning customer!",
  "Take what you need, but spend wisely.",
  "You won't find better deals anywhere else!"
];

const ShopScreen: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [log, setLog] = useState<string[]>([]);
  const [canTalk, setCanTalk] = useState(true);

  const refillItem = (itemId: string) => {
    const item = heroBag.getInventory()[itemId];
    if (item && item.quantity < item.item.maxAmount) {
      heroBag.addItem(itemId, item.item.maxAmount - item.quantity);
      setLog(prev => [`${item.item.name} vials were filled to their maximum capacity!`, ...prev]);
    }
  };

  const handleTalk = () => {
    if (canTalk) {
      const randomQuote = merchantQuotes[Math.floor(Math.random() * merchantQuotes.length)];
      setLog(prev => [randomQuote, ...prev]);
      setCanTalk(false);
      setTimeout(() => setCanTalk(true), 4000); // Cooldown of 4 seconds
    }
  };

    const inventory = heroBag.getInventory();
    

  return (
    <div className="shop-container">
      {/* Container 1: Merchant */}
      <div className="merchant-container">
        <h2>Juan</h2>
        <img src={merchantImg} alt="Merchant" />
      </div>

      {/* Container 2: Conversation Log */}
      <div className="log-container">
        {log.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>

      {/* Container 3: Items List */}
      <div className="items-container">
        {Object.keys(inventory).map(itemId => {
          const item = inventory[itemId];
          return (
            <div
              key={itemId}
              className="item"
              onClick={() => refillItem(itemId)}
            >
              {`${item.item.name} ${item.quantity}/${item.item.maxAmount}`}
            </div>
          );
        })}
      </div>

      {/* Container 4: Buttons */}
      <div className="buttons-container">
        <button className='talkB' onClick={handleTalk} disabled={!canTalk}>TALK</button>
        <button className='backB' onClick={onClose}>BACK</button>
      </div>
    </div>
  );
};

export default ShopScreen;
