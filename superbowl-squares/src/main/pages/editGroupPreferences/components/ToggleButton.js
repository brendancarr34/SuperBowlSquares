import React, { useState } from 'react';

const ToggleButton = () => {
  const [selected, setSelected] = useState('button1');

  const handleToggle = (button) => {
    setSelected(button);
  };

  return (
    <div style={{ padding: 0, margin: 0, width: '75vw' }}>
      <div style={{ display: 'flex' }}>
        <button
          onClick={() => handleToggle('button1')}
          style={{
            backgroundColor: selected === 'button1' ? 'black' : 'lightgray',
            color: selected === 'button1' ? 'white' : 'black',
            border: '1px solid #ccc',
            padding: '10px',
            flex: 1,
            borderTopLeftRadius: '8px',
            borderBottomLeftRadius: '8px',
            borderRight: 'none',
            fontSize: selected === 'button1' ? '16px' : '14px',
          }}
        >
          Manually Set Teams & Numbers
        </button>
        <button
          onClick={() => handleToggle('button2')}
          style={{
            backgroundColor: selected === 'button2' ? 'black' : 'lightgray',
            color: selected === 'button2' ? 'white' : 'black',
            border: '1px solid #ccc',
            padding: '10px',
            flex: 1,
            borderTopRightRadius: '8px',
            borderBottomRightRadius: '8px',
            fontSize: selected === 'button1' ? '16px' : '14px',
          }}
        >
        Randomize Teams & Numbers
        </button>
      </div>

      {selected === 'button2' && (
        <div style={{ display: 'flex', marginTop: '10px'}}>
          <input
            type="text"
            placeholder="Team 1"
            style={{
              flex: 1,
              padding: '8px',
              marginRight: '5px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width:'50%'
            }}
          />
          <input
            type="text"
            placeholder="Team 2"
            style={{
              flex: 1,
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width:'50%'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ToggleButton;
