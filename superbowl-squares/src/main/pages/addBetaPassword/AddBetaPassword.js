import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import axios from 'axios';
import { api_url} from '../../../config.js';

export function AddBetaPassword() {

    const [betaPasswordInput, setBetaPasswordInput] = useState('');
    const [godPasswordInput, setGodPasswordInput] = useState('')
    const [apiError, setApiError] = useState('');

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const handleBetaPasswordInputChange = (e) => {
        setBetaPasswordInput(e.target.value);
    }

    const handleGodPasswordInputChange = (e) => {
        setGodPasswordInput(e.target.value);
    }

    const handleSubmit = async () => {
        try {
            const url = api_url + 'api/beta-access/add/' + betaPasswordInput + '/' + godPasswordInput;
            await axios.get(url);

            setShowSuccessModal(true);
        }
        catch (error)
        {
            setApiError(error.response.data.error);
            setShowErrorModal(true);
        }
    }

    return (
        <Container>
            <Col style={{height:'100vh'}}>
                <Row style={{display:'flex', textAlign: 'center',paddingTop:'30px'}}>
                    <h3>
                        Add Beta Password
                    </h3>
                </Row>
                <Row style={{display:'flex', textAlign: 'center',}}>
                    <Form.Group onChange={handleBetaPasswordInputChange} style={{padding:'10px 0px 10px 0px'}}>
                        <Form.Control
                            placeholder="New Beta Password"
                        />
                    </Form.Group>

                </Row>
                <Row style={{display:'flex', textAlign: 'center',}}>
                    <Form.Group onChange={handleGodPasswordInputChange} type="password" style={{padding:'0px 0px 10px 0px'}}>
                        <Form.Control
                            placeholder="God Password"
                        />
                    </Form.Group>
                </Row>
                <Row style={{display:'flex', textAlign: 'center',}}>
                    <Button style={{padding:'20px 0px 20px 0px'}}
                        onClick={handleSubmit}>
                        Submit
                    </Button>
                </Row>
            </Col>

            <Modal show={showSuccessModal} onHide={() => {setShowSuccessModal(false)}}>
                <Modal.Body>
                    Success
                </Modal.Body>
            </Modal>

            <Modal show={showErrorModal} onHide={() => {setShowErrorModal(false)}}>
                <Modal.Body>
                    Error: {apiError}
                </Modal.Body>
            </Modal>
        </Container>
    )
}