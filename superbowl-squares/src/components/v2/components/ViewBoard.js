import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { ViewBoardRow } from './ViewBoardRow.js';
import { NumberRow } from '../NumberRow.js';
import { Link } from "react-router-dom";

export function ViewBoard() {

    const topNumbers = ['?', '?', '?', '?', '?', '?', '?', '?', '?', '?'];
    const sideNumbers = ['?', '?', '?', '?', '?', '?', '?', '?', '?', '?'];

    return (
        <Container>
            <Row style={fullHeight()}>
                <Row>
                    <br/>
                </Row>
                <Row>
                    <Col style={center()}>
                        <h1 style={{'padding':15}}>Super Bowl Squares</h1>
                    </Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col style={unknownNumber()}>
                        <Table style={{'padding':0, 'margin':0}}>
                            <tbody>
                                <NumberRow numbers={topNumbers}/>
                                <ViewBoardRow number={sideNumbers[0]}/>
                                <ViewBoardRow number={sideNumbers[1]}/>
                                <ViewBoardRow number={sideNumbers[2]}/>
                                <ViewBoardRow number={sideNumbers[3]}/>
                                <ViewBoardRow number={sideNumbers[4]}/>
                                <ViewBoardRow number={sideNumbers[5]}/>
                                <ViewBoardRow number={sideNumbers[6]}/>
                                <ViewBoardRow number={sideNumbers[7]}/>
                                <ViewBoardRow number={sideNumbers[8]}/>
                                <ViewBoardRow number={sideNumbers[9]}/>
                            </tbody>
                        </Table>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <br/>
                </Row>
                <Row>
                    <Button style={black()}>
                        <Link to='/claim-squares' style={link()}>
                            Claim Squares
                        </Link>
                    </Button>
                </Row>
            </Row>
        </Container>

    );

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
    
    function center() {
        return {textAlign:'center'}
    }
    
    function black() {
        return {
            backgroundColor:"black",
            'border':'black',
            padding: 20
        }
    }

    function wide() {
        return {
            'width':'75vw',
            margin:0,
            padding:0
        }
    }

    function link() {
        return {
            color:'white',
            'text-decoration': 'none'
        }
    }

    function fullHeight() {
        return {
            height:'90vh',
            display: 'flex', 
            'justify-content': 'center', 
            'align-items': 'center'
        }
    }
}