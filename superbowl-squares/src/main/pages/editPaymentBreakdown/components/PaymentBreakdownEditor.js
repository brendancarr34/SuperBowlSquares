import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

export function PaymentBreakdownEditor({ breakdown, setBreakdown }) {
    const handlePayoutChange = (quarter, value) => {
        value = value.replace(/[^0-9.]/g, ''); // Ensure numeric values
        const decimalIndex = value.indexOf('.');
        if (decimalIndex !== -1) {
            value = value.slice(0, decimalIndex + 3); // Limit to two decimal places
        }
        setBreakdown({ ...breakdown, [quarter]: value });
    };

    return (
        <Row style={{ height: '100%', paddingRight: '30px', justifyContent: 'center', alignItems: 'center' }}>
            <Row>
                <p>Update the payout for each quarter of your game here:</p>
            </Row>
            {['q1Payout', 'q2Payout', 'q3Payout', 'q4Payout'].map((quarter, index) => (
                <Row key={quarter} style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <Col style={{ flex: '35%' }}>
                        <h2>Q{index + 1}</h2>
                    </Col>
                    <Col style={{ flex: '25%' }}>
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
                            <Form.Control placeholder="Winner" />
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
                        {Object.values(breakdown)
                            .map(Number)
                            .reduce((a, b) => a + b, 0)}
                    </h4>
                </Col>
            </Row>
        </Row>
    );
}
