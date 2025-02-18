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

  const handleNotesChange = (label, notes) => {
    const updatedItems = itemsList.map(item =>
      item.label === label
        ? { ...item, paid: item.paid, notes: notes } // Create new object with updated values
        : item
    );

    setItemsList(updatedItems);
    
    // Pass the updated list back to the parent (Ledger)
    updateItems(updatedItems);
  }

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
            <Row style={{ display: "grid", gridTemplateColumns: "35% 10% 15% 40%" }}>
              <Col style={{ padding: 0 }}>
                <p style={{ margin: 0, fontSize: 14, padding: 0 }}>{item.label}</p>
              </Col>
              <Col style={{ height: "100%", padding: 0}}>
                <p style={{ margin: 0, fontSize: 14, padding: 0 }}>{item.squares}</p>
              </Col>
              <Col style={{ height: "100%"}}>
                <input
                  className="big-checkbox"
                  type="checkbox"
                  id={`checkbox-${index}`}
                  checked={!!item.paid}
                  onChange={(e) => handleCheckboxChange(item.label, e)}
                  style={{ height: "100%", padding:'10px' }}
                />
              </Col>
              <Col style={{ height: "100%", }}>
                  <input
                    type="text"
                    value={item.notes || ""}
                    onChange={(e) => handleNotesChange(item.label, e.target.value)}
                    placeholder="Add notes..."
                    style={{ width: "100%", fontSize: "14px", }}
                  />
              </Col>
            </Row>
          </div>
        ))}
      </div>
    </>
  );
};

export default ScrollableList;
