// AutoSetTeams.js
import React, { useState} from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../style/AutoSetNumbersComponent.css'

function AutoSetTeams({ autoSetTeams, handleAutoSetTeamsChange, handleSetTeam1, handleSetTeam2 }) {

    // const [team1, setTeam1] = useState("");
    // const [team2, setTeam2] = useState("");

  const handleToggle = () => {
    handleAutoSetTeamsChange(!autoSetTeams); // Call the function passed from parent
  };

  const handleTeam1Change = (e) => {
    const newTeam1 = e.target.value;
    handleSetTeam1(newTeam1);
  }

  const handleTeam2Change = (e) => {
    const newTeam2 = e.target.value;
    handleSetTeam2(newTeam2);
  }

  return (
    <Row>
      <Col>
        <Row>
          <div style={{ display: 'flex', alignItems: 'center', padding: 10 }}>
            <label style={{ marginRight: '10px' }}>
              <input
                className="big-checkbox" // changed class to className
                type="checkbox"
                id="autoSetNumbersToggle"
                checked={autoSetTeams}
                onChange={handleToggle}
              />
            </label>
            <span>Automatically randomize the top & side teams once the board is full?</span>
          </div>
        </Row>
        <Row>
          {autoSetTeams && (
              <Col>
                <Form.Group className="mb-3" onChange={handleTeam1Change}>
                    {/* <Form.Label>Password</Form.Label> */}
                    <Form.Control placeholder="Enter Team 1" />
                    {/* <Form.Text className="text-muted">
                        This is optional. If you leave this blank, 
                        anyone with the link to your game will be able to edit squares.
                    </Form.Text> */}
                </Form.Group>
                <Form.Group className="mb-3" onChange={handleTeam2Change}>
                    {/* <Form.Label>Password</Form.Label> */}
                    <Form.Control placeholder="Enter Team 2" />
                    {/* <Form.Text className="text-muted">
                        This is optional. If you leave this blank, 
                        anyone with the link to your game will be able to edit squares.
                    </Form.Text> */}
                </Form.Group>
              </Col>
            )}
        </Row>
      </Col>
    </Row>
  );

//   return (
//     <div style={{ display: 'flex', alignItems: 'center', padding: 10 }}>
//       <label style={{ marginRight: '10px' }}>
//         <input
//           className="big-checkbox" // changed class to className
//           type="checkbox"
//           id="autoSetNumbersToggle"
//           checked={autoSetNumbers}
//           onChange={handleToggle}
//         />
//       </label>
//       <span>Automatically randomize the top & side-numbers once the board is full?</span>
//     </div>
//   );
}

export default AutoSetTeams;
