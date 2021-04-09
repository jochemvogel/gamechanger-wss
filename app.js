const express = require('express');
const app = express();
const options = {
	cors: {
		origin: '*',
	},
};
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, options);

require('dotenv').config();

const PORT = process.env.WSS_PORT || 8001;

io.on('connection', (socket) => {
	console.log('connected');

	socket.on('test-msg', () => {
		io.emit('test-msg');
	});
});

httpServer.listen(PORT, () => console.log(`Socket listening on port ${PORT}`));
