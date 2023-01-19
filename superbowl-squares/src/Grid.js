import React from 'react';
import GridLayout from "react-grid-layout";

export class Grid extends React.Component {
    render() {
        const row1 = [
            {i: "1", x:0, y: 0, w: 1, h: 1},
            {i: "2", x:1, y: 0, w: 1, h: 1},
            {i: "3", x:2, y: 0, w: 1, h: 1},
            {i: "4", x:3, y: 0, w: 1, h: 1},
            {i: "5", x:4, y: 0, w: 1, h: 1},
            {i: "6", x:5, y: 0, w: 1, h: 1},
            {i: "7", x:6, y: 0, w: 1, h: 1},
            {i: "8", x:7, y: 0, w: 1, h: 1},
            {i: "9", x:8, y: 0, w: 1, h: 1},
            {i: "10", x:9, y: 0, w: 1, h: 1}
        ]
        const row2 = [
            {i: "11", x:0, y: 1, w: 1, h: 1},
            {i: "12", x:1, y: 1, w: 1, h: 1},
            {i: "13", x:2, y: 1, w: 1, h: 1},
            {i: "14", x:3, y: 1, w: 1, h: 1},
            {i: "15", x:4, y: 1, w: 1, h: 1},
            {i: "16", x:5, y: 1, w: 1, h: 1},
            {i: "17", x:6, y: 1, w: 1, h: 1},
            {i: "18", x:7, y: 1, w: 1, h: 1},
            {i: "19", x:8, y: 1, w: 1, h: 1},
            {i: "20", x:9, y: 1, w: 1, h: 1}
        ]
        const layout = [
            ...row1,
            ...row2
        ];

        return (
            <GridLayout
                className="layout"
                layout={layout}
                cols={10}
                rowHeight={25}
                width={1200}
            >
                <div key="1">AB</div>
                <div key="2">DF</div>
                <div key="3">c</div>
                <div key="4">a</div>
                <div key="5">GH</div>
                <div key="6">c</div>
                <div key="7">a</div>
                <div key="8">TR</div>
                <div key="9">c</div>
                <div key="10">a</div>
                <div key="11">b</div>
                <div key="12">c</div>
                <div key="13">c</div>
                <div key="14">a</div>
                <div key="15">b</div>
                <div key="16">c</div>
                <div key="17">a</div>
                <div key="18">b</div>
                <div key="19">c</div>
                <div key="20">a</div>
            </GridLayout>
        );
    }
}