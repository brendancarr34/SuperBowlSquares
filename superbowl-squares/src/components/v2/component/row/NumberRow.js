import React from 'react';
import { NumberButton } from '../button/NumberButton';
import { CornerButton } from '../button/CornerButton';

export function NumberRow(props) {

    return (
        <tr style={numberRowStyle()}>
            <td style={numberRowStyle()}>
                <CornerButton />
            </td>
            <td>
            </td>
            <td style={numberRowStyle()}>
                <NumberButton number={props.numbers[0]}/>
            </td>
            <td style={numberRowStyle()}>
                <NumberButton number={props.numbers[1]}/>
            </td>
            <td style={numberRowStyle()}>
                <NumberButton number={props.numbers[2]}/>
            </td>
            <td style={numberRowStyle()}>
                <NumberButton number={props.numbers[3]}/>
            </td>  
            <td style={numberRowStyle()}>
                <NumberButton number={props.numbers[4]}/>
            </td> 
            <td style={numberRowStyle()}>
                <NumberButton number={props.numbers[5]}/>
            </td>
            <td style={numberRowStyle()}>
                <NumberButton number={props.numbers[6]}/>
            </td>
            <td style={numberRowStyle()}>
                <NumberButton number={props.numbers[7]}/>
            </td>
            <td style={numberRowStyle()}>
                <NumberButton number={props.numbers[8]}/>
            </td>
            <td style={numberRowStyle()}>
                <NumberButton number={props.numbers[9]}/>
            </td>                 
        </tr>
    );

    function numberRowStyle() {
        return {
            textAlign:'center',
            padding: 0,
            margin: 0,
            borderBottom: '1pt solid gray',
            paddingBottom: '15px'
        }
    }
}