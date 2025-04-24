import * as tf from "@tensorflow/tfjs-core";
import { getInvTransform, transformBoundary, transformCenters } from "./warp";
import { invalidVideo } from "./detect";
import { detect, getKeypoints, getSquares, getUpdate } from "./findPieces";
import { Chess, Color, PieceSymbol, Square } from "chess.js";
import { PIECE_SYMBOLS, SQUARE_NAMES } from "./constants";
import { gameResetMoves, gameSetFen, gameSetStart } from "../slices/gameSlice";
import { renderState } from "./render/renderState";
import { SetStringArray } from "../types";

interface findFenInput {
  piecesModelRef: any;
  videoRef: any;
  cornersRef: any;
  canvasRef: any;
  dispatch: any;
  setText: SetStringArray;
  color: Color;
}

const getFenAndError = (board: Chess, color: Color): { fen: string; error: string | null } | undefined => {
  let fen = board.fen();
  const otherColor: Color = color === "w" ? "b" : "w";
  fen = fen.replace(` ${otherColor} `, ` ${color} `);

  let error: string | null = null;

  for (let i = 0; i < 64; i++) {
    const square: Square = SQUARE_NAMES[i];
    const piece = board.get(square);
    if (!piece) continue;

    const isKing = piece.type === "k";
    const isOtherColor = piece.color === otherColor;
    const isAttacked = board.isAttacked(square, color);

    if (isKing && isOtherColor && isAttacked) {
      error = "Side to move has opponent in check";
      return { fen, error };
    }
  }

  return { fen, error };
};

const setFenFromState = (
  state: number[][],
  color: Color,
  dispatch: any,
  setText: SetStringArray
) => {
  const assignment = Array(64).fill(-1);

  // Assigner le roi noir
  let bestBlackKingIdx = -1;
  let bestBlackKingScore = -1;
  for (let i = 0; i < 64; i++) {
    const score = state[i][1];
    if (score > bestBlackKingScore) {
      bestBlackKingScore = score;
      bestBlackKingIdx = i;
    }
  }
  if (bestBlackKingIdx !== -1) assignment[bestBlackKingIdx] = 1;

  // Assigner le roi blanc
  let bestWhiteKingIdx = -1;
  let bestWhiteKingScore = -1;
  for (let i = 0; i < 64; i++) {
    if (i === bestBlackKingIdx) continue;
    const score = state[i][7];
    if (score > bestWhiteKingScore) {
      bestWhiteKingScore = score;
      bestWhiteKingIdx = i;
    }
  }
  if (bestWhiteKingIdx !== -1) assignment[bestWhiteKingIdx] = 7;

  const remainingPieceIdxs = [0, 2, 3, 4, 5, 6, 8, 9, 10, 11];
  for (let i = 0; i < 64; i++) {
    if (assignment[i] !== -1) continue;

    let bestIdx: number | null = null;
    let bestScore = 0.3;
    remainingPieceIdxs.forEach((j) => {
      const square: Square = SQUARE_NAMES[i];
      const badRank = square[1] === "1" || square[1] === "8";
      const isPawn = PIECE_SYMBOLS[j % 6] === "p";
      if (isPawn && badRank) return;

      const score = state[i][j];
      if (score > bestScore) {
        bestIdx = j;
        bestScore = score;
      }
    });

    if (bestIdx !== null) assignment[i] = bestIdx;
  }

  const board = new Chess();
  board.clear();

  for (let i = 0; i < 64; i++) {
    if (assignment[i] === -1) continue;
    const piece: PieceSymbol = PIECE_SYMBOLS[assignment[i] % 6];
    const pieceColor: Color = assignment[i] > 5 ? "w" : "b";
    const square: Square = SQUARE_NAMES[i];
    board.put({ type: piece, color: pieceColor }, square);
  }

  const result = getFenAndError(board, color);
  if (result) {
    const { fen, error } = result;
    if (error === null) {
      dispatch(gameSetStart(fen));
      dispatch(gameSetFen(fen));
      dispatch(gameResetMoves());
      setText(["Set starting FEN"]);
    } else {
      setText(["Invalid FEN:", error]);
    }
  } else {
    setText(["Error: Unable to retrieve FEN"]);
  }
};

export const _findFen = async ({
  piecesModelRef,
  videoRef,
  cornersRef,
  canvasRef,
  dispatch,
  setText,
  color,
}: findFenInput) => {
  if (invalidVideo(videoRef)) return;

  const keypoints = getKeypoints(cornersRef, canvasRef);
  const invTransform = getInvTransform(keypoints);
  const [centers, centers3D] = transformCenters(invTransform);
  const [boundary, boundary3D] = transformBoundary(invTransform);

  const { boxes, scores } = await detect(piecesModelRef, videoRef, keypoints);
  const squares = getSquares(boxes, centers3D, boundary3D);
  const state = getUpdate(scores, squares);

  setFenFromState(state, color, dispatch, setText);
  renderState(canvasRef.current, centers, boundary, state);

  tf.dispose([boxes, scores, centers3D, boundary3D]);
};

export const findFen = async ({
  piecesModelRef,
  videoRef,
  cornersRef,
  canvasRef,
  dispatch,
  setText,
  color,
}: findFenInput) => {
  const startTensors = tf.memory().numTensors;

  await _findFen({
    piecesModelRef,
    videoRef,
    cornersRef,
    canvasRef,
    dispatch,
    setText,
    color,
  });

  const endTensors = tf.memory().numTensors;
  if (startTensors < endTensors) {
    console.error(`Memory Leak! (${endTensors} > ${startTensors})`);
  }

  return () => {
    tf.disposeVariables();
  };
};
