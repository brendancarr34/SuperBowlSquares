import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { ViewBoardRow } from '../component/row/ViewBoardRow.js';
import { NumberRow } from '../component/row/NumberRow.js';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { topNumbers, sideNumbers, emptyBoard } from '../data/EmptyBoardData.js';

export function ViewBoard() {

    let [gameData, setGameData] = useState(emptyBoard);

    let groupName = 'group1';

    useEffect(() => {
        const firestore = getFirestore();
        const docRef = doc(firestore, 'group', groupName);
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
    const claimSquares = () => { 
        navigate('/claim-squares', { replace: true });
    }

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
                    <Col/>
                    <Col/>
                    <Col >
                        <Container style={{'padding':0, 'margin':0}}>
                            <Row style={gray()}>
                                <Table style={{'padding':0, 'margin':0}}>
                                    <tbody>
                                        <NumberRow numbers={topNumbers}/>
                                        <ViewBoardRow number={sideNumbers[0]} active={gameData[0]}/>
                                        <ViewBoardRow number={sideNumbers[1]} active={gameData[1]}/>
                                        <ViewBoardRow number={sideNumbers[2]} active={gameData[2]}/>
                                        <ViewBoardRow number={sideNumbers[3]} active={gameData[3]}/>
                                        <ViewBoardRow number={sideNumbers[4]} active={gameData[4]}/>
                                        <ViewBoardRow number={sideNumbers[5]} active={gameData[5]}/>
                                        <ViewBoardRow number={sideNumbers[6]} active={gameData[6]}/>
                                        <ViewBoardRow number={sideNumbers[7]} active={gameData[7]}/>
                                        <ViewBoardRow number={sideNumbers[8]} active={gameData[8]}/>
                                        <ViewBoardRow number={sideNumbers[9]} active={gameData[9]}/>
                                    </tbody>
                                </Table>
                            </Row>
                            <Row>
                                <br/>
                            </Row>
                            <Row>
                                <Button style={black()} onClick={claimSquares}>
                                        Claim Squares
                                </Button>
                            </Row>
                        </Container>
                    </Col>
                    <Col/>
                    <Col/>
                    <Row>
                        <br/>
                    </Row>
                </Row>
            </Row>
        </Container>

    );

    function gray() {
        return {
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            backgroundColor: 'gray', 
            color: 'black',
            padding: 15
        }
    }
    
    function center() {
        return {
            textAlign: 'center',
            width: '100%'
        }
    }
    
    function black() {
        return {
            backgroundColor: 'black',
            border: 'black',
            padding: 20,
            width: '100%'
        }
    }

    function fullHeight() {
        return {
            height: '85vh',
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center'
        }
    }
}