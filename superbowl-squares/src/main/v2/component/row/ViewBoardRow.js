import React from 'react';
import { NumberButton } from '../button/NumberButton.js';
import { ViewBoardButton } from '../button/ViewBoardButton.js';

export function ViewBoardRow(props) {

    const activeArr = props.active;
    const textArr = props.text;

    return (
        <tr style={viewBoardRowStyle()}>
            <td style={viewBoardRowStyle()}>
                <NumberButton number={props.number} />
            </td>
            <td>
            </td>
            <td style={viewBoardRowStyle()}>
                <ViewBoardButton active={activeArr[0]} text={textArr[0]}/>
            </td>
            <td style={viewBoardRowStyle()}>
                <ViewBoardButton active={activeArr[1]} text={textArr[1]}/>
                {/* <ViewBoardButton active={activeArr[1]} text={'BC'}/> */}
            </td>
            <td style={viewBoardRowStyle()}>
                <ViewBoardButton active={activeArr[2]} text={textArr[2]}/>
            </td>
            <td style={viewBoardRowStyle()}>
                <ViewBoardButton active={activeArr[3]} text={textArr[3]}/>
            </td>  
            <td style={viewBoardRowStyle()}>
                <ViewBoardButton active={activeArr[4]} text={textArr[4]}/>
            </td> 
            <td style={viewBoardRowStyle()}>
                <ViewBoardButton active={activeArr[5]} text={textArr[5]}/>
            </td>
            <td style={viewBoardRowStyle()}>
                <ViewBoardButton active={activeArr[6]} text={textArr[6]}/>
            </td>
            <td style={viewBoardRowStyle()}>
                <ViewBoardButton active={activeArr[7]} text={textArr[7]}/>
            </td>
            <td style={viewBoardRowStyle()}>
                <ViewBoardButton active={activeArr[8]} text={textArr[8]}/>
            </td>
            <td style={viewBoardRowStyle()}>
                <ViewBoardButton active={activeArr[9]} text={textArr[9]}/>
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