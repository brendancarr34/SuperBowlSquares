// In GridComponent3
import React, { useState, useEffect } from 'react';
import { MDBBtn } from "mdb-react-ui-kit";
import '../../../common/style/Button.css';
import axios from 'axios';
import { api_url} from '../../../../config';

const GridComponent3 = (props) => {
  const { groupId, setClickedButtons, clickedButtons } = props;

  const [gridData, setGridData] = useState([]);

  useEffect(() => {
    // Update the grid data when clickedButtons changes
    fetchData().then(() => {
      setGridData(prevGridData => updateGridData(prevGridData));
    })
  }, [clickedButtons]);

  const fetchData = async () => {
    try {
      const url = api_url + 'api/game/' + groupId;
      const response = await axios.get(url);
      const gameRows = [
        response.data.gameData.row0, response.data.gameData.row1,
        response.data.gameData.row2, response.data.gameData.row3,
        response.data.gameData.row4, response.data.gameData.row5, 
        response.data.gameData.row6, response.data.gameData.row7,
        response.data.gameData.row8, response.data.gameData.row9,
      ];
      
      setGridData(gameRows.map(row => row.map(value => ({ clicked: false, disabled: value }))));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleButtonClick = (row, col) => {
    const newGridData = [...gridData];
    newGridData[row][col] = { clicked: !newGridData[row][col].clicked, disabled: newGridData[row][col].disabled };
    setGridData(newGridData);
    const clickedButtons = getClickedButtons();
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

  // Function to update grid data based on clickedButtons
  const updateGridData = (prevGridData) => {
    return prevGridData.map((row, rowIndex) => {
      return row.map((item, colIndex) => {
        const isClicked = clickedButtons.some(btn => btn.row === rowIndex && btn.col === colIndex);
        return { ...item, clicked: isClicked };
      });
    });
  };

  if (gridData) {
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
                      {item.clicked ? '🏈' : ' '}
                    </MDBBtn>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  else {
    return (
      <div>
        <p>
          Loading...
        </p>
      </div>
    );
  }
  
};

function editBoardRowStyle() {
  return {
    textAlign: 'center',
    padding: 0,
    margin: 0,
    borderBottom: '1pt solid lightGray',
  };
}

export default GridComponent3;
