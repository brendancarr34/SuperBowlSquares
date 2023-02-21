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
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
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
        var groupName = 'group2';
        const db = getFirestore();
        const groupRef = doc(db, 'group', groupName);
        setDoc(groupRef, {
            gameData: {
                row0: gameData[0],
                row1: gameData[1],
                row2: gameData[2],
                row3: gameData[3],
                row4: gameData[4],
                row5: gameData[5],
                row6: gameData[6],
                row7: gameData[7],
                row8: gameData[8],
                row9: gameData[9]
            }
        }, { merge: true });
        navigate('/super-bowl-squares', { replace: true });
    };

    const falseArr = [false, false, false, false, false, false, false, false, false, false];

    const getActiveButtons = (ids, activeArr) => {
        const row = Math.floor(ids[0] / 10);
        gameData[row] = activeArr;
        console.log("ids: " + ids + ", activeArr: " + activeArr);
        console.log("gameData: " + gameData);
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
                    <Col style={board()}>
                        <Table style={{'padding':0, 'margin':0}}>
                            <tbody>
                                <NumberRow numbers={topNumbers}/>
                                <EditBoardRow 
                                    number={sideNumbers[0]} 
                                    taken={gameData[0]}
                                    ids={[0,1,2,3,4,5,6,7,8,9]}
                                    activeButtons={getActiveButtons}/>
                                <EditBoardRow 
                                    number={sideNumbers[1]} 
                                    taken={gameData[1]} 
                                    ids={[10,11,12,13,14,15,16,17,18,19]}
                                    activeButtons={getActiveButtons}/>
                                <EditBoardRow 
                                    number={sideNumbers[2]} 
                                    taken={gameData[2]} 
                                    ids={[20,21,22,23,24,25,26,27,28,29]}
                                    activeButtons={getActiveButtons}/>
                                <EditBoardRow 
                                    number={sideNumbers[3]} 
                                    taken={gameData[3]} 
                                    ids={[30,31,32,33,34,35,36,37,38,39]}
                                    activeButtons={getActiveButtons}/>
                                <EditBoardRow 
                                    number={sideNumbers[4]} 
                                    taken={gameData[4]} 
                                    ids={[40,41,42,43,44,45,46,47,48,49]}
                                    activeButtons={getActiveButtons}/>
                                <EditBoardRow 
                                    number={sideNumbers[5]} 
                                    taken={gameData[5]} 
                                    ids={[50,51,52,53,54,55,56,57,58,59]}
                                    activeButtons={getActiveButtons}/>
                                <EditBoardRow 
                                    number={sideNumbers[6]} 
                                    taken={gameData[6]} 
                                    ids={[60,61,62,63,64,65,66,67,68,69]}
                                    activeButtons={getActiveButtons}/>
                                <EditBoardRow 
                                    number={sideNumbers[7]} 
                                    taken={gameData[7]} 
                                    ids={[70,71,72,73,74,75,76,77,78,79]}
                                    activeButtons={getActiveButtons}/>
                                <EditBoardRow 
                                    number={sideNumbers[8]} 
                                    taken={gameData[8]} 
                                    ids={[80,81,82,83,84,85,86,87,88,89]}
                                    activeButtons={getActiveButtons}/>
                                <EditBoardRow 
                                    number={sideNumbers[9]} 
                                    taken={gameData[9]} 
                                    ids={[90,91,92,93,94,95,96,97,98,99]}
                                    activeButtons={getActiveButtons}/>
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