// AutoSetNumbers.js
import React, { useState} from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../style/AutoSetNumbersComponent.css'

function AddVenmoInfo({ addVenmoInfo, handleAddVenmoInfoToggleChange, handleSetVenmoUsername, handleSetVenmoPaymentInfo }) {

  const handleToggle = () => {
    handleAddVenmoInfoToggleChange(!addVenmoInfo); // Call the function passed from parent
  };

  const handleVenmoInfoChange = (e) => {
    const venmoInfo = e.target.value;
    handleSetVenmoUsername(venmoInfo);
  }

  const handleVenmoPaymentChange = (e) => {
    const paymentInfo = e.target.value;
    handleSetVenmoPaymentInfo(paymentInfo);
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
                checked={addVenmoInfo}
                onChange={handleToggle}
              />
            </label>
            <span>Add Venmo Info?</span>
          </div>
        </Row>
        <Row>
          {addVenmoInfo && (
              <Col>
                <Form.Group onChange={handleVenmoInfoChange} style={{margin:0, paddingTop:2, paddingBottom:2}}>
                    <Form.Control placeholder="Venmo username" />
                </Form.Group>
                <Form.Group onChange={handleVenmoPaymentChange} style={{margin:0, paddingTop:2, paddingBottom:2}}>
                    <Form.Control placeholder="Price per square" />
                </Form.Group>
              </Col>
            )}
        </Row>
      </Col>
    </Row>
  );
}

export default AddVenmoInfo;
