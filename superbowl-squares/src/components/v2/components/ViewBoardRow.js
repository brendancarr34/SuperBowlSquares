import React, {useState} from 'react';
import { NumberButton } from '../NumberButton.js';
import { StateButton } from '../StateButton.js';
import { ViewBoardButton } from './ViewBoardButton.js';

export function ViewBoardRow(props) {
    return (
        <tr style={center()}>
            <td style={center()}>
                <NumberButton number={props.number} />
            </td>
            <td style={center()}>
                <ViewBoardButton />
            </td>
            <td style={center()}>
                <ViewBoardButton active={true} />
            </td>
            <td style={center()}>
                <ViewBoardButton />
            </td>
            <td style={center()}>
                <ViewBoardButton />
            </td>  
            <td style={center()}>
                <ViewBoardButton />
            </td> 
            <td style={center()}>
                <ViewBoardButton />
            </td>
            <td style={center()}>
                <ViewBoardButton />
            </td>
            <td style={center()}>
                <ViewBoardButton />
            </td>
            <td style={center()}>
                <ViewBoardButton />
            </td>
            <td style={center()}>
                <ViewBoardButton />
            </td>              
        </tr>
    );

    function center() {
        return {
            textAlign:'center',
            'padding':0,
            'margin':0,
            'border-bottom': '1pt solid gray'
        }
    }
}