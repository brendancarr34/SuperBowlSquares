import React, { useEffect, useState, } from 'react';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ModalHeader from 'react-bootstrap/esm/ModalHeader.js';
import Select from 'react-select'

import { ViewBoardRow3 } from './components/ViewBoardRow3.js'
import { NumberRow } from './components/NumberRow.js';
import { VerticalTextComponent } from './components/VerticalTextComponent.js';
import { emptyTopNumbers, emptySideNumbers, emptyBoard, emptyNameBoard } from '../../common/data/EmptyBoardData.js';
import { base_url, ws_url } from '../../../config.js';
import { fullHeight } from '../../common/style/CommonStyles.js';
import VenmoPaymentButton from '../editBoard/components/VenmoPaymentButton.js';

import exampleBoard from './exampleBoard.png'

import '../../common/style/Select.css'

export function ViewBoardV2() {

    let navigate = useNavigate();
    const location = useLocation();

    let { groupName } = useParams(); 

    let authenticatedVar = null;
    try {
        authenticatedVar = location.state.authenticated;
    }
    catch ( e ) {
        console.log("authenticated error")
    }

    const [justCreated, setJustCreated] = useState(false);

    const handleJustCreatedChange = (newValue) => {
        setJustCreated(prev => {
          if (prev !== newValue) return newValue; // Only update if the value changes
          return prev; // Otherwise, don't update state
        });
      };
    
    let justCreatedVar = null;
    try {
        justCreatedVar = location.state.justCreated;
    }
    catch (error) {
        console.log('error with justCreated variable');
    }

    const [justJoined, setJustJoined] = useState(false);

    const handleJustJoinedChange = (newValue) => {
        setJustJoined(prev => {
          if (prev !== newValue) return newValue; // Only update if the value changes
          return prev; // Otherwise, don't update state
        });
    };

    let justJoinedVar = null;
    try {
        justJoinedVar = location.state.justJoined;
    }
    catch (error) {
        console.log('error with justJoined variable');
    }

    const [isLoading, setIsLoading] = useState(true);

    const [gameNameData, setGameNameData] = useState(emptyNameBoard);
    const [gameData, setGameData] = useState(emptyBoard);
    const [players, setPlayers] = useState({});
    const [selectOptions, setSelectOptions] = useState([]);
    const [allSquaresClaimed, setAllSquaresClaimed] = useState(false);
    const [topNumbers, setTopNumbers] = useState(emptyTopNumbers);
    const [sideNumbers, setSideNumbers] = useState(emptySideNumbers);
    const [topTeam, setTopTeam] = useState('???');
    const [sideTeam, setSideTeam] = useState('???');
    const [selectedOption, setSelectedOption] = useState("None");
    const [colorData, setColorData] = useState([]);
    const [totalPayment, setTotalPayment] = useState('');
    const [clickedButtons, setClickedButtons] = useState([]);
    const [venmoUsername, setVenmoUsername] = useState('');
    const [pricePerSquare, setPricePerSquare] = useState(0);
    const [adminPassword, setAdminPassword] = useState('');
    const [quarter1Payout, setQ1Payout] = useState('');
    const [quarter1Winner, setQuarter1Winner] = useState('');
    const [quarter2Payout, setQ2Payout] = useState('');
    const [quarter2Winner, setQuarter2Winner] = useState('');
    const [quarter3Payout, setQ3Payout] = useState('');
    const [quarter3Winner, setQuarter3Winner] = useState('');
    const [quarter4Payout, setQ4Payout] = useState('');
    const [quarter4Winner, setQuarter4Winner] = useState('');
    
    const [userInputAdminPassword, setUserInputAdminPassword] = useState('');
    const [showIncorrectAdminPasswordModal, setShowIncorrectAdminPasswordModal] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [showVenmoModal, setShowVenmoModal] = useState(false);
    const [showAdminPasswordModal, setShowAdminPasswordModal] = useState(false);
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
                    groupName: groupName,
                    venmoUsername: venmoUsername,
                    pricePerSquare: pricePerSquare,
                    q1Payout: quarter1Payout,
                    q1Winner: quarter1Winner,
                    q2Payout: quarter2Payout,
                    q2Winner: quarter2Winner,
                    q3Payout: quarter3Payout,
                    q3Winner: quarter3Winner,
                    q4Payout: quarter4Payout,
                    q4Winner: quarter4Winner
                } 
            });
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

        if (authenticatedVar != true)
        {
            console.log('authenticatedVar' + authenticatedVar);
            console.log('we are here')
            navigate(`/join-group/${groupName}`);
        } 

        if (justCreatedVar != null)
        {
            handleJustCreatedChange(true);
        }

        if (justJoinedVar != null)
        {
            handleJustJoinedChange(true);
        }

        if (JSON.parse(window.sessionStorage.getItem('showVenmoModal'))) {
            setShowVenmoModal(true);
            setTotalPayment(location.state.totalPayment);
            setClickedButtons(location.state.clickedButtons);
            setVenmoUsername(location.state.venmoUsername);
        }

        // TODO - if all squares are calimed, just make API call - no need for WS
        const ws = new WebSocket(ws_url);

        ws.onopen = () => {
            console.log('WebSocket connected');
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

                // dont show justJoined modal after reconnecting
                setJustJoined(false);
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
                
                // console.log(doc);
                setVenmoUsername(doc.preferences.venmoUsername);

                setPricePerSquare(doc.preferences.paymentAmount);

                const q1Payout = doc.q1Payout;
                setQ1Payout(q1Payout);
                if (doc.q1Winner) {
                    const q1Winner = doc.q1Winner;
                    setQuarter1Winner(q1Winner);
                }
                
                const q2Payout = doc.q2Payout;
                setQ2Payout(q2Payout);
                if (doc.q2Winner) {
                    const q2Winner = doc.q2Winner;
                    setQuarter2Winner(q2Winner);
                }
                const q3Payout = doc.q3Payout;
                setQ3Payout(q3Payout);
                if (doc.q3Winner) {
                    const q3Winner = doc.q3Winner;
                    setQuarter3Winner(q3Winner);
                }
                const q4Payout = doc.q4Payout;
                setQ4Payout(q4Payout);
                if (doc.q4Winner) {
                    const q4Winner = doc.q4Winner;
                    setQuarter4Winner(q4Winner);
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

    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const handleShowPaymentModal = () => {
        setShowPaymentModal(true);
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
                            fontWeight: 500,
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
                        <p style={{paddingTop:5, marginBottom:6}}><b>Group:</b> {groupName}</p>
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
                            <VerticalTextComponent style={{'padding':0, 'margin':0, color:'white'}} text={' '} />
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
                                                    {/* ℹ */}
                                                    {/* 📖 */}
                                                    {/* 🗒️ */}
                                                    ℹ️
                                                </Button>
                                            </Col>
                                            <Col style={{'padding':0,'paddingLeft':5, 'margin':0, height:'100%'}}>
                                                <Button style={grayButton()} onClick={copyToClipboard}>
                                                    🔍
                                                    {/* 💡 */}
                                                    {/* ❓ */}
                                                    {/* 🔗 */}
                                                    {/* 📲 */}
                                                    {/* 💬 */}
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col style={{'height':115, 'paddingLeft':0, flex: '0 0 35%'}}>
                                        {
                                            isLoading ? 
                                            <Button style={black()}>

                                            </Button> 
                                            :
                                            !allSquaresClaimed ? 
                                            <Button style={black()} onClick={claimSquares}>
                                                Select Squares
                                            </Button> 
                                            :                         
                                            <Button style={black2()} onClick={handleShowPaymentModal}>
                                                {/* 🤑 */}
                                                {/* 💸 */}
                                                🏆
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

            {/* How to Play Modal*/}
            <Modal show={showModal && !justJoined} 
                onHide={() => {
                    toggleModal(false); 
                }} 
                   centered
                >
                <Modal.Header closeButton>
                    <Modal.Title>
                        How to play Super Bowl Squares
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Row width={'50%'} style={center()}>
                            <Col>
                            <img width={'70%'} src={exampleBoard} alt="Example" />
                            <br/> 
                            <br/>
                            </Col>
                        </Row>
                    </div>
                    The game is played on a 10x10 grid, with one team assigned to each axis.
                    Each axis is also labeled with a number 0-9 in a random order. 
                    <br/>
                    <br/>
                    Claim squares by marking them with your initials. Once the board is full, the teams and numbers will be randomized.
                    <br/>
                    <br/>
                    You win if your square matches the last digit of each team's score at the end of each quarter.
                </Modal.Body>
            </Modal>

            {/* Venmo Modal */}
            <Modal show={showVenmoModal} onHide={() => {
                    window.sessionStorage.setItem("showVenmoModal", false);
                    setShowVenmoModal(false);
                }} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                <Modal.Title>Success! 🎉</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You claimed {clickedButtons.length} square{clickedButtons.length > 1 && 's'}!<br/>
                    <br/>
                    Pay for your square{clickedButtons.length > 1 && 's'} with Venmo?
                </Modal.Body>
                <Modal.Footer>     
                    <VenmoPaymentButton recipient={venmoUsername} amount={totalPayment} squares={clickedButtons.length} groupName={groupName}/>
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
                    <p style={{color:'red'}}>Incorrect Admin Password</p>
                    }  
                    <Button style={{backgroundColor: '#4682b4', border: 'black'}} onClick={handleSubmitAdminPasswordClick}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* LOADING MODAL */}
            <Modal show={isLoading && !showVenmoModal} style={{width:'50%',transform: 'translate(50%, 0%)',}} centered>
                <Modal.Body style={{display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', }}>
                        Loading
                    </Modal.Body>
                    
            </Modal>

            {/* DISCONNECTED MODAL */}
            <Modal show={showDisconnectedModal && !showModal} onHide={() => {
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

            {/* GROUP CREATED MODAL */}
            <Modal show={justCreated && !isLoading && !showDisconnectedModal} onHide={() => {
                setJustCreated(false);
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Your group, <b>{groupName}</b>, was created successfully
                    <br/>
                    <br/>
                    Start by claiming your own squares, so your friends know they can start claiming squares too.
                    <br/>
                    <br/>
                    Then, be sure to check out the advanced settings to add some group info and make any necessary updates.
                    {/* TODO - add this if there is an admin password:
                     You'll need to use your admin password to access this page.
                     also - could list the adv setings*/}
                    <br/>
                    <br/>
                    Enjoy!
                </Modal.Body>
            </Modal>

            {/* GROUP JOINED MODAL */}
            <Modal show={justJoined && !isLoading && !showDisconnectedModal} onHide={() => {
                setJustJoined(false);
            }} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Welcome to your group! <br/><b style={{color:'#4682b4'}}>{groupName}</b></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{width: '100%'}}>
                    {
                        !allSquaresClaimed ?
                        <div>
                            <Row style={{width: '100%'}}>
                                {(pricePerSquare != 0 || venmoUsername)
                                && 
                                <div>
                                    {(pricePerSquare != 0) && `This group has a price of $${pricePerSquare} per square.`}
                                    {venmoUsername && " You'll be able to pay by Venmo after selecting your squares."}
                                    <br/>
                                    <br/>
                                </div>}
                            </Row>
                            <Row style={{width: '100%'}}>
                                <Col style={{width: '100%'}}>
                                    You can start by learning how to play, selecting your squares, or closing this to view your group's board.
                                </Col>
                            </Row>
                            <Row style={{width: '100%', paddingLeft:'20px'}}>
                                <Col style={{width: '100%'}}>
                                    <br/>
                                    <Button 
                                        style={{width: '100%', backgroundColor:'#4682b4', border:'none', padding:'30px 10px 30px 10px'}}
                                        onClick={() => {
                                            setShowModal(true);
                                            setJustJoined(false);
                                        }}
                                    >
                                        Learn <br/>to Play
                                    </Button>
                                </Col>
                                <Col style={{width: '100%'}}>
                                    <br/>
                                    <Button 
                                        style={{width: '100%', backgroundColor:'#4682b4', border:'none', padding:'30px 10px 30px 10px'}}
                                        onClick={claimSquares}
                                    >
                                        Select <br/>Squares
                                    </Button>
                                </Col>
                            </Row>  
                        </div>
                        :
                        <div>
                            All squares in this group have been claimed, but you can check this group's board. 
                            Winner information will be updated here as well.  
                        </div>
                    }  
                </Modal.Body>
            </Modal>

            {/* MODAL FOR SHOWING WINNERS AND PAYOUTS */}
            <Modal centered show={showPaymentModal && !showDisconnectedModal} onHide={() => {
                    window.sessionStorage.setItem("showPaymentModal", false);
                    setShowPaymentModal(false);
                }} style={{ top: "-10%" }}>
                {
                    (quarter1Payout || quarter1Winner  || quarter2Payout  || quarter2Winner  
                        || quarter3Payout  || quarter3Winner  || quarter4Payout  || quarter4Winner )

                    ?

                    <ModalHeader closeButton>
                        <Row className="w-100 justify-content-center">
                            <Col xs={{ span: 4, offset: 1 }} className="text-center">
                                <Modal.Title>Winners</Modal.Title>
                            </Col>
                        </Row>
                    </ModalHeader>

                    :

                    <Modal.Header>
                        <Row className="w-100 justify-content-center">
                            <Col xs={{ span: 6, offset: 1 }} className="text-center">
                                <Modal.Title>No winners for your group yet!</Modal.Title>
                            </Col>
                        </Row>
                    </Modal.Header>
                }
                {
                    (quarter1Payout || quarter1Winner || quarter2Payout || quarter2Winner 
                        || quarter3Payout || quarter3Winner || quarter4Payout || quarter4Winner)

                    &&

                    <Modal.Body>
                        <Row>
                            <br/>
                            <Col>
                                <Row style={center2()}>
                                    <h1>🎉</h1>
                                </Row>
                            </Col>
                            <Col>
                            
                            </Col>
                            <Col>
                                <Row style={center2()}>
                                    <h1>🍾</h1>
                                </Row>
                            </Col>
                            <br/>
                        </Row>
                        <Row 
                            className="justify-content-center align-items-center text-center"
                            style={{ height: "100%" }} // Ensures vertical centering
                        >
                            <Col>
                            {
                                (quarter1Payout || quarter1Winner) &&
                                <div>
                                    <h4>
                                        <br/>
                                        {(quarter1Payout || quarter1Winner) &&"Q1"}{quarter1Payout && " - "}<b style={{color: "green"}}>{quarter1Payout && "$" + quarter1Payout}</b>{quarter1Winner && " - " + quarter1Winner}
                                    </h4>
                                </div>
                            }
                            {
                                (quarter2Payout || quarter2Winner) &&
                                <div>
                                    <h4>
                                        <br/>
                                        {(quarter2Payout || quarter2Winner) &&"Q2"}{quarter2Payout && " - "}<b style={{color: "green"}}>{quarter2Payout && "$" + quarter2Payout}</b>{quarter2Winner && " - " + quarter2Winner}
                                    </h4>
                                </div>
                            }
                            {
                                (quarter3Payout || quarter3Winner) &&
                                <div>
                                    <h4>
                                        <br/>
                                        {(quarter3Payout || quarter3Winner) &&"Q3"}{quarter3Payout && " - "}<b style={{color: "green"}}>{quarter3Payout && "$" + quarter3Payout}</b>{quarter3Winner && " - " + quarter3Winner}
                                    </h4>
                                </div>
                            }
                            {
                                (quarter4Payout || quarter4Winner) &&
                                <div>
                                    <h4>
                                        <br/>
                                        {(quarter4Payout || quarter4Winner) &&"Q4"}{quarter4Payout && " - "}<b style={{color: "green"}}>{quarter4Payout && "$" + quarter4Payout}</b>{quarter4Winner && " - " + quarter4Winner}
                                        <br/>
                                    </h4>
                                </div>
                            }
                            </Col>
                        </Row>
                        <Row>
                        <br/>
                        <br/>
                        </Row>
                        <Row>
                            <br/>
                            <Col>
                                <Row style={center2()}>
                                    <h1>🥂</h1>
                                </Row>
                            </Col>
                            <Col>
                            
                            </Col>
                            <Col>
                                <Row style={center2()}>
                                    <h1>🎊</h1>
                                </Row>
                            </Col>
                            <br/>
                        </Row>
                    </Modal.Body>
                }
            </Modal>
        </Container>
    );

    function gray() {
        return {
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            backgroundColor: 'lightGray', 
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
            backgroundColor: '#4682b4',
            border: 'black',
            padding: 20,
            width: '100%',
            height: '100%'
        }
    }

    function black2() {
        return {
            backgroundColor: '#4682b4',
            border: 'black',
            padding: 20,
            width: '100%',
            height: '100%',
            fontSize:'40px'
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