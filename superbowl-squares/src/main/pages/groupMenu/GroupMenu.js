// CreateGroupPreferences.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { api_url} from '../../../config';
import Modal from 'react-bootstrap/Modal';
import { fullHeight } from '../../common/style/CommonStyles';

export function GroupMenu() {

    const location = useLocation();
    let groupName = location.state.groupName;

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/super-bowl-squares', { state: { groupName: groupName } });
    }

    return (
        <Container>
            <Row style={fullHeight()}>
                <Row style = {heightTop()}/>
                <Row style = {height15_top()}>
                    <Col style={center()}>
                        <h1>Group Menu</h1>
                        <p>groupName: {groupName}</p>
                    </Col>
                </Row>
                <Row style = {height70()}>
                    <Row>
                        <Col style={center()}>
                            <h1>💲 Payment Info</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={center()}>
                            <h1>📲 Share Game Link</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={center()}>
                            <h1>ℹ️ How to Play</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={center()}>
                            <h1>👨‍💻 Reach out to the Developer</h1>
                        </Col>
                    </Row>
                    {/* <Row>
                        <Col style={center()}>
                            <h1></h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={center()}>
                            <h1></h1>
                        </Col>
                    </Row> */}
                </Row>
                <Row style = {height15_bottom()}>
                    <Col style={center()}>
                        <Button 
                            style={backButton()} 
                            onClick={handleGoBack}
                            >
                                Back
                        </Button>
                    </Col>
                </Row>
            </Row>

            {/* Error Modal for API Failure */}
            {/* <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{error}</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal> */}
        </Container>
    )

    function height15_bottom() {
        return {
            height: '16vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }

    function height15_top() {
        return {
            height: '10vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }
    }

    function heightTop() {
        return {
            height: '6vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }
    }

    function height70() {
        return {
            height: '54vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }

    function center() {
        return {
            textAlign: 'center',
            margin: 0,
            padding: 0
        }
    }

    function backButton() {
        return {
            backgroundColor: "lightgray",
            color: 'black',
            border: 'black',
            width: '75vw',
            padding: 10
        }
    }
}
