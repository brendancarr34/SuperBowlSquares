import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { PaymentBreakdownEditor } from './components/PaymentBreakdownEditor';

import { fullHeight } from '../../common/style/CommonStyles';

export function EditPaymentBreakdown() {

    const location = useLocation();
    let groupName =  location.state.groupName;

    let navigate = useNavigate(); 

    const handleGoBack = () => {
        // TODO - pass back updated group info 
        // (should pass back and forth as much as possible to prevent re-loading from db everytime)
        navigate('/edit-group-preferences', {
          replace: true,
          state: { groupName: groupName }
        });
      };

    return (
        <Container>
            <Row style={height85()}>
                <Row style={spacer()}/>
                <Row style={pageTitleSection()}>
                    <Col>
                        <h1 style={center()}>
                            Payment Breakdown
                        </h1>
                    </Col>
                </Row>
                <Row style={middleSection()}>
                    <PaymentBreakdownEditor/>
                </Row>
                <Row style={buttonSection()}>
                <Row style={{padding:0, margin:0}}>
                        <Col style={center()}>
                            <Button 
                                style={blackButton()} 
                                onClick={console.log("save")}
                                >
                                    Save Changes
                            </Button>
                        </Col>
                    </Row>
                    <Row style={{padding:0, margin:0}}>
                        <Col style={center()}>
                            <Button 
                                style={backButton()} 
                                onClick={handleGoBack}>
                                    Go Back
                            </Button>
                        </Col>
                    </Row>
                </Row>
            </Row>
        </Container>
    )

    function center() {
        return {
            textAlign: 'center',
            justifyContent: 'center'
        }
    }

    function blackButton() {
        return {
            backgroundColor: "black",
            border: 'black',
            width: '75vw',
            padding: 15
        }
    }

    function backButton() {
        return {
            backgroundColor: "lightgray",
            color: 'black',
            border: 'black',
            width: '75vw',
            padding: 5,
            margin: 0
        }
    }

    function lowerText() {
        return {
            position: 'absolute',
            bottom: '0',
            width: '100%',
            textAlign: 'center'
        }
    }

    function buttonSection() {
        return {
            height: '14vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin:0
        }
    }

    function pageTitleSection() {
        return {
            height: '9vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }
    }

    function spacer() {
        return {
            height: '4vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }
    }

    function middleSection() {
        return {
            height: '58vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding:0,
            margin:0
        }
    }

    function height85() {
        return {
            height: '85vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }
}