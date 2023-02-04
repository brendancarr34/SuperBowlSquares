import React from 'react';
import { NumberButton } from './NumberButton';
import { StateButton } from './StateButton';
import { CornerButton } from './CornerButton';

export function NumberRow() {
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
                <CornerButton />
            </td>
            <td style={center()}>
                <NumberButton />
            </td>
            <td style={center()}>
                <NumberButton />
            </td>
            <td style={center()}>
                <NumberButton />
            </td>
            <td style={center()}>
                <NumberButton />
            </td>  
            <td style={center()}>
                <NumberButton />
            </td> 
            <td style={center()}>
                <NumberButton />
            </td>
            <td style={center()}>
                <NumberButton />
            </td>
            <td style={center()}>
                <NumberButton />
            </td>
            <td style={center()}>
                <NumberButton />
            </td>
            <td style={center()}>
                <NumberButton />
            </td>                 
        </tr>
    );
}