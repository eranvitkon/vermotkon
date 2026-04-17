const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, 'public')));

let orders = [];
let orderCounter = 0;

function broadcast(data) {
  const msg = JSON.stringify(data);
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
}

wss.on('connection', (ws) => {
  ws.send(JSON.stringify({ type: 'init', orders }));

  ws.on('message', (raw) => {
    try {
      const msg = JSON.parse(raw);

      if (msg.type === 'new_order') {
        orderCounter++;
        const order = {
          id: orderCounter,
          name: msg.name,
          cocktail: msg.cocktail,
          done: false,
          time: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
        };
        orders.unshift(order);
        broadcast({ type: 'new_order', order });
      }

      if (msg.type === 'toggle_done') {
        const order = orders.find(o => o.id === msg.id);
        if (order) {
          order.done = !order.done;
          broadcast({ type: 'toggle_done', id: msg.id, done: order.done });
        }
      }

      if (msg.type === 'clear_done') {
        orders = orders.filter(o => !o.done);
        broadcast({ type: 'init', orders });
      }

    } catch (e) {
      console.error('Error parsing message:', e);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`ורמוטקון פועל על פורט ${PORT}`);
});
