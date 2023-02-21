import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { EditBoardRow } from '../component/row/EditBoardRow.js';
import { NumberRow } from '../component/row/NumberRow.js';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { topNumbers, sideNumbers, emptyBoard } from '../data/EmptyBoardData.js';

export function EditBoard() {
    
    let [gameData, setGameData] = useState(emptyBoard);

    useEffect(() => {
        const firestore = getFirestore();
        const docRef = doc(firestore, 'group/group2');
        async function readGameData() {
            const mySnapshot = await getDoc(docRef);
            if (mySnapshot.exists()) {
                const docData = mySnapshot.data();
                var gameRows = [];
                gameRows.push(docData.gameData.row0);
                gameRows.push(docData.gameData.row1);
                gameRows.push(docData.gameData.row2);
                gameRows.push(docData.gameData.row3);
                gameRows.push(docData.gameData.row4);
                gameRows.push(docData.gameData.row5);
                gameRows.push(docData.gameData.row6);
                gameRows.push(docData.gameData.row7);
                gameRows.push(docData.gameData.row8);
                gameRows.push(docData.gameData.row9);
                setGameData(gameRows);
            };
        };
        readGameData();
    }, []);

    let navigate = useNavigate();
    const viewSquares = () => { 
        navigate('/super-bowl-squares', { replace: true });
    };

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
                    <Col style={board()}>
                        <Table style={{'padding':0, 'margin':0}}>
                            <tbody>
                                <NumberRow numbers={topNumbers}/>
                                <EditBoardRow number={sideNumbers[0]} active={gameData[0]}/>
                                <EditBoardRow number={sideNumbers[1]} active={gameData[1]}/>
                                <EditBoardRow number={sideNumbers[2]} active={gameData[2]}/>
                                <EditBoardRow number={sideNumbers[3]} active={gameData[3]}/>
                                <EditBoardRow number={sideNumbers[4]} active={gameData[4]}/>
                                <EditBoardRow number={sideNumbers[5]} active={gameData[5]}/>
                                <EditBoardRow number={sideNumbers[6]} active={gameData[6]}/>
                                <EditBoardRow number={sideNumbers[7]} active={gameData[7]}/>
                                <EditBoardRow number={sideNumbers[8]} active={gameData[8]}/>
                                <EditBoardRow number={sideNumbers[9]} active={gameData[9]}/>
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
};

function board() {
    return {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
        color: 'black',
        padding: 15
    }
}

function fullHeight() {
    return {
        height:'85vh',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center'
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
        border:'black',
        padding: 0,
        width:'100%',
        height:'85%'
    }
}