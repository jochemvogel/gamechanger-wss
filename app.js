const express = require("express");

const PORT = process.env.PORT || 1234;
const INDEX = "/index.html";

const app = express().use((req, res) =>
    res.sendFile(INDEX, { root: __dirname })
);

const options = {
    cors: {
        origin: "*",
    },
};

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, options);

io.on("connection", (socket) => {
    socket.on("match-updated", (match) => {
        socket.broadcast.emit("match-updated", match);
    });

    socket.on("chat-message", (userName, chatMessage, matchId) => {
        socket.broadcast.emit("chat-message", userName, chatMessage, matchId)
    })
});

httpServer.listen(PORT, () => console.log(`Socket listening on port ${PORT}`));
