import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { StateButton } from './StateButton.js';

export function ButtonRow() {
    function center() {
        return {textAlign:'center'}
    }

    return (
        <tr>
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