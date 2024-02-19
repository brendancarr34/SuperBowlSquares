import React, { useState, useEffect } from 'react';
import { MDBBtn } from "mdb-react-ui-kit";
import '../style/Button.css';
import axios from 'axios';

const GridComponent2 = (props) => {
  const groupId = props.groupId;
  const setClickedButtons = props.setClickedButtons;

  const [gridData, setGridData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://10.0.0.65:3001/api/game/${groupId}`);
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

      setGridData(gameRows.map(row => row.map(value => ({ clicked: false, disabled: value }))));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleButtonClick = (row, col) => {
    console.log('clicked: (' + row +', '+col+')')
    const newGridData = [...gridData];
    newGridData[row][col] = { clicked: !newGridData[row][col].clicked, disabled: newGridData[row][col].disabled };
    setGridData(newGridData);
    const clickedButtons = getClickedButtons();
    setClickedButtons(clickedButtons);
  };

  const handleSubmit = () => {
    const clickedButtons = getClickedButtons();
    console.log('clickedButtons:', clickedButtons);
    setClickedButtons(clickedButtons);
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
                  <MDBBtn
                    className="square-md"
                    onClick={() => handleButtonClick(rowIndex, colIndex)}
                    disabled={item.disabled}
                    style={{
                      backgroundColor: item.clicked ? 'green' : item.disabled ? 'red' : 'white',
                      border: '1px solid black',
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
      {/* <button onClick={handleSubmit}>Submit</button> */}
    </div>
  );
};

function editBoardRowStyle() {
  return {
    textAlign: 'center',
    padding: 0,
    margin: 0,
    borderBottom: '1pt solid gray',
  };
}

export default GridComponent2;
