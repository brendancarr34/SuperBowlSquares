import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

export function PaymentBreakdownEditor({ breakdown, setBreakdown }) {

    const payoutKeys = Object.keys(breakdown).filter(key => key.endsWith('Payout'));

    const [totalPayout, setTotalPayout] = useState(() => {
        return payoutKeys.reduce((sum, key) => sum + parseFloat(breakdown[key] || 0), 0);
    });

    const handlePayoutChange = (quarter, value) => {
        value = value.replace(/[^0-9.]/g, ''); // Ensure numeric values
        const decimalIndex = value.indexOf('.');
        if (decimalIndex !== -1) {
            value = value.slice(0, decimalIndex + 3); // Limit to two decimal places
        }
        setBreakdown({ ...breakdown, [quarter]: value });
        // setTotalPayout(payoutKeys.reduce((sum, key) => sum + parseFloat(breakdown[key]), 0));
    };

    const handleWinnerChange = (index, value) => {
        setBreakdown({ ...breakdown, ['q' + (index+1) + 'Winner']: value });
    };

    useEffect(() => {
        // Update totalPayout whenever breakdown changes
        setTotalPayout(payoutKeys.reduce((sum, key) => sum + parseFloat(breakdown[key] || 0), 0));
    }, [breakdown]);

    return (
        <Row style={{ height: '100%', paddingRight: '30px', justifyContent: 'center', alignItems: 'center' }}>
            <Row>
                <p>Update the payout for each quarter of your game here:</p>
            </Row>
            {['q1Payout', 'q2Payout', 'q3Payout', 'q4Payout'].map((quarter, index) => (
                <Row key={quarter} style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <Col style={{ flex: '30%' }}>
                        <h2>Q{index + 1}</h2>
                    </Col>
                    <Col style={{ flex: '30%' }}>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                placeholder="$"
                                value={breakdown[quarter]}
                                onChange={(e) => handlePayoutChange(quarter, e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col style={{ flex: '40%' }}>
                        <Form.Group>
                            <Form.Control 
                                type="text"
                                placeholder="Winner"
                                value={breakdown['q' + (index+1) + 'Winner']}
                                onChange={(e) => handleWinnerChange(index, e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>
            ))}
            <Row>
                <Col style={{ flex: '35%' }}>
                    <h4>Total</h4>
                </Col>
                <Col style={{ flex: '25%' }}>
                    <h4>
                        {totalPayout.toFixed(2)} {/* Display to two decimal places */}
                    </h4>
                </Col>
            </Row>
        </Row>
    );
}
