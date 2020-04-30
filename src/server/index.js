import express from 'express';
import { Server } from 'http';
import Socket from 'socket.io';

const app = express();
const server = new Server(app);
const io = Socket.listen(server);

const port = process.env.port || 3000;

const gameState = {
  players: {},
  coin: {
    x: Math.floor(Math.random() * 700) + 50,
    y: Math.floor(Math.random() * 500) + 50,
  },
  scores: {
    blue: 0,
    red: 0,
  },
}

app.use(express.static('dist/client'));

io.on('connection', (socket) => {
  console.log('a user connected');

  gameState.players[socket.id] = {
    rotation: 0,
    x: Math.floor(Math.random() * 700) + 50,
    y: Math.floor(Math.random() * 500) + 50,
    playerId: socket.id,
    team: Math.floor(Math.random() * 2) == 0 ? 'red' : 'blue',
  };
  // send the players object to the new player
  socket.emit('currentPlayers', gameState.players);
  // send the coin object to the new player
  socket.emit('coinLocation', gameState.coin);
  // send the current scores
  socket.emit('scoreUpdate', gameState.scores);
  // update all other players of the new player
  socket.broadcast.emit('newPlayer', gameState.players[socket.id]);

  socket.on('disconnect', () => {
    console.log('a user disconnected');
    delete gameState.players[socket.id];
    io.emit('disconnect', socket.id);
  });

  // when a player moves, update the player data
  socket.on('playerMovement', (movementData) => {
    const { players } = gameState;
    players[socket.id].x = movementData.x;
    players[socket.id].y = movementData.y;
    players[socket.id].rotation = movementData.rotation;
    // emit a message to all players about the player that moved
    socket.broadcast.emit('playerMoved', players[socket.id]);
  });

  socket.on('coinCollected', () => {
    const { players, scores, coin } = gameState;
    players[socket.id].team === 'red' ? scores.red += 10 : scores.blue += 10;
    coin.x = Math.floor(Math.random() * 700) + 50;
    coin.y = Math.floor(Math.random() * 500) + 50;
    io.emit('coinLocation', gameState.coin);
    io.emit('scoreUpdate', gameState.scores);
  });
});

server.listen(port, () => {
  console.log(`🚀 Listening On === http://localhost:${port} === 🚀`);
});
