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

    const handleEditLedgerClick = () => {
        navigate('/ledger', {
            replace: true,
            state: { groupName: groupId}
        })
    }
  
    return (
        <Row style={{padding:0, margin:0, width:'100%'}} >
            <Col style={{padding:0, margin:0, width:'100%', paddingRight:2.5}}>
                <Button 
                    style={backButton()}
                    onClick={handleEditPaymentBreakdownClick}
                >
                    Payment & <br/>Winners
                </Button>
            </Col>
            <Col style={{padding:0, margin:0, width:'100%', paddingLeft:2.5}}>
                <Button 
                    style={backButton()}
                    onClick={handleEditLedgerClick}
                >
                    Admin <br/>Ledger
                </Button>
            </Col>
        </Row>
    )
  };

  function backButton() {
    return {
        backgroundColor: "gray",
        color: 'white',
        border: 'none',
        width: '100%',
        padding: 10,
        margin:0
    }
}

export default UpdatePaymentInfoAndLedger;