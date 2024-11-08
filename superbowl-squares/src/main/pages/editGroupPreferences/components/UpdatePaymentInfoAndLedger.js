import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";


function UpdatePaymentInfoAndLedger({groupId}) {

    let navigate = useNavigate(); 


  
    return (
        <Row style={{padding:0, margin:0, width:'100%'}} >
            <Col style={{padding:0, margin:0, width:'100%', paddingRight:2.5}}>
                <Button 
                    style={backButton()}
                >
                    Payment<br/>Breakdown
                </Button>
            </Col>
            <Col style={{padding:0, margin:0, width:'100%', paddingLeft:2.5}}>
                <Button 
                    style={backButton()}
                >
                    Payment<br/>Ledger
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