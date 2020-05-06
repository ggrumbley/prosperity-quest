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
  // send the players object to the new player
  socket.emit('currentPlayers', gameState.players);
  // send the coin object to the new player
  socket.emit('coinLocation', gameState.coin);
  // send the current score
  socket.emit('scoreUpdate', gameState.score);
  // update all other players of the new player
  socket.broadcast.emit('newPlayer', gameState.players[socket.id]);

  socket.on('disconnect', () => {
    console.log('a user disconnected');
    delete gameState.players[socket.id];
    io.emit('disconnect', socket.id);
  });

  // when a player moves, update the player data
  socket.on('playerMovement', (movementData) => {
    movePlayer(socket, movementData, gameState.players);
  });

  socket.on('coinCollected', () => {
    collectCoin(socket, gameState);
  });
});

server.listen(port, () => {
  console.log(`🚀 Listening On === http://localhost:${port} === 🚀`);
});
