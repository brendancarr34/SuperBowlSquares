// AutoSetNumbers.js
import React from 'react';
import '../style/AutoSetNumbersComponent.css'

function AutoSetNumbers({ autoSetNumbers, handleToggleChange }) {

  const handleToggle = () => {
    handleToggleChange(!autoSetNumbers); // Call the function passed from parent
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: 10 }}>
      <label style={{ marginRight: '10px' }}>
        <input
          className="big-checkbox" // changed class to className
          type="checkbox"
          id="autoSetNumbersToggle"
          checked={autoSetNumbers}
          onChange={handleToggle}
        />
      </label>
      <span>Automatically randomize the top & side-numbers once the board is full?</span>
    </div>
  );
}

export default AutoSetNumbers;
