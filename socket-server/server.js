import { WebSocketServer } from 'ws';

const HOST = '0.0.0.0';
const PORT = 8081;

const server = new WebSocketServer({
    host: HOST,
    port: PORT,
});

const clients = new Set();

server.on('connection', (socket) => {
    clients.add(socket);

    socket.on('message', (message) => {
        const data = JSON.parse(message);
        const { type, amount, success } = data;

        let outgoingMessage;
        console.log(`${type}, ${amount}, ${success}`);

        if (type === 'basket_request') {
            outgoingMessage = {
                type: 'payment_request',
                amount
            };
        } else if (type === 'payment' && success) {
            outgoingMessage = {
                type: 'payment_success'
            };
        } else {
            outgoingMessage = {};
        };

        clients.forEach((client) => {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(outgoingMessage));
            }
        });
    });

    socket.on('close', () => {
        clients.delete(socket);
    });
});

console.log(`WebSocket server is running on ws://${HOST}:${PORT}`);
