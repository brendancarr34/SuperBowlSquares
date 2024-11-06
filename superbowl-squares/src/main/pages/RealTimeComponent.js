// In a React component
import { useEffect, useState } from 'react';
import { ws_url } from '../../config';

function RealTimeComponent() {
    const [data, setData] = useState([]);
    const [gameData, setGameData] = useState({});
    const [connectionStatus, setConnectionStatus] = useState('Disconnected');

    useEffect(() => {
        const ws = new WebSocket(ws_url);

        ws.onopen = () => {
            console.log('WebSocket connected');
            setConnectionStatus('Connected');
        };

        ws.onmessage = (event) => {
            const newData = JSON.parse(event.data);
            // setData((prevData) => [...prevData, newData]);
            const doc = newData.find(item => Object.keys(item)[0] === 'brendan-test-2');
            setGameData(doc['brendan-test-2'])
            setData([newData]);
        };

        ws.onclose = () => console.log('WebSocket closed');
        ws.onerror = (error) => console.error('WebSocket error:', error);

        return () => ws.close();
    }, []);

    return (
        <div>
            <h1>Real-Time Data</h1>
            <p>Status: {connectionStatus}</p>
            {/* <ul>
                {data.map((item, index) => {
                    const docId = Object.keys(item)[2];
                    const docData = item[docId];
                    return (
                        <li key={index}>
                            <strong>{docId}:</strong> {JSON.stringify(docData)}
                        </li>
                    );
                })}
            </ul> */}
            <ul>
                {JSON.stringify(gameData)}
            </ul>
        </div>
    );
}

export default RealTimeComponent;
