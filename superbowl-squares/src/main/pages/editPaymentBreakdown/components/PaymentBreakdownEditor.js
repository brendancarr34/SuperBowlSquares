import React, { useState } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

export function PaymentBreakdownEditor() {


    const [q1Payout, setq1Payout] = useState(0);
    const handleQ1PayoutChange = (e) => {
        let paymentInfo = e.target.value;
        paymentInfo = paymentInfo.replace(/[^0-9.]/g, '');
        const decimalIndex = paymentInfo.indexOf('.');
        if (decimalIndex !== -1) {
            // Limit to two decimal places
            paymentInfo = paymentInfo.slice(0, decimalIndex + 3);
        }
        setq1Payout(paymentInfo);
        // handleSetVenmoPaymentInfo(paymentInfo);
    }

    return (
        <Row style={center2()}>
            <Row>
                <p>
                    You can let your group know what the payout is for each quarter of your game here.
                </p>
            </Row>
            <Row style={center()}>
                <Col style={leftColumn()}>
                    <h2>
                        Q1
                    </h2>
                </Col>
                <Col style={rightColumn()}>
                    <Row>
                        <Form.Group>
                            {/* <span style={{ 
                                position: 'absolute', 
                                left: 100, 
                                top: '10%', 
                                transform: 'translateY(-50%)' 
                                }}>$</span> */}
                            <Form.Control 
                                placeholder="" 
                                defaultValue={0}
                                type="number"
                                // step="1"
                                onChange={handleQ1PayoutChange}
                                value={q1Payout}
                                // style={{ paddingLeft: 25 }}
                            />
                        </Form.Group>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col style={leftColumn()}>
                    <h2>
                        Q2
                    </h2>
                </Col>
                <Col style={rightColumn()}>
                    <Form.Group>
                        <Form.Control placeholder="" defaultValue={0}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col style={leftColumn()}>
                    <h2>
                        Q3
                    </h2>
                </Col>
                <Col style={rightColumn()}>
                    <Form.Group>
                        <Form.Control placeholder="" defaultValue={0}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col style={leftColumn()}>
                    <h2>
                        Q4
                    </h2>
                </Col>
                <Col style={rightColumn()}>
                    <Form.Group>
                        <Form.Control placeholder="" defaultValue={0}/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col style={leftColumn2()}>
                    <h2>
                        Total
                    </h2>
                </Col>
                <Col style={rightColumn2()}>
                    <h2>
                        {q1Payout}
                    </h2>
                </Col>
            </Row>
            <Row>
                <br/>
            </Row>
        </Row>
    )

    function center() {
        return {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width:'100%'
        }
    }

    function center2() {
        return {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height:'100%',
            paddingRight:'30px'
        }
    }

    function leftColumn() {
        return {
            display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center',
            flex:'20%',
            // padding:0,
            // margin:0
        }
    }

    function rightColumn() {
        return {
            display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center',
            justifyContent: 'right',
            alignItems: 'right',
            flex: '80%',
            // padding:0,
            // margin:0
        }
    }

    function leftColumn2() {
        return {
            display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center',
            flex:'35%',
            // padding:0,
            // margin:0
        }
    }

    function rightColumn2() {
        return {
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'right',
            flex: '65%',
            // padding:0,
            // margin:0
        }
    }
}