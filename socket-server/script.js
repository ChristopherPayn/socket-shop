const ws = new WebSocket('ws://192.168.0.250:8081');

ws.onopen = () => {
    console.log('Connected to server');
};

ws.onmessage = event => {
    const messages = document.querySelector('#messages');
    const newMessage = document.createElement('div');
    console.log('FILTER:', { event: event.data });
    newMessage.textContent = `Server: ${event.data}`;
    messages.appendChild(newMessage);
};

ws.onclose = () => {
    console.log('Disconnected from server');
};

document.querySelector('#send').addEventListener('click', () => {
    const input = document.querySelector('#message');
    ws.send(input.value);
    input.value = '';
});
