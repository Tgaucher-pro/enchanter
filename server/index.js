const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const { addUser, removeUser, getUser, getUsersInGame } = require("./users.js");

const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", socket => {
  console.log("We have a new connection !! ");

  socket.on("join", ({ name, game }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, game });

    if (error) return callback(error);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the game ${user.game}`
    });
    socket.broadcast
      .to(user.game)
      .emit("message", { user: "admin", text: `${user.name} has joined` });

    socket.join(user.game);

    io.to(user.game).emit("gameData", {
      game: user.game,
      users: getUsersInGame(user.game)
    });
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.game).emit("message", { user: user.name, text: message });
    io.to(user.game).emit("roomData", {
      game: user.game,
      users: getUsersInGame(user.game)
    });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.game).emit("message", {
        user: "admin",
        text: `${user.name} has left in dismay`
      });
    }
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
