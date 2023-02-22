import { getFirestore, doc, setDoc } from "firebase/firestore";
import { empty_row } from "../data/EmptyBoardData";

function generateUUID() {
    var d = new Date().getTime();
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;
        if(d > 0){
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
};

export const createGroup = (groupName, groupPassword) => {
    // if groupName is empty, create a group name
    if (groupName === "") {
        groupName = generateUUID().substring(0,8);
    }
    // check if group exists, if not add the group
    let db = getFirestore();
    const groupRef = doc(db, 'group', groupName);
    // setDoc(groupRef, { row1: empty_row }, { merge: true });

    setDoc(groupRef, { 
        password: groupPassword,
        gameData: {
            row0: empty_row,
            row1: empty_row,
            row2: empty_row,
            row3: empty_row,
            row4: empty_row,
            row5: empty_row,
            row6: empty_row,
            row7: empty_row,
            row8: empty_row,
            row9: empty_row
        } 
    });
    console.log("Succesfully created group: " + groupName);
    return groupName;
}