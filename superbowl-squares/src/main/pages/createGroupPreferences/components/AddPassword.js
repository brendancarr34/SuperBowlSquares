// AutoSetNumbers.js
import React, { useState} from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../style/AutoSetNumbersComponent.css';

function AddPassword({ addGroupPassword, handleAddPasswordToggleChange, handleSetGroupPassword }) {

  const handleToggle = () => {
    handleAddPasswordToggleChange(!addGroupPassword); // Call the function passed from parent
  };

  const handleGroupPasswordChange = (e) => {
    const newPassword = e.target.value;
    handleSetGroupPassword(newPassword);
  }

  return (
    <Row>
      <Col>
        <Row>
          <div style={{ display: 'flex', alignItems: 'center', paddingLeft:10, paddingRight: 10, paddingBottom: 5 }}>
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
                <Form.Group onChange={handleGroupPasswordChange} style={{margin:0, paddingTop:2, paddingBottom:2}}>
                    <Form.Control placeholder="Enter custom password" />
                </Form.Group>
              </Col>
            )}
        </Row>
      </Col>
    </Row>
  );
}

export default AddPassword;
