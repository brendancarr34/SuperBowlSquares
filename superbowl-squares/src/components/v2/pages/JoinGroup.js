import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

export function JoinGroup() {
    return (
        <Container>
            <Row style={fullHeight()}>
                <Row>
                    <br/>
                </Row>
                <Row>
                    <Col style={center()}>
                        <h1>
                            Join a Group
                        </h1>
                    </Col>
                </Row>
                <Row style={wide()}>
                    <Col style={wide()}>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Group Code</Form.Label>
                                <Form.Control placeholder="" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="" />
                        </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col style={center()}>
                        <Button style={black()}>
                            <Link to='/super-bowl-squares' style={link()}>
                                Join a Game
                            </Link>
                        </Button>
                    </Col>
                </Row>
            </Row>
        </Container>
    )

    function fullHeight() {
        return {
            height:'90vh',
            display: 'flex', 
            'justify-content': 'center', 
            'align-items': 'center'
        }
    }

    function center() {
        return {
            textAlign:'center'
        }
    }

    function black() {
        return {
            backgroundColor:"black",
            'border':'black',
            'width':'75vw',
            padding:20
        }
    }

    function link() {
        return {
            color:'white',
            'text-decoration': 'none'
        }
    }

    function wide() {
        return {
            'width':'75vw',
            margin:0,
            padding:0
        }
    }
}