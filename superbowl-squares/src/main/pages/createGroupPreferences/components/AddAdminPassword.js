// AutoSetNumbers.js
import React, { useState} from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import '../style/AutoSetNumbersComponent.css';

function AddAdminPassword({ addAdminPassword, handleAddAdminPasswordToggleChange, handleSetAdminPassword, handleSubmit }) {

  const handleToggle = () => {
    handleAddAdminPasswordToggleChange(!addAdminPassword); // Call the function passed from parent
  };

  const handleAdminPasswordChange = (e) => {
    const newPassword = e.target.value;
    handleSetAdminPassword(newPassword);
  }

  // Tooltip text
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Check this box to add an admin password for the group. 
      This is recommended to prevent anyone in your group from making changes to group settings.
      <br/>
      <br/>
      This app is not very secure, so don't make this a sensitive password.
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
                checked={addAdminPassword}
                onChange={handleToggle}
              />
            </label>
            <span>Add Admin Password?</span>
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
          {addAdminPassword && (
              <Col>
                <Form.Group onChange={handleAdminPasswordChange} style={{margin:0, paddingTop:2, paddingBottom:2}}>
                    <Form.Control 
                      placeholder="Enter custom password"
                      onKeyDown={handleSubmit} />
                </Form.Group>
              </Col>
            )}
        </Row>
      </Col>
    </Row>
  );
}

export default AddAdminPassword;
