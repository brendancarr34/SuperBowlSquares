import React from 'react';
import { useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { fullHeight } from '../../common/style/CommonStyles';

export function Home() {

    let navigate = useNavigate(); 
    const createGroup = () => { 
        navigate('/create-group');
    }
    const joinGroup = () => {
        navigate('/join-group');
    }

    return (
        <Container>
            <Row style={fullHeight()}>
                <Row>
                    <br/>
                </Row>
                <Row>
                    <Col>
                        <h1 style={center()}>
                            Super Simple<br/>Super Bowl<br/>Squares
                        </h1>
                    </Col>
                </Row>
                <Row>
                    <br/>
                </Row>
                <Row>
                    <Col style={center()}>
                        <Row>
                            <Col>
                                <Button style={blackButton()} onClick={createGroup}>
                                    Create a Group
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <br/>
                        </Row>
                        <Row>
                            <Col>
                                <Button style={blackButton()} onClick={joinGroup}>
                                    Join a Group
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    {/* TODO - add 'How to Play */}
                </Row>
                <Row style={center()}>
                    <p style={lowerText()}>by Brendan Carr</p>
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
            backgroundColor: '#4682b4',
            padding: 20,
            border: 'black',
            width: 155
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
}