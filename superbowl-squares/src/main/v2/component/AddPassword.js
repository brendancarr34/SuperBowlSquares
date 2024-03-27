// AutoSetNumbers.js
import React, { useState} from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../style/AutoSetNumbersComponent.css'

function AddPassword({ addGroupPassword, handleAddPasswordToggleChange }) {

  const [groupPassword, setGroupPassword] = useState("");

  const handleToggle = () => {
    handleAddPasswordToggleChange(!addGroupPassword); // Call the function passed from parent
  };

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
                checked={addGroupPassword}
                onChange={handleToggle}
              />
            </label>
            <span>Add password?</span>
          </div>
        </Row>
        <Row>
          {addGroupPassword && (
              <Col>
                <Form.Group className="mb-3" onChange={(e) => setGroupPassword(e.target.value)}>
                    {/* <Form.Label>Password</Form.Label> */}
                    <Form.Control placeholder="Enter custom password" />
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

  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: 10 }}>
      <div>
      <label style={{ marginRight: '10px' }}>
        <input
          className="big-checkbox" // changed class to className
          type="checkbox"
          id="autoSetNumbersToggle"
          checked={addGroupPassword}
          onChange={handleToggle}
        />
      </label>
      <span>Add password?</span>
      </div>
      <div>
      {addGroupPassword && (
            <Col>
              <Form.Group className="mb-3" onChange={(e) => setGroupPassword(e.target.value)}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control placeholder="Enter custom password" />
                  <Form.Text className="text-muted">
                      This is optional. If you leave this blank, 
                      anyone with the link to your game will be able to edit squares.
                  </Form.Text>
              </Form.Group>
            </Col>
          )}
      </div>
    </div>
  );
}

export default AddPassword;
