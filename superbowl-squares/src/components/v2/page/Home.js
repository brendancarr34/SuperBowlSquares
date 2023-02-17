import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

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
                                <Button style={black()} onClick={createGroup}>
                                    Create a Group
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <br/>
                        </Row>
                        <Row>
                            <Col>
                                <Button style={black()} onClick={joinGroup}>
                                        Join a Group
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={center()}>
                    <p style={lowerText()}>by brendan carr</p>
                </Row>
            </Row>
        </Container>
    )

    function center() {
        return {
            textAlign:'center',
            'justify-content':'center'
        }
    }

    function lowerText() {
        return {
            'position': 'absolute',
            'bottom': '0',
            'width': '100%',
            'text-align': 'center'
        }
    }

    function black() {
        return {
            'backgroundColor':'black',
            'padding':20,
            'border':'black',
            width:155
        }
    }

    function fullHeight() {
        return {
            height:'90vh',
            display: 'flex', 
            'justify-content': 'center', 
            'align-items': 'center'
        }
    }
}