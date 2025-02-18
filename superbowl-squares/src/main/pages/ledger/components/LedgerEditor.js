import React, { useState } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import ScrollableList from './ScrollableList';

export function LedgerEditor({ items, updateItems }) {

    return (
        <Row style={center2()}>
            <Row>
                <p style={{padding:0}}>
                    Use this page to keep track of which members of your group have paid for their squares.
                </p>
            </Row>
            <Row style={{ display: "grid", gridTemplateColumns: "35% 10% 15% 40%", paddingBottom:10 }}>
                <Col>
                    Name
                </Col>
                <Col style={{padding:0}}>
                    #
                </Col>
                <Col>
                    Paid?
                </Col>
                <Col>
                    Notes
                </Col>
            </Row>
            <Row>
                <ScrollableList items={items} updateItems={updateItems}/>
            </Row>
            <Row>
                <br/>
            </Row>
            {/* <Row>
                <Col style={leftColumn2()}>
                    <h4>
                        Total
                    </h4>
                </Col>
                <Col style={rightColumn2()}>
                    <h4>
                        {Number(q1Payout) + Number(q2Payout) + Number(q3Payout) + Number(q4Payout)}
                    </h4>
                </Col>
                <Col style={rightColumn()}>
                    <p></p>
                </Col>
            </Row> */}
            {/* <Row>
                <br/>
            </Row> */}

            <style>
                {`
                /* Hide the stepper buttons for Chrome, Safari, Edge, and Opera */
                input[type="number"]::-webkit-outer-spin-button,
                input[type="number"]::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }

                /* Hide the stepper buttons for Firefox */
                input[type="number"] {
                    -moz-appearance: textfield;
                }
                `}
            </style>
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
            // paddingRight:'30px'
        }
    }

    function leftColumn() {
        return {
            display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center',
            flex:'35%',
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
            flex: '40%',
            // padding:0,
            // margin:0
        }
    }

    function middleColumn() {
        return {
            display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center',
            justifyContent: 'right',
            alignItems: 'right',
            flex: '25%',
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
            flex: '25%',
            // padding:0,
            // margin:0
        }
    }
}