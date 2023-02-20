import React from 'react';
import { NumberButton } from '../NumberButton.js';
import { EditBoardButton } from './EditBoardButton.js';

export function EditBoardRow(props) {
    
    function center() {
        return {
            textAlign:'center',
            'padding':0,
            'margin':0,
            'border-bottom': '1pt solid gray'
        }
    }

    const activeArr = props.active;

    return (
        <tr style={center()}>
            <td style={center()}>
                <NumberButton number={props.number} />
            </td>
            <td>
            </td>
            <td style={center()}>
                <EditBoardButton taken={activeArr[0]}/>
            </td>
            <td style={center()}>
                <EditBoardButton taken={activeArr[1]}/>
            </td>
            <td style={center()}>
                <EditBoardButton taken={activeArr[2]}/>
            </td>
            <td style={center()}>
                <EditBoardButton taken={activeArr[3]}/>
            </td>  
            <td style={center()}>
                <EditBoardButton taken={activeArr[4]}/>
            </td> 
            <td style={center()}>
                <EditBoardButton taken={activeArr[5]}/>
            </td>
            <td style={center()}>
                <EditBoardButton taken={activeArr[6]}/>
            </td>
            <td style={center()}>
                <EditBoardButton taken={activeArr[7]}/>
            </td>
            <td style={center()}>
                <EditBoardButton taken={activeArr[8]}/>
            </td>
            <td style={center()}>
                <EditBoardButton taken={activeArr[9]}/>
            </td>                 
        </tr>
    );
}