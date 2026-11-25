const ws = new WebSocket('ws://192.168.0.250:8081');
const input = document.querySelector('#total');

ws.onopen = () => {
    console.log('Basket page connected to server');
};

ws.onmessage = event => {
    const status = document.querySelector('#status');
    const data = JSON.parse(event.data);
    console.log(data.type);
    if (data.type === "payment_success") {
        status.textContent = `Payment complete!`;
        input.value = '';
    };
};

ws.onclose = () => {
    console.log('Disconnected from server');
};

document.querySelector('#pay').addEventListener('click', () => {
    const status = document.querySelector('#status');
    status.textContent = `Awaiting payment of ${input.value}`;
    const payload = {
        type: 'basket_request',
        amount: input.value
    };
    ws.send(JSON.stringify(payload));
});
