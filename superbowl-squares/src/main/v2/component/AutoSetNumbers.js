import React, { useState } from 'react';
import '../style/AutoSetNumbersComponent.css'

function AutoSetNumbers() {
  const [autoSetNumbers, setAutoSetNumbers] = useState(false);

  const handleToggleChange = () => {
    setAutoSetNumbers((prevValue) => !prevValue);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' , padding: 10}}>
      <label style={{ marginRight: '10px' }}>
        <input 
            class="big-checkbox"
          type="checkbox"
          id="autoSetNumbersToggle"
          checked={autoSetNumbers}
          onChange={handleToggleChange}
        />
      </label>
      <span>Automatically randomize the top & side-numbers once the board is full?</span>
    </div>
  );
}

export default AutoSetNumbers;
