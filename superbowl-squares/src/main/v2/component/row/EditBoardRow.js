import React, {useState} from 'react';
import { NumberButton } from '../button/NumberButton.js';
import { EditBoardButton } from '../button/EditBoardButton.js';

export function EditBoardRow(props) {

    const number = props.number;
    const activeArr = [false, false, false, false, false, false, false, false, false, false];
    const takenArr = props.taken;
    const ids = props.ids;

    const isButtonActive = (id, active) => {
        const index = id % 10;
        activeArr[index] = active;
        props.activeButtons(ids, activeArr)
    }

    return (
        <tr style={editBoardRowStyle()}>
            <td style={editBoardRowStyle()}>
                <NumberButton number={number}/>
            </td>
            <td>
            </td>
            <td style={editBoardRowStyle()}>
                <EditBoardButton taken={takenArr[0]} id={ids[0]} active={activeArr[0]} isActive={isButtonActive}/>
            </td>
            <td style={editBoardRowStyle()}>
                <EditBoardButton taken={takenArr[1]} id={ids[1]} active={activeArr[1]} isActive={isButtonActive}/>
            </td>
            <td style={editBoardRowStyle()}>
                <EditBoardButton taken={takenArr[2]} id={ids[2]} active={activeArr[2]} isActive={isButtonActive}/>
            </td>
            <td style={editBoardRowStyle()}>
                <EditBoardButton taken={takenArr[3]} id={ids[3]} active={activeArr[3]} isActive={isButtonActive}/>
            </td>  
            <td style={editBoardRowStyle()}>
                <EditBoardButton taken={takenArr[4]} id={ids[4]} active={activeArr[4]} isActive={isButtonActive}/>
            </td> 
            <td style={editBoardRowStyle()}>
                <EditBoardButton taken={takenArr[5]} id={ids[5]} active={activeArr[5]} isActive={isButtonActive}/>
            </td>
            <td style={editBoardRowStyle()}>
                <EditBoardButton taken={takenArr[6]} id={ids[6]} active={activeArr[6]} isActive={isButtonActive}/>
            </td>
            <td style={editBoardRowStyle()}>
                <EditBoardButton taken={takenArr[7]} id={ids[7]} active={activeArr[7]} isActive={isButtonActive}/>
            </td>
            <td style={editBoardRowStyle()}>
                <EditBoardButton taken={takenArr[8]} id={ids[8]} active={activeArr[8]} isActive={isButtonActive}/>
            </td>
            <td style={editBoardRowStyle()}>
                <EditBoardButton taken={takenArr[9]} id={ids[9]} active={activeArr[9]} isActive={isButtonActive}/>
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