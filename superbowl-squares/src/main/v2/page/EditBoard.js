import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { EditBoardRow } from '../component/row/EditBoardRow.js';
import { NumberRow } from '../component/row/NumberRow.js';
import { topNumbers, sideNumbers, emptyBoard, emptyNameBoard } from '../data/EmptyBoardData.js';
import { readGameData } from '../hook/readGameDataHook.js';
import axios from 'axios';

export function EditBoard() {

    const location = useLocation();

    let groupName =  location.state.groupName;
    
    const [data, setData] = useState(null);
    let [gameData, setGameData] = useState(emptyBoard);
    let [gameNameData, setGameNameData] = useState(emptyNameBoard);
    let [activeButtonData, setActiveButtonData] = useState(emptyBoard);
    let [players, setPlayers] = useState([]);

    let [playerName, setPlayerName] = useState("");
    let [playerInitials, setPlayerInitials] = useState("");

    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/game/brendan1');

            // setData(response.data);

            var gameRows = [];
            gameRows.push(response.data.gameData.row0);
            gameRows.push(response.data.gameData.row1);
            gameRows.push(response.data.gameData.row2);
            gameRows.push(response.data.gameData.row3);
            gameRows.push(response.data.gameData.row4);
            gameRows.push(response.data.gameData.row5);
            gameRows.push(response.data.gameData.row6);
            gameRows.push(response.data.gameData.row7);
            gameRows.push(response.data.gameData.row8);
            gameRows.push(response.data.gameData.row9);
            setGameData(gameRows);

            var gameNameRows = [];
            gameNameRows.push(response.data.gameData.row0_players)
            gameNameRows.push(response.data.gameData.row1_players)
            gameNameRows.push(response.data.gameData.row2_players)
            gameNameRows.push(response.data.gameData.row3_players)
            gameNameRows.push(response.data.gameData.row4_players)
            gameNameRows.push(response.data.gameData.row5_players)
            gameNameRows.push(response.data.gameData.row6_players)
            gameNameRows.push(response.data.gameData.row7_players)
            gameNameRows.push(response.data.gameData.row8_players)
            gameNameRows.push(response.data.gameData.row9_players)
            setGameNameData(gameNameRows);

            setPlayers(response.players);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        // Call the fetch function
        fetchData();
    }, []);

    let navigate = useNavigate();

    const claimSquares = async () => {
        try {
            console.log('active button data: ' + activeButtonData);
            const response = await axios.post('http://localhost:3001/api/game/claimSquares/brendan1', {
                activeButtonData: activeButtonData, 
                initials: playerInitials,
                name: playerName
            });

            // setResponseData(response.data);
            console.log('data: ' + response.data.message);
        }
        catch (error) {
            console.error('Error claiming squares', error);
            if (error.response != null) {
                console.log(error.response.data.error);
                setError(error.response.data.error);
                if (error.response.data.validSquares) {
                    console.log('read valid squares: ' + error.response.data.validSquares);
                    setActiveButtonData(error.response.data.validSquares);
                }
            } else if (error.code === 'ERR_NETWORK') {
                setError('Network Error');
            } else {
                setError('Unknown Error');
            }
        }
        
    }


    
    const viewSquares = () => { 
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (activeButtonData[i][j] === true) {
                    gameData[i][j] = true;
                    gameNameData[i][j] = playerInitials;
                }
            }
        }
        setActiveButtonData(emptyBoard);

        players.push({initials: playerInitials, name: playerName});

        // set new gameData and gameNameData
        const db = getFirestore();
        const groupRef = doc(db, 'group', groupName);
        setDoc(groupRef, {
            gameData: {
                row0: gameData[0],
                row0_players: gameNameData[0],
                row1: gameData[1],
                row1_players: gameNameData[1],
                row2: gameData[2],
                row2_players: gameNameData[2],
                row3: gameData[3],
                row3_players: gameNameData[3],
                row4: gameData[4],
                row4_players: gameNameData[4],
                row5: gameData[5],
                row5_players: gameNameData[5],
                row6: gameData[6],
                row6_players: gameNameData[6],
                row7: gameData[7],
                row7_players: gameNameData[7],
                row8: gameData[8],
                row8_players: gameNameData[8],
                row9: gameData[9],
                row9_players: gameNameData[9]
            }
        }, { merge: true });
        setDoc(groupRef, {
            players: players
        }, { merge: true});
        console.log("Successfully claimed squares!");
        navigate('/super-bowl-squares', { 
            replace: true, 
            state: { name: playerName, initials: playerInitials, groupName: groupName } 
        });
    };

    // const getActiveButtons = (ids, activeArr) => {
    //     const row = Math.floor(ids[0] / 10);
    //     for (let i = 0; i < 10; i++) {
    //         if (activeArr[i] === true) {
    //             gameData[row][i] = true;
    //             gameNameData[row][i] = playerInitials;
    //         } else {
    //             gameData[row][i] = false;
    //             gameNameData[row][i] = '';
    //         }
    //     }
    // }

    const getActiveButtons = (ids, activeArr) => {
        const row = Math.floor(ids[0] / 10);
        for (let i = 0; i < 10; i++) {
            if (activeArr[i] === true) {
                activeButtonData[row][i] = true;
            } else {
                activeButtonData[row][i] = false;
            }
        }
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
                            <Form.Group className="mb-3" onChange={(e) => setPlayerName(e.target.value)}>
                            {/* <Form.Group className="mb-3" onChange={(e) => playerName = (e.target.value)}> */}
                                <Form.Control placeholder="First & Last Name" />
                            </Form.Group>
                            <Form.Group className="mb-3" onChange={(e) => setPlayerInitials(e.target.value)}>
                            {/* <Form.Group className="mb-3" onChange={(e) => playerInitials = (e.target.value)}> */}
                                <Form.Control placeholder="Initials" />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col>
                        <Button disabled={false} style={black()} onClick={claimSquares}>
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