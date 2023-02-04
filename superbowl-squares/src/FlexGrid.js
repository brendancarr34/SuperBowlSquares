import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { ButtonRow } from './ButtonRow.js';
import { NumberRow } from './NumberRow.js';

function unknownNumber() {
    return {
        display: 'flex', 
        'justify-content': 'center', 
        'align-items': 'center', 
        backgroundColor: 'gray', 
        color: 'black'
    }
}

function center() {
    return {textAlign:'center'}
}

export function FlexGrid() {
    return (
        <Container>
            <Row>
                <Col style={center()}>
                    <h1>Super Bowl Squares</h1>
                </Col>
            </Row>
            <Row>
                <Col style={unknownNumber()}></Col>
                <Col style={unknownNumber()}></Col>
                <Col style={unknownNumber()}>
                    <Table style={{'padding':0, 'margin':0}}>
                        <tbody style={{'padding':0, 'margin':0}}>
                            <NumberRow />
                            <ButtonRow />
                            <ButtonRow />
                            <ButtonRow />
                            <ButtonRow />
                            <ButtonRow />
                            <ButtonRow />
                            <ButtonRow />
                            <ButtonRow />
                            <ButtonRow />
                            <ButtonRow />
                        </tbody>
                    </Table>
                </Col>
                <Col style={unknownNumber()}></Col>
                <Col style={unknownNumber()}></Col>
            </Row>
            <Row>
                <Col>
                    <div>
                        <p style={{'color':'white'}}>test</p>
                    </div>
                </Col>
            </Row>
            <Row style={{'padding':10, 'margin':10}}>
                <Button style={{}}>Submit</Button>
            </Row>
        </Container>
    );
}

export default FlexGrid;