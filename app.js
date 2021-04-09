const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

require('dotenv').config();

const PORT = process.env.WSS_PORT || 8001;

io.on('connection', (socket) => {
	console.log('connected');

	socket.on('test-msg', () => {
		io.emit('test-msg');
	});
});

app.listen(PORT, () => console.log(`Socket listening on port ${PORT}`));
