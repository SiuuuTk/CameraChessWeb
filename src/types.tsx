import { Dispatch, SetStateAction } from "react"; // Corrige le nom du module

interface Study {
  id: string;
  name: string;
}

interface ModelRefs {
  piecesModelRef: any;
  xcornersModelRef: any;
}

interface MovesData {
  sans: string[];
  from: number[];
  to: number[];
  targets: number[];
}

interface MovesPair {
  move1: MovesData;
  move2: MovesData | null;
  moves: MovesData | null;
}

type CornersKey = "h1" | "a1" | "a8" | "h8";

interface CornersPayload {
  key: CornersKey;
  xy: number[];
}

type CornersDict = { [key in CornersKey]: number[] };

interface Game {
  fen: string;
  moves: string;
  start: string;
  lastMove: string;
  greedy: boolean;
}

interface User {
  token: string;
  username: string;
}

interface RootState {
  game: Game;
  corners: CornersDict;
  user: User;
}

type Mode = "record" | "upload" | "broadcast" | "play";

type SetBoolean = Dispatch<SetStateAction<boolean>>;
type SetString = Dispatch<SetStateAction<string>>;
type SetStringArray = Dispatch<SetStateAction<string[]>>; // une seule fois ici
type SetNumber = Dispatch<SetStateAction<number>>;
type SetStudy = Dispatch<SetStateAction<Study | null>>;

export type {
  RootState,
  Study,
  ModelRefs,
  MovesData,
  MovesPair,
  CornersDict,
  CornersKey,
  CornersPayload,
  Game,
  SetBoolean,
  SetString,
  SetStringArray,
  SetNumber,
  Mode,
  SetStudy,
};
