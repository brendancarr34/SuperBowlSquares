import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

function ColorSelector({ setColor }) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000");

  useEffect(() => {
    const randomColor = getRandomColor();
    setSelectedColor(randomColor);
    setColor(randomColor);
  }, []);

  const rainbowColors = [
    "#FF0000", // Red
    "#FF7F00", // Orange
    "#FFFF00", // Yellow
    "#7FFF00", // Chartreuse
    // "#00FF00", // Lime
    "#00FF7F", // Spring Green
    "#00FFFF", // Cyan
    "#007FFF", // Azure
    // "#0000FF", // Blue
    "#7F00FF", // Violet
    "#FF00FF", // Magenta
    "#FF007F" // Rose
  ];

  const generateShades = (color) => {
    const lightest = lightenDarkenColor(color, 40);
    const lighter = lightenDarkenColor(color, 20);
    const mid = color;
    const darker = lightenDarkenColor(color, -20);
    const darkest = lightenDarkenColor(color, -40);
    return [lightest, lighter, mid, darker, darkest];
  };

  const lightenDarkenColor = (col, amt) => {
    var usePound = false;
    if (col[0] === "#") {
      col = col.slice(1);
      usePound = true;
    }
    var num = parseInt(col, 16);
    var r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
    var b = ((num >> 8) & 0x00FF) + amt;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
    var g = (num & 0x0000FF) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
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
    const randomIndex = Math.floor(Math.random() * rainbowColors.length);
    return rainbowColors[randomIndex];
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          cursor: 'pointer',
        }}
        onClick={handleColorBoxClick}
      >
        <div
          style={{
            backgroundColor: selectedColor,
            width: 90,
            height: 90,
          }}
        ></div>
      </div>
      <Modal show={showColorPicker} onHide={() => setShowColorPicker(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select a Color</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {rainbowColors.map((color, index) => {
              const shades = generateShades(color);
              return shades.map((shade, i) => (
                <div
                  key={`${index}-${i}`}
                  style={{
                    backgroundColor: shade,
                    width: 50,
                    height: 50,
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
