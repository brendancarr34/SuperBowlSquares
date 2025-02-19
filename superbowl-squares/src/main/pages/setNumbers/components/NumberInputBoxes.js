import React, { useState, useEffect } from 'react';

function NumberInputBoxes(props) {
  const [inputsTop, setInputsTop] = useState(props.inputsTop);
  const [inputsBottom, setInputsBottom] = useState(props.inputsBottom);

  useEffect(() => {
    setInputsTop(props.inputsTop);
    setInputsBottom(props.inputsBottom);
  }, [props.inputsTop, props.inputsBottom]);

  const onInputChange = props.onInputChange;

  const handleInputChangeTop = (index, value) => {
    if (value.length > 1 || isNaN(value)) return; // Allow only one digit

    const newInputsTop = [...inputsTop];
    newInputsTop[index] = value;
    setInputsTop(newInputsTop);
    onInputChange({ inputsTop: newInputsTop, inputsBottom });

    if (value !== '' && index < inputsTop.length - 1) {
      const nextInput = document.getElementById(`input-top-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
        nextInput.select(); // Highlight the text in the next cell
      }
    }
  };

  const handleInputChangeBottom = (index, value) => {
    if (value.length > 1 || isNaN(value)) return; // Allow only one digit

    const newInputsBottom = [...inputsBottom];
    newInputsBottom[index] = value;
    setInputsBottom(newInputsBottom);
    onInputChange({ inputsTop, inputsBottom: newInputsBottom });

    if (value !== '' && index < inputsBottom.length - 1) {
      document.getElementById(`input-bottom-${index + 1}`).focus(); // Move focus to the next input
    }
  };

  const handleKeyDownTop = (index, e) => {
    if (e.key === 'Backspace' && inputsTop[index] === '' && index > 0) {
      document.getElementById(`input-top-${index - 1}`).focus();
    }
  };

  const handleKeyDownBottom = (index, e) => {
    if (e.key === 'Backspace' && inputsBottom[index] === '' && index > 0) {
      document.getElementById(`input-bottom-${index - 1}`).focus();
    }
  };

  return (
    <div>
      <h4>Top Numbers</h4>
      <div style={{ marginBottom: '10px' }}>
        {inputsTop.map((value, index) => (
          <input
            key={index}
            id={`input-top-${index}`}
            type="text"
            inputMode="numeric" // Set input mode to numeric
            maxLength="1"
            value={value}
            onChange={(e) => handleInputChangeTop(index, e.target.value)}
            onKeyDown={(e) => handleKeyDownTop(index, e)}
            style={{ width: '30px', marginRight: '5px' }}
          />
        ))}
      </div>
      <br/>
      <h4>Left-Side Numbers</h4>
      <div>
        {inputsBottom.map((value, index) => (
          <input
            key={index}
            id={`input-bottom-${index}`}
            type="text"
            inputMode="numeric" // Set input mode to numeric
            maxLength="1"
            value={value}
            onChange={(e) => handleInputChangeBottom(index, e.target.value)}
            onKeyDown={(e) => handleKeyDownBottom(index, e)}
            style={{ width: '30px', marginRight: '5px' }}
          />
        ))}
      </div>
    </div>
  );
}

export default NumberInputBoxes;
