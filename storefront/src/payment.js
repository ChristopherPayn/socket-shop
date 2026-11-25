const ws = new WebSocket('ws://192.168.0.250:8081');
const status = document.querySelector('#status');

ws.onopen = () => {
    console.log('Payment page connected to server');
};

ws.onmessage = event => {
    const data = JSON.parse(event.data);
    console.log(data.type);
    if (data.type === "payment_request") {
        status.textContent = `Expecting a payment of ${data.amount}`;
    };
};

ws.onclose = () => {
    console.log('Disconnected from server');
};

document.querySelector('#submit').addEventListener('click', () => {
    const input = document.querySelector('#account-number');

    // TODO: when payment is submitted, check the bank db for the account and
    // do all the banky stuff first, find account, deduct amount etc, then send
    // message back to ws server to say payment made, and clear any info down

    const payload = {
        type: 'payment',
        success: true
    };

    ws.send(JSON.stringify(payload));
    input.value = '';
    status.textContent = '';
});
