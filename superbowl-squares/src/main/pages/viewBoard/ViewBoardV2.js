import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Select from 'react-select'
import { ViewBoardRow3} from './components/ViewBoardRow3.js'
import { NumberRow } from './components/NumberRow.js';

import { emptyTopNumbers, emptySideNumbers, emptyBoard, emptyNameBoard } from '../../common/data/EmptyBoardData.js';
import axios from 'axios';
import { ws_url } from '../../../config.js';
import { VerticalTextComponent } from './components/VerticalTextComponent.js';
import { fullHeight } from '../../common/style/CommonStyles.js';
import '../../common/style/Select.css'
import VenmoPaymentButton from '../editBoard/components/VenmoPaymentButton.js';

export function ViewBoardV2() {

    let navigate = useNavigate();
    const location = useLocation();

    let groupName = null;
    try {
        groupName = location.state.groupName;
    }
    catch (error) {
        console.log('groupName is null');
    }

    const [isLoading, setIsLoading] = useState(true);


    const [gameNameData, setGameNameData] = useState(emptyNameBoard);
    const [gameData, setGameData] = useState(emptyBoard);
    const [players, setPlayers] = useState({});
    const [selectOptions, setSelectOptions] = useState([]);
    const [allSquaresClaimed, setAllSquaresClaimed] = useState(false);
    const [topNumbers, setTopNumbers] = useState(emptyTopNumbers);
    const [sideNumbers, setSideNumbers] = useState(emptySideNumbers);
    const [topTeam, setTopTeam] = useState('');
    const [sideTeam, setSideTeam] = useState('');
    const [selectedOption, setSelectedOption] = useState("None");
    const [showModal, setShowModal] = useState(false);
    const [colorData, setColorData] = useState([]);
    const [showVenmoModal, setShowVenmoModal] = useState(false);
    const [totalPayment, setTotalPayment] = useState('');
    const [clickedButtons, setClickedButtons] = useState([]);
    const [venmoUsername, setVenmoUsername] = useState('');

    const [adminPassword, setAdminPassword] = useState('');
    const [showAdminPasswordModal, setShowAdminPasswordModal] = useState(false);
    const [userInputAdminPassword, setUserInputAdminPassword] = useState('');
    const [showIncorrectAdminPasswordModal, setShowIncorrectAdminPasswordModal] = useState(false);

    const [refresh, setRefresh] = useState(0);

    // const [connectionStatus, setConnectionStatus] = useState('Disconnected');
    const [showDisconnectedModal, setShowDisconnectedModal] = useState(false);

    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const handleMenuClose = () => {
        setMenuIsOpen(true);
        setTimeout(() => setMenuIsOpen(false), 0); // Immediately reopen the menu
    };

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

    const copyToClipboard = () => {
        // const gameLink = window.location.href;
        const gameLink = 'https://brendancarr34.github.io/SuperBowlSquares/#/join-group/' + groupName
    
        // Create a temporary textarea element
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = gameLink;
    
        // Append the textarea to the document body
        document.body.appendChild(tempTextArea);
    
        // Select the content of the textarea
        tempTextArea.select();
        
        // Copy the selected text
        document.execCommand('copy');
    
        // Remove the temporary textarea from the document body
        document.body.removeChild(tempTextArea);

        toggleModal();
    };

    const openPreferences = () => {
        if (adminPassword != '')
        {
            setShowAdminPasswordModal(true);
        }
        else
        {
            navigate('/edit-group-preferences', 
            {replace: true, 
                state: {
                    groupName: groupName
                } });
        }
    }

    const handleSubmitAdminPasswordClick = () => {
        if (!isLoading)
        {
            if (userInputAdminPassword === adminPassword)
            {
                setUserInputAdminPassword('');
                navigate('/edit-group-preferences', 
                {replace: true, 
                    state: {
                        groupName: groupName
                    } });
            }
            else
            {
                setShowIncorrectAdminPasswordModal(true);
            }
        }
    }

    const openMenu = () => {
        if (!isLoading)
        {
            navigate('/group-menu', 
            {replace: true, 
                state: {
                    groupName: groupName
                } });
        }
        
    }

    const home = () => {
        navigate('/');
    }
    
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    useEffect(() => {
        if (groupName == null) {
            navigate('/', { replace :
                true
            });
        }

        if (JSON.parse(window.sessionStorage.getItem('showVenmoModal'))) {
            // setTimeout(function(){ 

            //     setShowVenmoModal(true);
            // }, 2000);
            setShowVenmoModal(true);
            setTotalPayment(location.state.totalPayment);
            setClickedButtons(location.state.clickedButtons);
            setVenmoUsername(location.state.venmoUsername);
        }

        const ws = new WebSocket(ws_url);

        ws.onopen = () => {
            console.log('WebSocket connected');
            // setConnectionStatus('Connected');

            // TODO - add a disconnected pop-up after ten minutes of inactivity?

            // Start sending pings every 30 seconds
            const pingInterval = setInterval(() => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify({ type: 'ping' }));
                    console.log('Ping sent to keep the connection alive');
                }
            }, 60000); // 60 seconds

            // Cleanup ping interval on close or component unmount
            ws.onclose = () => {
                console.log('WebSocket disconnected');
                // setConnectionStatus('Disconnected');
                clearInterval(pingInterval);
                if (refresh < 3)
                {
                    console.log('refresh #' + refresh);
                    setRefresh(refresh+1);
                }
                else
                {
                    setShowDisconnectedModal(true);
                }
            };
        };

        ws.onmessage = (event) => {
            const newData = JSON.parse(event.data);
            // setData((prevData) => [...prevData, newData]);
            const doc = newData.find(item => Object.keys(item)[0] === groupName)[groupName];

            var gameRows = [];
                gameRows.push(doc.gameData.row0);
                gameRows.push(doc.gameData.row1);
                gameRows.push(doc.gameData.row2);
                gameRows.push(doc.gameData.row3);
                gameRows.push(doc.gameData.row4);
                gameRows.push(doc.gameData.row5);
                gameRows.push(doc.gameData.row6);
                gameRows.push(doc.gameData.row7);
                gameRows.push(doc.gameData.row8);
                gameRows.push(doc.gameData.row9);
                setGameData(gameRows);

                var gameNameRows = [];
                gameNameRows.push(doc.gameData.row0_players)
                gameNameRows.push(doc.gameData.row1_players)
                gameNameRows.push(doc.gameData.row2_players)
                gameNameRows.push(doc.gameData.row3_players)
                gameNameRows.push(doc.gameData.row4_players)
                gameNameRows.push(doc.gameData.row5_players)
                gameNameRows.push(doc.gameData.row6_players)
                gameNameRows.push(doc.gameData.row7_players)
                gameNameRows.push(doc.gameData.row8_players)
                gameNameRows.push(doc.gameData.row9_players)
                setGameNameData(gameNameRows);

                // Update select options when data is fetched
                updateSelectOptions(doc.players);

                const allSquaresClaimedResponse = doc.allSquaresClaimed;
                setAllSquaresClaimed(allSquaresClaimedResponse);

                const topNumbersResponse = doc.topNumbers;
                setTopNumbers(topNumbersResponse);

                const sideNumbersResponse = doc.sideNumbers;
                setSideNumbers(sideNumbersResponse);

                const topTeamResponse = doc.teams.top;
                setTopTeam(topTeamResponse);

                const sideTeamResponse = doc.teams.side;
                setSideTeam(sideTeamResponse);

                const existingColorData = doc.colorData;
                setColorData(existingColorData);

                if (doc.adminPassword)
                {
                    const adminPassword = doc.adminPassword;
                    setAdminPassword(adminPassword);
                }    
                
                setIsLoading(false);
        };

        ws.onclose = () => console.log('WebSocket closed');
        ws.onerror = (error) => console.error('WebSocket error:', error);

        return () => ws.close();
    }, [refresh]);

    const claimSquares = () => { 
        if (!isLoading)
        {
            navigate('/claim-squares', { 
                replace: true, 
                state: {
                    groupName: groupName
                } 
            });
        }
        
    }

    const setNumbersAndTeams = () => {
        if (!isLoading)
        {
            navigate('/set-number-and-teams', { 
                replace: true, 
                state: {
                    groupName: groupName
                } 
            });
        }
    }

    const handleInitialSelect = selectedOption => {
        setSelectedOption(selectedOption.value);
    }

    const updateSelectedOption = (option) => {
        if (selectedOption == option) {
            setSelectedOption(option);
        }
        else if (selectedOption != 'None' ) {
            setSelectedOption('None');
        }
        else {
            setSelectedOption(option);
        }
    };

    return (
        <Container className={menuIsOpen ? "select-overlay" : ""}>
            <Row style={fullHeight()}>
                <Row style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Col xs={12} style={center()}>
                        <Button style={{
                            backgroundColor:'lightgray',
                            color:'black',
                            fontSize: 26,
                            fontWeight: 900,
                            borderRadius:35,
                            marginTop:30,
                            padding:15,
                            paddingLeft:25,
                            paddingRight:25,
                            border: 'lightgray'
                        }}
                        onClick={() => home()}
                        >
                            Super Bowl Squares
                        </Button>
                        {/* <h1 style={{'paddingTop':30}}>🏈 Super Bowl Squares 🏈</h1> */}
                        <p style={{paddingTop:5}}><b>Group:</b> {groupName}</p>
                    </Col>
                </Row>
                <Row style={center()}>
                    {/* Top Team */}
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
                    {/* Game Board */}
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
                                                <ViewBoardRow3 
                                                    number={sideNumbers[0]} 
                                                    active={gameData[0]} 
                                                    text={gameNameData[0]} 
                                                    playerNames={players} 
                                                    selectedOption={selectedOption} 
                                                    allSquaresClaimed={allSquaresClaimed} 
                                                    colorData={colorData}
                                                    updateSelectedOption={updateSelectedOption}/>
                                                <ViewBoardRow3 number={sideNumbers[1]} active={gameData[1]} text={gameNameData[1]} playerNames={players} selectedOption={selectedOption} allSquaresClaimed={allSquaresClaimed} colorData={colorData} updateSelectedOption={updateSelectedOption}/>
                                                <ViewBoardRow3 number={sideNumbers[2]} active={gameData[2]} text={gameNameData[2]} playerNames={players} selectedOption={selectedOption} allSquaresClaimed={allSquaresClaimed} colorData={colorData} updateSelectedOption={updateSelectedOption}/>
                                                <ViewBoardRow3 number={sideNumbers[3]} active={gameData[3]} text={gameNameData[3]} playerNames={players} selectedOption={selectedOption} allSquaresClaimed={allSquaresClaimed} colorData={colorData} updateSelectedOption={updateSelectedOption}/>
                                                <ViewBoardRow3 number={sideNumbers[4]} active={gameData[4]} text={gameNameData[4]} playerNames={players} selectedOption={selectedOption} allSquaresClaimed={allSquaresClaimed} colorData={colorData} updateSelectedOption={updateSelectedOption}/>
                                                <ViewBoardRow3 number={sideNumbers[5]} active={gameData[5]} text={gameNameData[5]} playerNames={players} selectedOption={selectedOption} allSquaresClaimed={allSquaresClaimed} colorData={colorData} updateSelectedOption={updateSelectedOption}/>
                                                <ViewBoardRow3 number={sideNumbers[6]} active={gameData[6]} text={gameNameData[6]} playerNames={players} selectedOption={selectedOption} allSquaresClaimed={allSquaresClaimed} colorData={colorData} updateSelectedOption={updateSelectedOption}/>
                                                <ViewBoardRow3 number={sideNumbers[7]} active={gameData[7]} text={gameNameData[7]} playerNames={players} selectedOption={selectedOption} allSquaresClaimed={allSquaresClaimed} colorData={colorData} updateSelectedOption={updateSelectedOption}/>
                                                <ViewBoardRow3 number={sideNumbers[8]} active={gameData[8]} text={gameNameData[8]} playerNames={players} selectedOption={selectedOption} allSquaresClaimed={allSquaresClaimed} colorData={colorData} updateSelectedOption={updateSelectedOption}/>
                                                <ViewBoardRow3 number={sideNumbers[9]} active={gameData[9]} text={gameNameData[9]} playerNames={players} selectedOption={selectedOption} allSquaresClaimed={allSquaresClaimed} colorData={colorData} updateSelectedOption={updateSelectedOption}/>
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
                    {/* Button Row */}
                    <Row style={center5()}>
                        <Col xs={1} style={{'padding':0, 'margin':0}}>
                            <VerticalTextComponent style={{'padding':0, 'margin':0, color:'white'}} text={' '} />
                        </Col>
                        <Col xs={10} sm={8} md={6} lg={4} style={{'padding':0, 'margin':0}}>
                            <Container style={{'padding':0, 'margin':0}}>
                                <Row style={pad()}>
                                    <Col style={{'height':115, flex: '0 0 65%'}}>
                                        <Row style={{'padding':0,'paddingBottom':5, 'margin':0, height:'40%'}}>
                                            <Select className="custom-select"
                                                    style={{'padding':0, 'margin':0,}} 
                                                    options={selectOptions} 
                                                    onChange={handleInitialSelect} 
                                                    defaultValue={{ value: 'None', label: null }}
                                                    value={
                                                        selectedOption === 'none' || selectedOption === 'None'
                                                            ? 'None'
                                                            : { value: selectedOption, label: players[selectedOption] }
                                                    }
                                                    isSearchable={false}
                                                    menuPlacement="top"
                                                    onMenuClose={handleMenuClose}
                                            />
                                        </Row>
                                        <Row style={{'padding':0,'paddingTop':5, 'margin':0, height:'60%'}}>
                                            <Col style={{'padding':0,'paddingRight':5, 'margin':0, height:'100%'}}>
                                                <Button style={grayButton()} onClick={openPreferences}>
                                                    ⚙️
                                                </Button>
                                            </Col>
                                            <Col style={{'padding':0,'paddingLeft':5,'paddingRight':5, 'margin':0, height:'100%'}}>
                                                <Button style={grayButton()} onClick={openMenu}>
                                                    📖
                                                </Button>
                                            </Col>
                                            <Col style={{'padding':0,'paddingLeft':5, 'margin':0, height:'100%'}}>
                                                <Button style={grayButton()} onClick={copyToClipboard}>
                                                    📲
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col style={{'height':115, 'paddingLeft':0, flex: '0 0 35%'}}>
                                        {
                                            !allSquaresClaimed ? 
                                            <Button style={black()} onClick={claimSquares}>
                                                Select Squares
                                            </Button> 
                                            :                         
                                            <Button style={black()} onClick={setNumbersAndTeams}>
                                                Set Numbers & Teams
                                            </Button>
                                        }
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col xs={1} style={{'padding':0, 'margin':0}}>
                            <VerticalTextComponent style={{'padding':0, 'margin':0, color:'white'}} text={' '} />
                        </Col>
                    </Row>
                </Row>
                <Row>
                    <br/>
                    <br/>
                </Row>
            </Row>

            {/* Modal for Copied Link */}
            <Modal show={showModal} onHide={() => toggleModal(false)}>
                <Modal.Body>Game link copied to clipboard.</Modal.Body>
            </Modal>

            {/* Venmo Modal */}
            <Modal show={showVenmoModal} onHide={() => {
                    window.sessionStorage.setItem("showVenmoModal", false);
                    setShowVenmoModal(false);
                }}>
                <Modal.Header closeButton>
                <Modal.Title>Success! 🎉</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You claimed {clickedButtons.length} square{clickedButtons.length > 1 && 's'}!<br/>
                    <br/>
                    Pay for your squares with Venmo?
                </Modal.Body>
                <Modal.Footer>     
                    <VenmoPaymentButton recipient={venmoUsername} amount={totalPayment}/>
                </Modal.Footer>
            </Modal>

            {/* Admin Password Modal */}
            <Modal show={showAdminPasswordModal} onHide={() => {
                    window.sessionStorage.setItem("showAdminPasswordModal", false);
                    setShowAdminPasswordModal(false);
                }}>
                <Modal.Header closeButton>
                    <Modal.Title>Group Admin Access Only</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group 
                        onChange={(e) => {
                            setShowIncorrectAdminPasswordModal(false);
                            setUserInputAdminPassword(e.target.value)}
                        } 
                        style={{margin:0, paddingTop:2, paddingBottom:2}}
                    >
                        <Form.Control placeholder="Enter admin password" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer> 
                    {showIncorrectAdminPasswordModal && 
                    <p>Incorrect Admin Password</p>
                    }  
                    <Button style={{backgroundColor: 'black', border: 'black'}} onClick={handleSubmitAdminPasswordClick}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={isLoading} centered>
                    <Modal.Body>
                        Loading...
                    </Modal.Body>
            </Modal>

            <Modal show={showDisconnectedModal} onHide={() => {
                setShowDisconnectedModal(false);
                setRefresh(0);
                console.log(refresh)
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Disconnected</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Disconnected from group updates due to inactivity. Close this to reconnect.
                </Modal.Body>
                
            </Modal>
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
            paddingBottom: 15,
            borderRadius: 5
        }
    }

    function pad() {
        return {
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            padding: 0,
            paddingTop: 15,
        }
    }
    
    function center() {
        return {
            textAlign: 'center',
            alignItems: 'center',
            padding:0,
            margin:0,
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

    function center5() {
        return {
            display: 'flex', 
            justifyContent: 'center',
            textAlign: 'center',
            alignItems: 'center',
            padding:0,
            margin:0,
            flexWrap: 'nowrap',
        }
    }
    
    function black() {
        return {
            backgroundColor: 'black',
            border: 'black',
            padding: 20,
            width: '100%',
            height: '100%'
        }
    }

    function grayButton() {
        return {
            backgroundColor: 'lightgray',
            border: 'gray',
            padding: 5,
            width: '100%',
            color: 'black',
            height: '100%',
            fontSize: 30
        }
    }
}