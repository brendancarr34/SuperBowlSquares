import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Select from 'react-select'
import { ViewBoardRow3 } from '../component/row/ViewBoardRow3.js';
import { NumberRow } from '../component/row/NumberRow.js';
import { emptyTopNumbers, emptySideNumbers, emptyBoard, emptyNameBoard } from '../data/EmptyBoardData.js';
import axios from 'axios';
import { host } from '../../../config';
import { VerticalTextComponent } from './VerticalTextComponent.js';

export function ViewBoard3() {

    let navigate = useNavigate();

    const location = useLocation();
    let groupName = location.state.groupName;

    const [gameNameData, setGameNameData] = useState(emptyNameBoard);
    const [gameData, setGameData] = useState(emptyBoard);
    const [players, setPlayers] = useState({});
    const [selectOptions, setSelectOptions] = useState([]);
    const [allSquaresClaimed, setAllSquaresClaimed] = useState(false);
    const [topNumbers, setTopNumbers] = useState(emptyTopNumbers);
    const [sideNumbers, setSideNumbers] = useState(emptySideNumbers);
    const [topTeam, setTopTeam] = useState('');
    const [sideTeam, setSideTeam] = useState('');
    const [selectedOption, setSelectedOption] = useState("none");

    // useEffect(() => {
    //     // Listen for the popstate event
    //     const handlePopstate = () => {
    //         // Navigate back to ViewBoard3 if the user clicks the back button
    //         navigate('/super-bowl-squares', {replace: true, state: { groupName: groupName }});
    //     };

    //     window.addEventListener('popstate', handlePopstate);

    //     return () => {
    //         // Remove the event listener when the component unmounts
    //         window.removeEventListener('popstate', handlePopstate);
    //     };
    // }, [navigate]);

    // Function to update select options
    const updateSelectOptions = (playerData) => {
        const newOptions = []; // Start with 'none' option
        const initialsMap = {};

        // Add new options
        playerData.forEach(map => {
            const { initials, playerName } = map;
            initialsMap[initials] = playerName;
            newOptions.push({ value: initials, label: `${initials} - ${playerName}` });
        });

        // Alphabetically sort options except 'none' option
        newOptions.sort((a, b) => a.label.localeCompare(b.label));

        const options = [{ value: 'None', label: 'None' }];
        newOptions.forEach(map => {
            const { value, label} = map;
            options.push({ value: value, label: label});
        })

        setPlayers(initialsMap);
        setSelectOptions(options);
    };

    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                const response = await axios.get('http://' + host + ':3001/api/game/' + groupName);

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

                // Update select options when data is fetched
                updateSelectOptions(response.data.players);

                const allSquaresClaimedResponse = response.data.allSquaresClaimed;
                setAllSquaresClaimed(allSquaresClaimedResponse);

                const topNumbersResponse = response.data.topNumbers;
                setTopNumbers(topNumbersResponse);

                const sideNumbersResponse = response.data.sideNumbers;
                setSideNumbers(sideNumbersResponse);

                const topTeamResponse = response.data.teams.top;
                setTopTeam(topTeamResponse);

                const sideTeamResponse = response.data.teams.side;
                setSideTeam(sideTeamResponse);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetch function
        fetchData();
    }, []);

    const claimSquares = () => { 
        navigate('/claim-squares', { 
            replace: true, 
            state: {
                groupName: groupName
            } 
        });
    }

    const setNumbersAndTeams = () => {
        navigate('/set-number-and-teams', { 
            replace: true, 
            state: {
                groupName: groupName
            } 
        });
    }

    const handleInitialSelect = selectedOption => {
        setSelectedOption(selectedOption.value);
    }

    return (
        <Container>
            <Row style={fullHeight()}>
                <Row>
                    <Col xs={12} style={center()}>
                        <h1 style={{'padding':15, 'paddingTop':50}}>Super Bowl Squares</h1>
                    </Col>
                </Row>
                <Row style={center()}>
                    <Row style={center5()}>
                        <Col xs={1} style={{'padding':0, 'margin':0}}>
                            <VerticalTextComponent style={{'padding':0, 'margin':0}} text={' '} />
                        </Col>
                        <Col xs={10} sm={8} md={6} lg={4} style={center2()}>
                            <p style={{'margin':5}}>{topTeam}</p>
                        </Col>
                        <Col xs={1} style={{'padding':0, 'margin':0}}>
                            <VerticalTextComponent style={{'padding':0, 'margin':0}} text={' '} />
                        </Col>
                    </Row>
                    <Row style={center5()}>
                        <Col xs={1} style={{'padding':0, 'margin':0}}>
                            <VerticalTextComponent style={{'padding':0, 'margin':0}} text={sideTeam} />
                        </Col>
                        <Col xs={10} sm={8} md={6} lg={5} style={center3()}>
                            <Container style={{'padding':0, 'margin':0, display: 'inline-block'}}>
                                <Row style={gray()}>
                                    <Col style={{whiteSpace: 'nowrap', display: 'block','padding':0, 'margin':0,}}>
                                        <Table style={{'padding':0, 'margin':0, display: 'inline-block', 'fontSize': '0px'}}>
                                            <tbody style={{'padding':0, 'margin':0, display: 'inline-block', 'fontSize': '0px'}}>
                                                <NumberRow numbers={topNumbers}/>
                                                <ViewBoardRow3 number={sideNumbers[0]} active={gameData[0]} text={gameNameData[0]} playerNames={players} selectedOption={selectedOption} allSquaresClaimed={allSquaresClaimed}/>
                                                <ViewBoardRow3 number={sideNumbers[1]} active={gameData[1]} text={gameNameData[1]} playerNames={players} selectedOption={selectedOption} allSquaresClaimed={allSquaresClaimed}/>
                                                <ViewBoardRow3 number={sideNumbers[2]} active={gameData[2]} text={gameNameData[2]} playerNames={players} selectedOption={selectedOption} allSquaresClaimed={allSquaresClaimed}/>
                                                <ViewBoardRow3 number={sideNumbers[3]} active={gameData[3]} text={gameNameData[3]} playerNames={players} selectedOption={selectedOption} allSquaresClaimed={allSquaresClaimed}/>
                                                <ViewBoardRow3 number={sideNumbers[4]} active={gameData[4]} text={gameNameData[4]} playerNames={players} selectedOption={selectedOption} allSquaresClaimed={allSquaresClaimed}/>
                                                <ViewBoardRow3 number={sideNumbers[5]} active={gameData[5]} text={gameNameData[5]} playerNames={players} selectedOption={selectedOption} allSquaresClaimed={allSquaresClaimed}/>
                                                <ViewBoardRow3 number={sideNumbers[6]} active={gameData[6]} text={gameNameData[6]} playerNames={players} selectedOption={selectedOption} allSquaresClaimed={allSquaresClaimed}/>
                                                <ViewBoardRow3 number={sideNumbers[7]} active={gameData[7]} text={gameNameData[7]} playerNames={players} selectedOption={selectedOption} allSquaresClaimed={allSquaresClaimed}/>
                                                <ViewBoardRow3 number={sideNumbers[8]} active={gameData[8]} text={gameNameData[8]} playerNames={players} selectedOption={selectedOption} allSquaresClaimed={allSquaresClaimed}/>
                                                <ViewBoardRow3 number={sideNumbers[9]} active={gameData[9]} text={gameNameData[9]} playerNames={players} selectedOption={selectedOption} allSquaresClaimed={allSquaresClaimed}/>
                                            </tbody>
                                        </Table>
                                    
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col xs={1} style={{'padding':0, 'margin':0}}>
                            
                            <VerticalTextComponent style={{'padding':0, 'margin':0, color:'white'}} text={'test'} />
                        </Col>
                    </Row>

                </Row>
                <Row style={{'paddingRight':10, 'margin':0, 'paddingLeft':10}}>
                    <Col style={{'padding':0, 'margin':0}}>
                        <Container style={{'padding':0, 'margin':0}}>
                            <Row style={pad()}>
                                <Col style={{'padding':0, 'margin':0}}>
                                    <Row style={{'padding':0, 'margin':0}}>
                                        <Select style={{'padding':10, 'margin':0, 'paddingTop':10}} 
                                                options={selectOptions} 
                                                onChange={handleInitialSelect} 
                                                value={
                                                    selectedOption === 'none' || selectedOption === 'None'
                                                        ? null
                                                        : { value: selectedOption, label: players[selectedOption] }
                                                }
                                                isSearchable={false}
                                                menuPlacement="top"
                                                // menuPortalTarget={document.body} // Render the menu outside the DOM tree
                                                // menuPosition="fixed" // Ensures the menu stays fixed in its position
                                                // menuStyle={{ maxHeight: '6000px' }} // Set the max height of the menu
                                        />
                                    </Row>
                                </Col>
                                <Col style={center()}>
                                    <Row style={center()}>
                                        <p style={centerText()}>Group Name:</p>
                                        <p style={centerText()}>{groupName}</p>
                                    </Row>
                                </Col>
                            </Row>
                            <Row style={{'padding':8, 'margin':0}}>
                                {
                                    !allSquaresClaimed ?
                                        <Button style={black()} onClick={claimSquares}>
                                            Claim Squares
                                        </Button>
                                        : 
                                        <Button style={black()} onClick={setNumbersAndTeams}>
                                            Set Numbers & Teams
                                        </Button>
                                }
                            </Row>
                        </Container>
                    </Col>
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
            padding: 0,
            margin: 0,
            paddingBottom: 15
        }
    }

    function blue() {
        return {
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            backgroundColor: 'blue', 
            color: 'black',
            padding: 15
        }
    }

    function pad() {
        return {
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            paddingTop: 15,
            paddingBottom: 15,
            paddingRight:10,
            paddingLeft:10
        }
    }
    
    function center() {
        return {
            display: 'flex', 
            justifyContent: 'center',
            textAlign: 'center',
            alignItems: 'center',
            padding:0,
            margin:0,
        }
    }

    function centerText() {
        return {
            display: 'flex', 
            justifyContent: 'center',
            textAlign: 'center',
            alignItems: 'center',
            padding:0,
            margin:0,
            fontSize:15
        }
    }

    function center2() {
        return {
            display: 'flex', 
            justifyContent: 'center',
            textAlign: 'center',
            alignItems: 'center',
            padding:0,
            margin:0,
            flexWrap: 'nowrap'
        }
    }

    function center3() {
        return {
            display: 'flex', 
            justifyContent: 'center',
            textAlign: 'center',
            alignItems: 'center',
            paddingRight:'0px',
            margin:0,
            flexWrap: 'nowrap',
            paddingLeft:0
        }
    }

    function center4() {
        return {
            // display: 'grid', 
            // gridTemplateColumns: '1fr',
            // justifySelf: 'end',
            // justifyContent: 'flex-end',
            // textAlign: 'center',
            // alignItems: 'center',
            padding:0,
            margin:0,
            transform: 'rotate(-90deg) translateX(-75px) translateY(-10px)', // TODO
            transformOrigin: 'center', 
            whiteSpace: 'nowrap', 
            // flexWrap: 'nowrap'
        }
    }

    function center5() {
        return {
            display: 'flex', 
            justifyContent: 'center',
            textAlign: 'center',
            alignItems: 'center',
            padding:0,
            margin:0,
            flexWrap: 'nowrap',
            // display: 'inline-block'
        }
    }

    function minDiv() {
        return {
            display: 'inline-block',
            // width: 0,
            // height: 0
            height: '20',
            'white-space': 'nowrap',
            padding: 0,
            margin: 0
        }
    }
    
    function black() {
        return {
            backgroundColor: 'black',
            border: 'black',
            padding: 20,
            width: '100%',

        }
    }

    function fullHeight() {
        return {
            height: '85vh',
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',

        }
    }
}