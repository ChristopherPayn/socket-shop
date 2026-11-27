const ws = new WebSocket('ws://192.168.0.250:8081');
const status = document.querySelector('#status');
const holding = document.querySelector('#holding');
const paymentForm = document.querySelector('#payment-form');
const amountDisplay = document.querySelector('#amount-display');
const accountNumberInput = document.querySelector('#account-number');

ws.onopen = () => {
    console.log('Payment page connected to server');
};

// temporary
holding.addEventListener('click', () => transitionToPaymentForm());

ws.onmessage = event => {
    const data = JSON.parse(event.data);
    console.log(data.type);
    if (data.type === "payment_request") {
        transitionToPaymentForm(data.amount) // TODO: check in number or string
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

const updateAmountDisplay = (amountToPay) => {
    amountDisplay.textContent = `♥︎${amountToPay || 0}`
};

const transitionToPaymentForm = (amountToPay) => {
    holding.style.display = 'none';
    paymentForm.style.opacity = 1;
    updateAmountDisplay(amountToPay);
    accountNumberInput.focus();
};
