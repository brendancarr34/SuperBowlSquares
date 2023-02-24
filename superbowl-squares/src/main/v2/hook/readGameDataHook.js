import { getFirestore, doc, getDoc } from "firebase/firestore";
import { topNumbers, sideNumbers, emptyBoard, emptyNameBoard } from '../data/EmptyBoardData.js';



export const readGameData = (groupName) => {

    let gameData = emptyBoard;
    let gameNameData = emptyNameBoard;

    const firestore = getFirestore();
    const docRef = doc(firestore, 'group', groupName);
    async function readGameDataFromDoc() {
        const mySnapshot = await getDoc(docRef);
        if (mySnapshot.exists()) {
            const docData = mySnapshot.data();
            var gameRows = [];
            gameRows.push(docData.gameData.row0);
            gameRows.push(docData.gameData.row1);
            gameRows.push(docData.gameData.row2);
            gameRows.push(docData.gameData.row3);
            gameRows.push(docData.gameData.row4);
            gameRows.push(docData.gameData.row5);
            gameRows.push(docData.gameData.row6);
            gameRows.push(docData.gameData.row7);
            gameRows.push(docData.gameData.row8);
            gameRows.push(docData.gameData.row9);
            gameData = gameRows;
            var gameNameRows = [];
            gameNameRows.push(docData.gameData.row0_players)
            gameNameRows.push(docData.gameData.row1_players)
            gameNameRows.push(docData.gameData.row2_players)
            gameNameRows.push(docData.gameData.row3_players)
            gameNameRows.push(docData.gameData.row4_players)
            gameNameRows.push(docData.gameData.row5_players)
            gameNameRows.push(docData.gameData.row6_players)
            gameNameRows.push(docData.gameData.row7_players)
            gameNameRows.push(docData.gameData.row8_players)
            gameNameRows.push(docData.gameData.row9_players)
            gameNameData = gameNameRows;
            console.log("set gameNAmeDate:" + gameNameData);
        };
    };
    readGameDataFromDoc();

    return [gameData, gameNameData];
}