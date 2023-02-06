import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { ButtonRow } from '../ButtonRow.js';
import { NumberRow } from '../NumberRow.js';
import { Link } from "react-router-dom";

export function EditBoard() {

    const topNumbers = ['?', '?', '?', '?', '?', '?', '?', '?', '?', '?'];
    const sideNumbers = ['?', '?', '?', '?', '?', '?', '?', '?', '?', '?'];

    return (
        <Container>
            <Row>
                <Col style={center()}>
                    <h1 style={{'padding':15}}>Super Bowl Squares</h1>
                </Col>
            </Row>
            <Row style={unknownNumber()}>
                <br/>
            </Row>
            <Row>
                <Col style={unknownNumber()}></Col>
                <Col style={unknownNumber()}></Col>
                <Col style={unknownNumber()}>
                    <Table style={{'padding':0, 'margin':0}}>
                        <tbody>
                            <NumberRow numbers={topNumbers}/>
                            <ButtonRow number={sideNumbers[0]}/>
                            <ButtonRow number={sideNumbers[1]}/>
                            <ButtonRow number={sideNumbers[2]}/>
                            <ButtonRow number={sideNumbers[3]}/>
                            <ButtonRow number={sideNumbers[4]}/>
                            <ButtonRow number={sideNumbers[5]}/>
                            <ButtonRow number={sideNumbers[6]}/>
                            <ButtonRow number={sideNumbers[7]}/>
                            <ButtonRow number={sideNumbers[8]}/>
                            <ButtonRow number={sideNumbers[9]}/>
                        </tbody>
                    </Table>
                </Col>
                <Col style={unknownNumber()}></Col>
                <Col style={unknownNumber()}></Col>
            </Row>
            <Row style={unknownNumber()}>
                <br/>
            </Row>
            <Row>
                <br/>
            </Row>
            <Row style={{'padding':10, 'margin':10}}>
                <Button style={black()}>
                    <Link to='/super-bowl-squares' style={link()}>
                        Submit
                    </Link>
                </Button>
            </Row>
        </Container>
    );
}

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

function black() {
    return {
        backgroundColor:"black",
        'border':'black'
    }
}

function link() {
    return {
        color:'white',
        'text-decoration': 'none'
    }
}