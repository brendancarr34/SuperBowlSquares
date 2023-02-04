import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { NumberButton } from './NumberButton.js';
import { StateButton } from './StateButton.js';

export function ButtonRow() {
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
                <NumberButton number='9' />
            </td>
            <td style={center()}>
                <StateButton />
            </td>
            <td style={center()}>
                <StateButton />
            </td>
            <td style={center()}>
                <StateButton />
            </td>
            <td style={center()}>
                <StateButton />
            </td>  
            <td style={center()}>
                <StateButton />
            </td> 
            <td style={center()}>
                <StateButton />
            </td>
            <td style={center()}>
                <StateButton />
            </td>
            <td style={center()}>
                <StateButton />
            </td>
            <td style={center()}>
                <StateButton />
            </td>
            <td style={center()}>
                <StateButton />
            </td>                 
        </tr>
    );
}