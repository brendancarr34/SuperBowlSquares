import React from 'react';
import { NumberButton } from './NumberButton';
import { CornerButton } from './component/CornerButton';

export function NumberRow(props) {
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
            <td>

            </td>
            <td style={center()}>
                <NumberButton number={props.numbers[0]}/>
            </td>
            <td style={center()}>
                <NumberButton number={props.numbers[1]}/>
            </td>
            <td style={center()}>
                <NumberButton number={props.numbers[2]}/>
            </td>
            <td style={center()}>
                <NumberButton number={props.numbers[3]}/>
            </td>  
            <td style={center()}>
                <NumberButton number={props.numbers[4]}/>
            </td> 
            <td style={center()}>
                <NumberButton number={props.numbers[5]}/>
            </td>
            <td style={center()}>
                <NumberButton number={props.numbers[6]}/>
            </td>
            <td style={center()}>
                <NumberButton number={props.numbers[7]}/>
            </td>
            <td style={center()}>
                <NumberButton number={props.numbers[8]}/>
            </td>
            <td style={center()}>
                <NumberButton number={props.numbers[9]}/>
            </td>                 
        </tr>
    );
}