import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";


function UpdatePaymentInfoAndLedger({groupId}) {

    let navigate = useNavigate(); 

    const handleEditPaymentBreakdownClick = () => {
        // TODO - pass payment info from here so no need to hit api again
        navigate('/edit-payment-breakdown', {
            replace: true,
            state: { groupName: groupId }
          });
    }
  
    return (
        <Row style={{padding:0, margin:0, width:'100%'}} >
            <Col style={{padding:0, margin:0, width:'100%', paddingRight:2.5}}>
                <Button 
                    style={backButton()}
                    onClick={handleEditPaymentBreakdownClick}
                >
                    Edit Payment<br/>Breakdown
                </Button>
            </Col>
            <Col style={{padding:0, margin:0, width:'100%', paddingLeft:2.5}}>
                <Button 
                    style={backButton()}
                >
                    Edit Payment<br/>Ledger
                </Button>
            </Col>
        </Row>
    )
  };

  function backButton() {
    return {
        backgroundColor: "lightgray",
        color: 'black',
        border: 'black',
        width: '100%',
        padding: 10,
        margin:0
    }
}

export default UpdatePaymentInfoAndLedger;