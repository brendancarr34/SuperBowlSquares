import React, { useState } from 'react';

function NumberInputBoxes() {
  const [inputs, setInputs] = useState(Array(10).fill(''));

  const handleInputChange = (index, value) => {
    if (value.length > 1 || isNaN(value)) return; // Allow only one digit

    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);

    // Move focus to the next input box
    if (index < 9 && value !== '') {
      document.getElementById(`input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && inputs[index] === '' && index > 0) {
      document.getElementById(`input-${index - 1}`).focus();
    }
  };

  return (
    <div>
      {inputs.map((value, index) => (
        <input
          key={index}
          id={`input-${index}`}
          type="text"
          maxLength="1"
          value={value}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          style={{ width: '30px', marginRight: '5px' }}
        />
      ))}
    </div>
  );
}

export default NumberInputBoxes;
