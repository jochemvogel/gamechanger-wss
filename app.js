require('dotenv').config();

const express = require('express');

const PORT = process.env.WSS_PORT || 1234;
const INDEX = '/index.html';

const app = express().use((req, res) =>
	res.sendFile(INDEX, { root: __dirname })
);

const options = {
	cors: {
		origin: '*',
	},
};

const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, options);

io.on('connection', (socket) => {
	console.log('connected');

	socket.on('test-msg', () => {
		io.emit('test-msg');
	});
});

httpServer.listen(PORT, () => console.log(`Socket listening on port ${PORT}`));
