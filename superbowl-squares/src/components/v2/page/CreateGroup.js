import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

export function CreateGroup() {

    let navigate = useNavigate(); 
    const superBowlSquares = () => { 
        navigate('/super-bowl-squares');
    }

    return (
        <Container>
            <Row style={fullHeight()}>
                <Row>
                    <br/>
                </Row>
                <Row>
                    <Col style={center()}>
                        <h1>
                            Create a Group
                        </h1>
                    </Col>
                </Row>
                <Row style={wide()}>
                    <Col style={wide()}>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Group Code</Form.Label>
                                <Form.Control placeholder="Enter custom group code" />
                                <Form.Text className="text-muted">
                                    This is optional. If you leave this blank, 
                                    a group code will be generated for you.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control placeholder="Enter custom password" />
                                <Form.Text className="text-muted">
                                    This is optional. If you leave this blank, 
                                    anyone with the link to your game will be able to edit squares.
                                </Form.Text>
                        </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col style={center()}>
                        <Button style={black()} onClick={superBowlSquares}>
                                Start a New Game
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
            textAlign:'center',
        }
    }

    function wide() {
        return {
            'width':'75vw',
            margin:0,
            padding:0
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
}