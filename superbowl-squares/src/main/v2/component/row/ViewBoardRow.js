import React from 'react';
import { NumberButton } from '../button/NumberButton.js';
import { ViewBoardButton } from '../button/ViewBoardButton.js';

export function ViewBoardRow(props) {

    const activeArr = props.active;

    return (
        <tr style={viewBoardRowStyle()}>
            <td style={viewBoardRowStyle()}>
                <NumberButton number={props.number} />
            </td>
            <td>
            </td>
            <td style={viewBoardRowStyle()}>
                <ViewBoardButton active={activeArr[0]}/>
            </td>
            <td style={viewBoardRowStyle()}>
                <ViewBoardButton active={activeArr[1]}/>
                {/* <ViewBoardButton active={activeArr[1]} text={'BC'}/> */}
            </td>
            <td style={viewBoardRowStyle()}>
                <ViewBoardButton active={activeArr[2]}/>
            </td>
            <td style={viewBoardRowStyle()}>
                <ViewBoardButton active={activeArr[3]}/>
            </td>  
            <td style={viewBoardRowStyle()}>
                <ViewBoardButton active={activeArr[4]}/>
            </td> 
            <td style={viewBoardRowStyle()}>
                <ViewBoardButton active={activeArr[5]}/>
            </td>
            <td style={viewBoardRowStyle()}>
                <ViewBoardButton active={activeArr[6]}/>
            </td>
            <td style={viewBoardRowStyle()}>
                <ViewBoardButton active={activeArr[7]}/>
            </td>
            <td style={viewBoardRowStyle()}>
                <ViewBoardButton active={activeArr[8]}/>
            </td>
            <td style={viewBoardRowStyle()}>
                <ViewBoardButton active={activeArr[9]}/>
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