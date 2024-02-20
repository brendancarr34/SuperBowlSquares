import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate, useLocation } from "react-router-dom";

export function SetNumbersAndTeams() {

    const location = useLocation();
    let groupName =  location.state.groupName;

    let navigate = useNavigate(); 
    const handleSetNumbers = () => {
        navigate('/set-numbers', { 
            replace: true, 
            state: {
                groupName: groupName
            } 
        });
    }

    return (
        <Container>
            <Row style={fullHeight()}>
                <Col style={center()}>
                    <Row style={center()}>
                        <h1>
                            SetNumbersAndTeams
                        </h1>
                        <p>
                            group: {groupName}
                        </p>
                    </Row>
                    <Row>
                        <Col>
                            <Button style={blackButton()}>
                                Set Teams
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <br/>
                    </Row>
                    <Row>
                        <Col>
                            <Button style={blackButton()} onClick={handleSetNumbers}>
                                Set Numbers
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )

    function fullHeight() {
        return {
            height:'90vh',
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center'
        }
    }

    function center() {
        return {
            textAlign:'center',
            height: '30vh'
        }
    }

    function blackButton() {
        return {
            backgroundColor: 'black',
            padding: 20,
            border: 'black',
            width: 155
        }
    }
}