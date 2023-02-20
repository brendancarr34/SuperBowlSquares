import React from 'react';
import { NumberButton } from '../button/NumberButton.js';
import { EditBoardButton } from '../button/EditBoardButton.js';

export function EditBoardRow(props) {

    const activeArr = props.active;

    return (
        <tr style={editBoardRowStyle()}>
            <td style={editBoardRowStyle()}>
                <NumberButton number={props.number} />
            </td>
            <td>
            </td>
            <td style={editBoardRowStyle()}>
                <EditBoardButton taken={activeArr[0]}/>
            </td>
            <td style={editBoardRowStyle()}>
                <EditBoardButton taken={activeArr[1]}/>
            </td>
            <td style={editBoardRowStyle()}>
                <EditBoardButton taken={activeArr[2]}/>
            </td>
            <td style={editBoardRowStyle()}>
                <EditBoardButton taken={activeArr[3]}/>
            </td>  
            <td style={editBoardRowStyle()}>
                <EditBoardButton taken={activeArr[4]}/>
            </td> 
            <td style={editBoardRowStyle()}>
                <EditBoardButton taken={activeArr[5]}/>
            </td>
            <td style={editBoardRowStyle()}>
                <EditBoardButton taken={activeArr[6]}/>
            </td>
            <td style={editBoardRowStyle()}>
                <EditBoardButton taken={activeArr[7]}/>
            </td>
            <td style={editBoardRowStyle()}>
                <EditBoardButton taken={activeArr[8]}/>
            </td>
            <td style={editBoardRowStyle()}>
                <EditBoardButton taken={activeArr[9]}/>
            </td>                 
        </tr>
    );

    function editBoardRowStyle() {
        return {
            textAlign:'center',
            padding: 0,
            margin: 0,
            borderBottom: '1pt solid gray'
        }
    }
}