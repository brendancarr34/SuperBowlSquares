import React from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';

export function CornerButton() {
    return (
        <MDBBtn disabled className="square-md" style={cornerButtonStyle()}/>
    );

    function cornerButtonStyle() {
        return {
            backgroundColor: "gray" ,
            color: "gray",
            fontSize: 16,
            padding: 0,
            margin:0,
            border:'1px solid gray'
        }
    }
}