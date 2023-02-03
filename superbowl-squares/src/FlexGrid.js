import React, { useState } from 'react';
import { Grid } from './Grid.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { StateButton } from './StateButton.js';
import { ButtonRow } from './ButtonRow.js';

// export class FlexGrid extends React.Component {
//     render() {

//         const centered_div_style = {
//             backgroundColor: 'gray', 
//             height: '100vh',
//             display: 'flex', 
//             'justify-content': 'center', 
//             'align-items': 'center',
//         }

//         return (
//             <Container>
//                     <Col>1 of 3</Col>
//                     <Col>2 of 3</Col>
//                     <Col>3 of 3</Col>
//             </Container>
//         )
//     }
// }

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

    const [active, setActive] = useState(false);
    const [text, setText] = useState("⬜️");
    const handleClick = () => {
        setActive(!active);
        !active ? setText("✅") : setText("⬜️")
    };
    const colorOnClick = { backgroundColor: active ? "blue" : "gray" };
    return (
    <Container>
        <Row>
            <Col style={center()}>Super Bowl Squares</Col>
        </Row>
        <Row>
        <Col style={unknownNumber()}></Col>
        <Col style={unknownNumber()}>
            <Table striped bordered >
                <tbody>
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
        </Row>
    </Container>
    );
}

export default FlexGrid;