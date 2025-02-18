import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { fullHeight } from '../../common/style/CommonStyles';
import { api_url } from '../../../config';
import axios from 'axios';

export function Home() {

    const [betaPasswordInput, setBetaPasswordInput] = useState('');
    const [showBetaAccessModal, setShowBetaAccessModal] = useState(false);
    const [showIncorrectBetaPassword, setShowIncorrectBetaPassword] = useState(false);

    let navigate = useNavigate(); 

    const createGroup = () => {
        setShowBetaAccessModal(true);
    }

    const handleBetaPasswordInputChange = (e) => {
        setBetaPasswordInput(e.target.value)
    }


    const checkBetaAccess = async () => {

        setShowIncorrectBetaPassword(false);
        try {
            const url = api_url + 'api/beta-access/' +  betaPasswordInput;
            console.log(url);
            await axios.get(url);

            navigate('/create-group', {state: {betaPasswordInput: betaPasswordInput}});
        }
        catch (error)
        {
            setShowIncorrectBetaPassword(true);
        }
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

            <Modal show={showBetaAccessModal} onHide={() => {setShowBetaAccessModal(false);setShowIncorrectBetaPassword(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Beta Access Only</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <p>
                                Some of the group administrator features still have bugs. 
                                If you want to create a group, reach out to me, Brendan 
                                Carr, for a beta password and I'll let you know what to 
                                look out for.
                            </p>
                            <br/>
                        </Col>
                    </Row>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Control 
                                placeholder='Beta Password'
                                onChange={handleBetaPasswordInputChange}
                                value={betaPasswordInput}
                                />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {
                        showIncorrectBetaPassword &&
                        <p style={{color:'red'}}>Incorrect Beta Password</p>
                    }
                    <Button onClick={checkBetaAccess} style={{backgroundColor:'#4682b4', border:'none'}}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
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