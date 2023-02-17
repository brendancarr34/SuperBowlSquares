import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { EditBoardRow } from './EditBoardRow.js';
import { NumberRow } from '../NumberRow.js';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

export function EditBoard() {

    const topNumbers = ['?', '?', '?', '?', '?', '?', '?', '?', '?', '?'];
    const sideNumbers = ['?', '?', '?', '?', '?', '?', '?', '?', '?', '?'];
    const row1 = [false, false, false, false, false, false, false, false, false, false];
    const row2 = [false, false, false, false, false, false, false, false, false, false];
    const row3 = [false, false, false, false, false, false, false, false, false, false];
    const row4 = [false, false, false, false, false, false, false, false, false, false];
    const row5 = [false, false, false, false, false, false, false, false, false, false];
    const row6 = [false, false, false, false, false, false, false, false, false, false];
    const row7 = [false, false, false, false, false, false, false, false, false, false];
    const row8 = [false, false, false, false, false, false, false, false, false, false];
    const row9 = [false, false, false, false, false, false, false, false, false, false];
    const row0 = [false, false, false, false, false, false, false, false, false, false];

    let navigate = useNavigate();
    const viewSquares = () => { 
        navigate('/super-bowl-squares', { replace: true });
    }

    return (
        <Container>
            <Row style={fullHeight()}>
                <Row>
                    <Col style={center()}>
                        <h1 style={{'padding':15}}>Claim Squares</h1>
                    </Col>
                </Row>
                <Row>
                    <Col/>
                    <Col/>
                    <Col style={unknownNumber()}>
                        <Table style={{'padding':0, 'margin':0}}>
                            <tbody>
                                <NumberRow numbers={topNumbers}/>
                                <p/>
                                <EditBoardRow number={sideNumbers[0]}/>
                                <EditBoardRow number={sideNumbers[1]}/>
                                <EditBoardRow number={sideNumbers[2]}/>
                                <EditBoardRow number={sideNumbers[3]}/>
                                <EditBoardRow number={sideNumbers[4]}/>
                                <EditBoardRow number={sideNumbers[5]}/>
                                <EditBoardRow number={sideNumbers[6]}/>
                                <EditBoardRow number={sideNumbers[7]}/>
                                <EditBoardRow number={sideNumbers[8]}/>
                                <EditBoardRow number={sideNumbers[9]}/>
                            </tbody>
                        </Table>
                    </Col>
                    <Col/>
                    <Col/>
                </Row>
                <Row>
                    <br/>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Control placeholder="First & Last Name" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control placeholder="Initials" />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col>
                        <Button disabled={false} style={black()} onClick={viewSquares}>
                            Submit
                        </Button>
                    </Col>
                </Row>
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
        color: 'black',
        padding: 15
    }
}

function fullHeight() {
    return {
        height:'85vh',
        display: 'flex', 
        'justify-content': 'center', 
        'align-items': 'center'
    }
}

function center() {
    return {
        textAlign:'center',
        width:'100%'
    }
}

function black() {
    return {
        backgroundColor:"black",
        'border':'black',
        padding: 0,
        width:'100%',
        height:'85%'
    }
}