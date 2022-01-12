import React, { useEffect, useState } from "react";
import BoardSquare from "./BoardSquare";

export default function Board({ board, turn }) {
  const [currBoard, setCurrBoard] = useState([]);

  useEffect(() => {
    setCurrBoard(turn === "w" ? board.flat() : board.flat().reverse());
  }, [turn, board]);

  const getXYPosition = (index) => {
    const x = turn === "w" ? index % 8 : Math.abs((index % 8) - 7);
    const y =
      turn === "w"
        ? Math.abs(Math.floor(index / 8 - 7))
        : Math.floor(index / 8);
    return { x, y };
  };

  const isBlack = (index) => {
    const { x, y } = getXYPosition(index);
    return (x + y) % 2 === 1;
  };

  const getPosition = (index) => {
    const { x, y } = getXYPosition(index);
    const letter = ["a", "b", "c", "d", "e", "f", "g", "h"][x];
    return `${letter}${y + 1}`;
  };

  return (
    <div className="board">
      {currBoard.map((piece, index) => (
        <div key={index} className="square">
          <BoardSquare
            piece={piece}
            black={isBlack(index)}
            position={getPosition(index)}
          />
        </div>
      ))}
    </div>
  );
}
