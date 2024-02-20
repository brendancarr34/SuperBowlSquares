import React from 'react';
import { NumberButton } from '../button/NumberButton.js';
import { ViewBoardButton3 } from '../button/ViewBoardButton3.js';

export function ViewBoardRow3(props) {

    const activeArr = props.active;
    const textArr = props.text;
    const playerNames = props.playerNames;
    const selectedOption = props.selectedOption;

    return (
        <tr style={viewBoardRowStyle()}>
            <td style={viewBoardRowStyle()}>
                <NumberButton number={props.number} />
            </td>
            <td>
            </td>
            <td style={viewBoardRowStyle()}>
                <ViewBoardButton3 active={activeArr[0]} text={textArr[0]} playerNames={playerNames} selectedOption={selectedOption}/>
            </td>
            <td style={viewBoardRowStyle()}>
                <ViewBoardButton3 active={activeArr[1]} text={textArr[1]} playerNames={playerNames} selectedOption={selectedOption}/>
            </td>
            <td style={viewBoardRowStyle()}>
                <ViewBoardButton3 active={activeArr[2]} text={textArr[2]} playerNames={playerNames} selectedOption={selectedOption}/>
            </td>
            <td style={viewBoardRowStyle()}>
                <ViewBoardButton3 active={activeArr[3]} text={textArr[3]} playerNames={playerNames} selectedOption={selectedOption}/>
            </td>  
            <td style={viewBoardRowStyle()}>
                <ViewBoardButton3 active={activeArr[4]} text={textArr[4]} playerNames={playerNames} selectedOption={selectedOption}/>
            </td> 
            <td style={viewBoardRowStyle()}>
                <ViewBoardButton3 active={activeArr[5]} text={textArr[5]} playerNames={playerNames} selectedOption={selectedOption}/>
            </td>
            <td style={viewBoardRowStyle()}>
                <ViewBoardButton3 active={activeArr[6]} text={textArr[6]} playerNames={playerNames} selectedOption={selectedOption}/>
            </td>
            <td style={viewBoardRowStyle()}>
                <ViewBoardButton3 active={activeArr[7]} text={textArr[7]} playerNames={playerNames} selectedOption={selectedOption}/>
            </td>
            <td style={viewBoardRowStyle()}>
                <ViewBoardButton3 active={activeArr[8]} text={textArr[8]} playerNames={playerNames} selectedOption={selectedOption}/>
            </td>
            <td style={viewBoardRowStyle()}>
                <ViewBoardButton3 active={activeArr[9]} text={textArr[9]} playerNames={playerNames} selectedOption={selectedOption}/>
            </td>              
        </tr>
    );

    function viewBoardRowStyle() {
        return {
            textAlign: 'center',
            padding: 0,
            margin: 0,
            borderBottom: '1pt solid gray'
        }
    }
}