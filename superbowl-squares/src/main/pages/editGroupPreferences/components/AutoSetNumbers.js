// AutoSetNumbers.js
import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../style/AutoSetNumbersComponent.css';

function AutoSetNumbers({ autoSetNumbers, handleToggleChange }) {

  const handleToggle = () => {
    handleToggleChange(!autoSetNumbers); // Call the function passed from parent
  };

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
                checked={autoSetNumbers}
                onChange={handleToggle}
              />
            </label>
            <span>Auto-randomize Numbers?</span>
          </div>
        </Row>
      </Col>
    </Row>

  );
}

export default AutoSetNumbers;
