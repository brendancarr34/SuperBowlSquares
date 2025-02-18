import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ColorSelector({ setColor }) {

  // TODO - nice to have - show how many times a color is used?

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000");

  useEffect(() => {
    const randomColor = getRandomColor();
    setSelectedColor(randomColor);
    setColor(randomColor);
  }, []);

  const newEligibleColors = [
    "#E6E6FA",
    "#D8BFD8",
    "#DDA0DD",
    "#DA70D6",
    "#FF00FF",
   
    "#BA55D3",
    "#9932CC",
    "#8B008B",
    "#FF69B4",
    "#FF1493",
   
    "#FFC0CB",
    "#DB7093",
    "#C71585",
    "#FFA07A",
    "#F08080",

    "#DC143C",
    "#FF0000",
    "#B22222",
    "#FFA500",
    "#FF6347",

    "#FF4500",
    "#FFD700",
    "#FFFF00",
    "#fcff8a",
    "#FFFACD",
    
    "#FFDAB9",
    "#BDB76B",
    "#ADFF2F",
    "#00FF00",
    "#32CD32",
    
    "#00FA9A",
    "#3CB371",
    "#008000",
    "#9ACD32",
    "#6B8E23",
    
    "#556B2F",
    "#20B2AA",
    "#008080",
    "#00FFFF",
    "#E0FFFF",
    
    "#AFEEEE",
    "#7FFFD4",
    "#5F9EA0",
    "#4682B4",
    "#B0C4DE",
    
    "#87CEFA",
    "#6495ED",
    "#00BFFF",
    "#1E90FF",
    "#4169E1",

  ];

  const generateShades = (color) => {
    return [color];
  };

  const handleColorChange = (color) => {
    setColor(color);
    setSelectedColor(color);
    setShowColorPicker(false);
  };

  const handleColorBoxClick = () => {
    setShowColorPicker(true);
  };

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * newEligibleColors.length);
    return newEligibleColors[randomIndex];
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          cursor: 'pointer',
          height: '100%'
        }}
      >
        <Button style={{backgroundColor: selectedColor, width: '100%', height: '85%', border: '1px solid black', color: 'black'}} onClick={handleColorBoxClick}>
            Select a Color
        </Button>
      </div>
      <Modal show={showColorPicker} onHide={() => setShowColorPicker(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select a Color</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {newEligibleColors.map((color, index) => {
              const shades = generateShades(color);
              return shades.map((shade, i) => (
                <div
                  key={`${index}-${i}`}
                  style={{
                    backgroundColor: shade,
                    width: 50,
                    height: 40,
                    cursor: 'pointer',
                    margin: 5,
                    border: '2px solid black',
                  }}
                  onClick={() => handleColorChange(shade)}
                ></div>
              ));
            })}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ColorSelector;
