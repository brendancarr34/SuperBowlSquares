import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { PaymentBreakdownEditor } from './components/PaymentBreakdownEditor';

import Modal from 'react-bootstrap/Modal';
import { api_url } from '../../../config';

export function EditPaymentBreakdown() {
    const location = useLocation();
    const groupName = location.state.groupName;
    const existingPaymentBreakdown = location.state.existingPaymentBreakdown;

    const [paymentBreakdown, setPaymentBreakdown] = useState(existingPaymentBreakdown);

    const [isSaving, setIsSaving] = useState(false);
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/edit-group-preferences', {
            replace: true,
            state: { groupName },
        });
    };

    const handleSaveBreakdown = async () => {
        setIsSaving(true);
        const url = `${api_url}api/group/api/updatePaymentBreakdown/${groupName}`;

        try {
            const response = await axios.post(url, { paymentBreakdown });
            if (response.status === 200) {
                console.log(response.data.message || 'Payment breakdown saved successfully');
            } else {
                console.error(response.data.error || 'Failed to update payment breakdown');
            }
        } catch (error) {
            console.error('Error updating payment breakdown:', error.message);
        } finally {
            setIsSaving(false);
            navigate('/edit-group-preferences', {
                replace: true,
                state: { groupName },
            });
        }
    };

    return (
        <Container>
            <Row style={{ height: '85vh', justifyContent: 'center', alignItems: 'center' }}>
                <Row style={{ height: '4vh' }} />
                <Row style={{ height: '9vh', justifyContent: 'center', alignItems: 'center' }}>
                    <Col>
                        <h1 style={{ textAlign: 'center' }}>Payment Breakdown</h1>
                    </Col>
                </Row>
                <Row style={{ height: '58vh', justifyContent: 'center', alignItems: 'center' }}>
                    <PaymentBreakdownEditor 
                        breakdown={paymentBreakdown}
                        setBreakdown={setPaymentBreakdown}
                    />
                </Row>
                <Row style={{ height: '14vh', justifyContent: 'center', alignItems: 'center' }}>
                    <Col style={{ textAlign: 'center' }}>
                        <Button style={{ backgroundColor: 'black', width: '75vw', border:'none' }} onClick={handleSaveBreakdown}>
                            Save Changes
                        </Button>
                    </Col>
                    <Col style={{ textAlign: 'center' }}>
                        <Button style={{ backgroundColor: 'lightgray', color: 'black', width: '75vw', border:'none' }} onClick={handleGoBack}>
                            Go Back
                        </Button>
                    </Col>
                </Row>
            </Row>

            <Modal show={isSaving}>
                <Modal.Body>Saving...</Modal.Body>
            </Modal>
        </Container>
    );
}
