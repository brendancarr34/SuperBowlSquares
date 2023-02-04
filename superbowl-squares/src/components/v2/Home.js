import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// import Button from '@restart/ui/esm/Button';
import Button from 'react-bootstrap/Button';
import { Outlet, Link } from "react-router-dom";

export function Home() {
    return (
        // <Container>
        //     <Row>
        //         <br/>
        //         <br/>
        //         <br/>
        //         <br/>
        //     </Row>
        //     <Row>
        //         <Col>
        //             <h1 style={center()}>
        //                 Super Simple <br />Super Bowl <br/>Squares
        //             </h1>
        //         </Col>
        //     </Row>
        //     <Row>
        //         <br/>
        //         <br/>
        //     </Row>
        //     <Row>
        //         <Col style={center()}>
        //             <Button style={black()}>
        //                 <Link to='/v2' style={white()}>
        //                     Start a New Game
        //                 </Link>
        //             </Button>
        //         </Col>
        //     </Row>
        //     <Row style={fullHeight()}>
        //         <p>test</p>
        //     </Row>
        // </Container>
        <Container>
            <Row style={fullHeight()}>
                <Row>
                    {/* <br/>
                    <br/>
                    <br/> */}
                    <br/>
                </Row>
                <Row>
                    <Col>
                        <h1 style={center()}>
                            Super Simple<br/>Super Bowl<br/>Squares
                        </h1>
                    </Col>
                </Row>
                <Row>
                    {/* <br/> */}
                    <br/>
                </Row>
                <Row>
                    <Col style={center()}>
                        <Button style={black()}>
                            <Link to='/v2' style={white()}>
                                Start a New Game
                            </Link>
                        </Button>
                    </Col>
                </Row>
                <Row style={lower()}>
                    <p style={test()}>by brendan carr</p>
                </Row>
            </Row>
        </Container>
    )

    function center() {
        return {textAlign:'center'}
    }

    function test() {return {
        'position': 'absolute',
    'bottom': '0',
    'width': '100%',
    'text-align': 'center'}
    }

    function lower() {
        return {
            display: 'flex', 
            'justify-content':'center',
        'align-items': 'flex-end'}
    }

    function black() {
        return {
            'backgroundColor':'black',
            'padding':20,
            'border':'black'
        }
    }

    function white() {
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