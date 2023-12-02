import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GridComponent = () => {
  const [gridData, setGridData] = useState([]);
  const [updateClickedState, setUpdateClickedState] = useState(false);
  const [variableMaps, setVariableMaps] = useState([]);

  useEffect(() => {
    fetchData();
  }, [updateClickedState]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/game/brendan1');
      const gameRows = [
        response.data.gameData.row0,
        response.data.gameData.row1,
        response.data.gameData.row2,
        response.data.gameData.row3,
        response.data.gameData.row4,
        response.data.gameData.row5,
        response.data.gameData.row6,
        response.data.gameData.row7,
        response.data.gameData.row8,
        response.data.gameData.row9,
      ];

      // If updateClickedState is true, update only the clicked state
      if (updateClickedState) {
        setGridData(prevGridData => {
          const updatedGridData = [...prevGridData];
          variableMaps.forEach(({ row, col }) => {
            if (row >= 0 && row < updatedGridData.length && col >= 0 && col < updatedGridData[row].length) {
              updatedGridData[row][col].clicked = true;
              updatedGridData[row][col].disabled = false;
            }
          });
          return updatedGridData;
        });

        // Reset the updateClickedState flag and variableMaps
        setUpdateClickedState(false);
        setVariableMaps([]);
      } else {
        // If updateClickedState is false, update the entire gridData
        setGridData(gameRows.map(row => row.map(value => ({ clicked: false, disabled: value }))));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleButtonClick = (row, col) => {
    const newGridData = [...gridData];
    newGridData[row][col] = { clicked: !newGridData[row][col].clicked, disabled: newGridData[row][col].disabled };
    setGridData(newGridData);
  };

  const handleSubmit = () => {
    axios.post('http://localhost:3001/api/game/api/checkData', { maps: getClickedButtons() })
      .then(response => {
        console.log('Submit successful:', response);
      })
      .catch(error => {
        console.error('Error submitting data:', error);
        if (error.response && error.response.data && error.response.data.validMaps) {
          // Set the flag to update the clicked state and store validMaps in variableMaps
          setUpdateClickedState(true);
          setVariableMaps(error.response.data.validMaps);
        }
        // Refresh the grid data from Firebase
        fetchData();
      });
  };

  const getClickedButtons = () => {
    const clickedButtons = [];
    gridData.forEach((row, rowIndex) => {
      row.forEach((item, colIndex) => {
        if (item.clicked) {
          clickedButtons.push({ row: rowIndex, col: colIndex });
        }
      });
    });
    console.log('clicked buttons:' + clickedButtons);
    return clickedButtons;
  };

  return (
    <div>
      <table>
        <tbody>
          {gridData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((item, colIndex) => (
                <td key={colIndex}>
                  <button
                    onClick={() => handleButtonClick(rowIndex, colIndex)}
                    disabled={item.disabled}
                    style={{
                      backgroundColor: item.clicked ? 'green' : item.disabled ? 'red' : 'white',
                    }}
                  >
                    {item.clicked ? 'X' : 'Click me'}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default GridComponent;