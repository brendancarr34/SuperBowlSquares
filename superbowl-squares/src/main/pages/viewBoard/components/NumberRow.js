import React from 'react';
import { NumberButton } from './NumberButton';
import { CornerButton } from './CornerButton';

export function NumberRow(props) {

    return (

            <tr style={numberRowStyle()}>
                <td style={numberRowStyle()}>
                    <CornerButton />
                </td>
                <td style={{paddingLeft:10, margin:0, font:1}}>
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
            padding: '0px',
            margin: '0px',
            borderBottom: '1pt solid gray',
            // paddingBottom: '15px',
            paddingBottom:'8px',
            paddingTop: '8px',
            display: 'flex',
            justifyContent: 'center',
            // flex: '0 1 auto'
        }
    }

    function numberRowStyle2() {
        return {
            textAlign:'center',
            paddingRight: '0px',
            margin: '0px',
            borderBottom: '1pt solid gray',
            // paddingBottom: '15px',
            paddingBottom:'8px',
            paddingTop: '8px',
            display: 'flex',
            // display: 'inline-block',
            justifyContent: 'center',
            whiteSpace: 'nowrap' /* Prevent text from wrapping */
            // flex: '0 1 auto',
            // flex: '0 0 auto'
        }
    }
}