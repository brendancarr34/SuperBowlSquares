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

    return (
        <tr style={center()}>
            <td style={center()}>
                <NumberButton number={props.number} />
            </td>
            <td>
            </td>
            <td style={center()}>
                <EditBoardButton />
            </td>
            <td style={center()}>
                <EditBoardButton />
            </td>
            <td style={center()}>
                <EditBoardButton />
            </td>
            <td style={center()}>
                <EditBoardButton />
            </td>  
            <td style={center()}>
                <EditBoardButton />
            </td> 
            <td style={center()}>
                <EditBoardButton />
            </td>
            <td style={center()}>
                <EditBoardButton />
            </td>
            <td style={center()}>
                <EditBoardButton />
            </td>
            <td style={center()}>
                <EditBoardButton />
            </td>
            <td style={center()}>
                <EditBoardButton />
            </td>                 
        </tr>
    );
}