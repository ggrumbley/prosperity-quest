
// export type Team = 'red' | 'blue';

export const enum Team {
  RED = 'red',
  BLUE = 'blue',
}

export interface Player {
  rotation: number;
  x: number;
  y: number;
  playerId: string;
  team: Team;
}

export interface Movement {
  x: number;
  y: number;
  rotation: number;
}

export interface Coin {
  x: number;
  y: number;
}

export interface Score {
  blue: number;
  red: number;
}

export interface GameState {
  players: {
    [key: string]: Player,
  },
  coin: Coin,
  score: Score,
}
