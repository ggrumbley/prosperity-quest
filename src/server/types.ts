
export interface Player {
  rotation: number;
  x: number;
  y: number;
  playerId: string;
  team: string;
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
