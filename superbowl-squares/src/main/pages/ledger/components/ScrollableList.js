import React, { useState, useEffect } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const ScrollableList = ({ items, updateItems }) => {

  const [itemsList, setItemsList] = useState(items || []);

  useEffect(() => {
    if (Array.isArray(items)) {
      setItemsList(items);
    }
  }, [items]);

  const handleCheckboxChange = (label, event) => {

    const updatedItems = itemsList.map(item =>
      item.label === label
        ? { ...item, paid: !item.paid, notes: "" } // Create new object with updated values
        : item
    );

    setItemsList(updatedItems);
    
    // Pass the updated list back to the parent (Ledger)
    updateItems(updatedItems); // This will update playerData in Ledger
  };

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
        {itemsList.map((item, index) => ( // ✅ Use itemsList here
          <div key={index} className="list-row">
            <Row style={{ display: "grid", gridTemplateColumns: "45% 15% 40%" }}>
              <Col style={{ padding: 0 }}>
                <p style={{ margin: 0, fontSize: 14, padding: 0 }}>{item.label}</p>
              </Col>
              <Col>
                <input
                  className="big-checkbox"
                  type="checkbox"
                  id={`checkbox-${index}`}
                  checked={!!item.paid}
                  onChange={(e) => handleCheckboxChange(item.label, e)}
                />
              </Col>
              <Col>
                <p style={{ margin: 0, fontSize: 14 }}>{item.notes}</p>
              </Col>
            </Row>
          </div>
        ))}
      </div>
    </>
  );
};

export default ScrollableList;
