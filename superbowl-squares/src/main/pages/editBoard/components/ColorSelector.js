import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

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
    "#0000FF",

  ];

  // const generateShades = (color) => {
  //   const lightest = lightenDarkenColor(color, 40);
  //   const lighter = lightenDarkenColor(color, 20);
  //   const mid = color;
  //   const darker = lightenDarkenColor(color, -20);
  //   const darkest = lightenDarkenColor(color, -40);
  //   return [lightest, lighter, mid, darker, darkest];
  // };

  const generateShades = (color) => {
    return [color];
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
        // onClick={handleColorBoxClick}
      >
        {/* <div
          style={{
            backgroundColor: selectedColor,
            width: 90,
            height: 90,
          }}
        ></div> */}
        <Button style={{backgroundColor: selectedColor, width: '100%', height: '85%', border: '1px solid black', color: 'black'}} onClick={handleColorBoxClick}>
            Select a Color
        </Button>
      </div>
      <Modal show={showColorPicker} onHide={() => setShowColorPicker(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select a Color</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {newEligibleColors.map((color, index) => {
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

  function colorButtonStyle() {
    return {
      // backgroundColor: {selectedColor},
      // border: 'black',
      // padding: 0,
      // width: '100%',
      // height: '85%',
      // marginLeft: 5,
      // marginRight: 5,
      // paddingLeft:5
    }
  }
}

export default ColorSelector;
