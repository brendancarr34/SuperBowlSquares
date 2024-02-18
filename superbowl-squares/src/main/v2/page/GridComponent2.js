import React, { useState, useEffect } from 'react';
import { MDBBtn } from "mdb-react-ui-kit";
import '../style/Button.css';
import axios from 'axios';

const GridComponent2 = (props) => {

  const groupId = props.groupId;

  const [gridData, setGridData] = useState([]);
  const [updateClickedState, setUpdateClickedState] = useState(false);
  const [variableMaps, setVariableMaps] = useState([]);

  useEffect(() => {

    console.log("updateClickedState: " + updateClickedState);

    fetchData();
  }, [updateClickedState]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://10.0.0.65:3001/api/game/' + groupId);
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
          console.log('prevGridData: ' + JSON.stringify(prevGridData));
          const updatedGridData = [...prevGridData];
          variableMaps.forEach(({ row, col }) => {
            if (row >= 0 && row < updatedGridData.length && col >= 0 && col < updatedGridData[row].length) {
              updatedGridData[row][col].clicked = true;
              updatedGridData[row][col].disabled = false;
            }
          });
          // setUpdateClickedState(false);
          setVariableMaps([]);
          return updatedGridData;
        });

        // Reset the updateClickedState flag and variableMaps
        // setUpdateClickedState(false);
        // setVariableMaps([]);
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
    console.log('clickedButtons:' + JSON.stringify(getClickedButtons()));
    axios.post('http://10.0.0.65:3001/api/game/api/validateAndClaimSquares/' + groupId, { maps: getClickedButtons() })
      .then(response => {
        console.log('Submit successful:', response);
      })
      .catch(error => {
        console.error('Error submitting data:', error);
        if (error.response && error.response.data && error.response.data.validMaps) {
          // Set the flag to update the clicked state and store validMaps in variableMaps
          console.log('validMaps: ' + JSON.stringify(error.response.data.validMaps));
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
    // console.log('clicked button:' + clickedButtons[0].row+ ', '+ clickedButtons[0].col);
    return clickedButtons;
  };

  return (
    <div>
      <table>
        <tbody>
          {gridData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((item, colIndex) => (
                <td key={colIndex} style={editBoardRowStyle()}>
                  <MDBBtn className="square-md"
                    onClick={() => handleButtonClick(rowIndex, colIndex)}
                    disabled={item.disabled}
                    style={{
                      backgroundColor: item.clicked ? 'green' : item.disabled ? 'red' : 'white', border: '1px solid black',
                    }}
                  >
                    {item.clicked ? 'X' : 'X'}
                  </MDBBtn>
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

function editBoardRowStyle() {
          return {
              textAlign:'center',
              padding: 0,
              margin: 0,
              borderBottom: '1pt solid gray'
          }
      }

export default GridComponent2;