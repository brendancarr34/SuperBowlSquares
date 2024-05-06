// // import React, {useState, useEffect} from 'react';
// // import { NumberButton } from '../button/NumberButton.js';
// // import { EditBoardButton } from '../button/EditBoardButton.js';

// // export function EditBoardRow({ number, taken, ids, activeButtons }) {

// //     const [activeArr, setActiveArr] = useState([false, false, false, false, false, false, false, false, false, false]);

// //     // Function to update active buttons based on the prop
// //     const updateActiveButtons = () => {
// //         activeButtons(ids, activeArr);
// //     };

// //     // Effect hook to update active buttons when ids or activeButtons change
// //     useEffect(() => {
// //         updateActiveButtons();
// //     }, [ids, activeButtons]);

// //     // const handleClick = () => {
// //     //     // Your existing handleClick logic
// //     // };

// //     // const [activeArr2, setActiveArr2] = useState([false, false, false, false, false, false, false, false, false, false]);

// //     // // Function to update active buttons based on the prop
// //     // const updateActiveButtons = () => {
// //     //     activeButtons(ids, activeArr2);
// //     // };

// //     // // Effect hook to update active buttons when ids or activeButtons change
// //     // useEffect(() => {
// //     //     updateActiveButtons();
// //     // }, [ids, activeButtons]);

// //     // const number = props.number;
// //     // const activeArr = [false, false, false, false, false, false, false, false, false, false];
// //     const takenArr = taken;
// //     // const ids = props.ids;

// //     // const isButtonActive = (id, active) => {
// //     //     const index = id % 10;
// //     //     activeArr[index] = active;
// //     //     props.activeButtons(ids, activeArr)
// //     // }

// //     return (
// //         <tr style={editBoardRowStyle()}>
// //             <td style={editBoardRowStyle()}>
// //                 <NumberButton number={number}/>
// //             </td>
// //             <td>
// //             </td>
// //             <td style={editBoardRowStyle()}>
// //                 <EditBoardButton taken={takenArr[0]} id={ids[0]} active={activeArr[0]} isActive={updateActiveButtons}/>
// //             </td>
// //             <td style={editBoardRowStyle()}>
// //                 <EditBoardButton taken={takenArr[1]} id={ids[1]} active={activeArr[1]} isActive={updateActiveButtons}/>
// //             </td>
// //             <td style={editBoardRowStyle()}>
// //                 <EditBoardButton taken={takenArr[2]} id={ids[2]} active={activeArr[2]} isActive={updateActiveButtons}/>
// //             </td>
// //             <td style={editBoardRowStyle()}>
// //                 <EditBoardButton taken={takenArr[3]} id={ids[3]} active={activeArr[3]} isActive={updateActiveButtons}/>
// //             </td>  
// //             <td style={editBoardRowStyle()}>
// //                 <EditBoardButton taken={takenArr[4]} id={ids[4]} active={activeArr[4]} isActive={updateActiveButtons}/>
// //             </td> 
// //             <td style={editBoardRowStyle()}>
// //                 <EditBoardButton taken={takenArr[5]} id={ids[5]} active={activeArr[5]} isActive={updateActiveButtons}/>
// //             </td>
// //             <td style={editBoardRowStyle()}>
// //                 <EditBoardButton taken={takenArr[6]} id={ids[6]} active={activeArr[6]} isActive={updateActiveButtons}/>
// //             </td>
// //             <td style={editBoardRowStyle()}>
// //                 <EditBoardButton taken={takenArr[7]} id={ids[7]} active={activeArr[7]} isActive={updateActiveButtons}/>
// //             </td>
// //             <td style={editBoardRowStyle()}>
// //                 <EditBoardButton taken={takenArr[8]} id={ids[8]} active={activeArr[8]} isActive={updateActiveButtons}/>
// //             </td>
// //             <td style={editBoardRowStyle()}>
// //                 <EditBoardButton taken={takenArr[9]} id={ids[9]} active={activeArr[9]} isActive={updateActiveButtons}/>
// //             </td>                 
// //         </tr>
// //     );

// //     function editBoardRowStyle() {
// //         return {
// //             textAlign:'center',
// //             padding: 0,
// //             margin: 0,
// //             borderBottom: '1pt solid gray'
// //         }
// //     }
// // }


// import React, { useState } from 'react';
// import { EditBoardButton } from './EditBoardButton'; // Make sure to import the EditBoardButton component

// export function EditBoardRow({ taken }) {
//   const [activeButtons, setActiveButtons] = useState(Array(10).fill(false));

//   const handleButtonClick = (buttonIndex, newActive) => {
//     const updatedActiveButtons = [...activeButtons];
//     updatedActiveButtons[buttonIndex] = newActive;
//     setActiveButtons(updatedActiveButtons);
//   };

//   return (
//     <div>
//       {activeButtons.map((isActive, index) => (
//         <EditBoardButton
//           key={index}
//         //   taken={/* Your logic for determining if the button is taken */}
//           setActive={newActive => handleButtonClick(index, newActive)}
//         />
//       ))}
//       <div>
//         {/* Display information about which buttons are active */}
//         Active Buttons: {activeButtons.map((isActive, index) => isActive ? `${index} ` : null)}
//       </div>
//     </div>
//   );
// }
