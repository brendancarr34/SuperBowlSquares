// AutoSetNumbers.js
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import '../style/AutoSetNumbersComponent.css';

function UpdateVenmoInfo({ 
    addVenmoInfo, 
    handleAddVenmoInfoToggleChange, 
    handleSetVenmoUsername, 
    handleSetVenmoPaymentInfo,
    existingVenmoUserName,
    existingPaymentAmount
  }) {

  const handleToggle = () => {
    handleAddVenmoInfoToggleChange(!addVenmoInfo);
  };

  const handleVenmoInfoChange = (e) => {
    const venmoInfo = e.target.value;
    handleSetVenmoUsername(venmoInfo);
  }

  const [venmoUsername, setVenmoUserName] = useState('')
  const [price, setPrice] = useState('');

  const handleVenmoPaymentChange = (e) => {
    let paymentInfo = e.target.value;
    paymentInfo = paymentInfo.replace(/[^0-9.]/g, '');
    const decimalIndex = paymentInfo.indexOf('.');
    if (decimalIndex !== -1) {
        // Limit to two decimal places
        paymentInfo = paymentInfo.slice(0, decimalIndex + 3);
    }
    setPrice(paymentInfo);
    handleSetVenmoPaymentInfo(paymentInfo);
  }

  useEffect(() => {
    
    setVenmoUserName(existingVenmoUserName);
    setPrice(existingPaymentAmount);
  }, [existingVenmoUserName, existingPaymentAmount]);


    // Tooltip text
    const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        Add your Venmo information and the price-per-square so your friends can easily pay for their squares.
      </Tooltip>
    );


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
            <span>Venmo Info</span>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <span style={{ marginLeft: '5px', cursor: 'pointer', color: 'blue' }}>ℹ</span>
            </OverlayTrigger>
          </div>
        </Row>
        <Row>
          {addVenmoInfo && (
              <Col>
                <Form.Group onChange={handleVenmoInfoChange} style={{margin:0, paddingTop:2, paddingBottom:2}}>
                    <Form.Control placeholder="Venmo username" defaultValue={venmoUsername}/>
                </Form.Group>
                <Form.Group style={{ margin: 0, paddingTop: 2, paddingBottom: 2 }}>
                    <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }}>$</span>
                        <Form.Control
                            type="number"
                            step="0.01"
                            placeholder="Price per square"
                            value={price}
                            onChange={handleVenmoPaymentChange}
                            style={{ paddingLeft: 25 }}
                        />
                    </div>
                </Form.Group>
              </Col>
            )}
        </Row>
      </Col>
    </Row>
  );
}

export default UpdateVenmoInfo;
