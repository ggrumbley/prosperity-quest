import express from 'express';
import { Server } from 'http';
import Socket from 'socket.io';

import { createPlayer, movePlayer, collectCoin } from './listeners';
import * as T from './types';

const app = express();
const server = new Server(app);
const io = Socket.listen(server);

const port = process.env.port || 3000;

const gameState: T.GameState = {
  players: {},
  coin: {
    x: Math.floor(Math.random() * 700) + 50,
    y: Math.floor(Math.random() * 500) + 50,
  },
  score: {
    blue: 0,
    red: 0,
  },
}

app.use(express.static('dist/client'));

io.on('connection', (socket) => {
  console.log('a user connected');

  gameState.players[socket.id] = createPlayer(socket.id);
  socket.emit('currentPlayers', gameState.players);
  socket.emit('coinLocation', gameState.coin);
  socket.emit('scoreUpdate', gameState.score);
  socket.broadcast.emit('newPlayer', gameState.players[socket.id]);

  socket.on('disconnect', () => {
    console.log('a user disconnected');
    delete gameState.players[socket.id];
    io.emit('disconnect', socket.id);
  });

  socket.on('playerMovement', (movementData) => {
    movePlayer(socket, movementData, gameState.players);
  });

  socket.on('coinCollected', () => {
    collectCoin(socket, gameState);
    io.emit('coinLocation', gameState.coin);
    io.emit('scoreUpdate', gameState.score);
  });
});

server.listen(port, () => {
  console.log(`🚀 Listening On === http://localhost:${port} === 🚀`);
});
