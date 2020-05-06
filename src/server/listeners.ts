import * as Socket from 'socket.io';
import * as T from './types';

export const createPlayer = (playerId: string): T.Player => ({
  rotation: 0,
  x: Math.floor(Math.random() * 700) + 50,
  y: Math.floor(Math.random() * 500) + 50,
  playerId,
  team: Math.floor(Math.random() * 2) == 0 ? 'red' : 'blue',
});

export const movePlayer = (socket: Socket.Socket, movementData: T.Movement, players: { [key: string]: T.Player }) => {
  const { x, y, rotation } = movementData;
  players[socket.id].x = x;
  players[socket.id].y = y;
  players[socket.id].rotation = rotation;
  // emit a message to all players about the player that moved
  socket.broadcast.emit('playerMoved', players[socket.id]);
}

export const collectCoin = (socket: Socket.Socket, state: T.GameState) => {
  const { players, score, coin } = state;
  players[socket.id].team === 'red' ? score.red += 10 : score.blue += 10;
  coin.x = Math.floor(Math.random() * 700) + 50;
  coin.y = Math.floor(Math.random() * 500) + 50;
}
