import React from "react";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const ScrollableList = ({ items }) => {
  return (
    <>
      <style>
        {`
          .scrollable-container {
            width: 100%;
            max-height: 300px; /* Adjust height as needed */
            overflow-y: auto;
            border: 1px solid #ccc; /* Optional border */
            padding: 10px;
            background-color: #f9f9f9; /* Optional background */
          }

          .list-row {
            padding: 10px;
            border-bottom: 1px solid #eee; /* Optional row separator */
            font-size: 16px;
          }

          .list-row:last-child {
            border-bottom: none; /* Remove border for the last row */
          }
        `}
      </style>
      <div className="scrollable-container">
        {items.map((item, index) => (
          <div key={index} className="list-row">
            <Row>
                <Col>
                {item}
                </Col>
                <Col>
                paid/unpaid
                </Col>
                <Col>
                notes
                </Col>
            </Row>
          </div>
        ))}
      </div>
    </>
  );
};

export default ScrollableList;
