"use client";

import React, { useState, useEffect } from "react";
import "./RollDice.css";
import Die from "./Dice";
import "tailwindcss/tailwind.css";

interface RollDiceProps {
  sides: string[];
}

const RollDice: React.FC<RollDiceProps> = ({ sides }) => {
  const [die1, setDie1] = useState("one");
  const [die2, setDie2] = useState("one");
  const [rolling, setRolling] = useState(false);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState<number | null>(null);
  const [turn, setTurn] = useState(1);
  const [player1TurnsLeft, setPlayer1TurnsLeft] = useState(3);
  const [player2TurnsLeft, setPlayer2TurnsLeft] = useState(3);

  useEffect(() => {
    // Randomly choose the starting player (1 or 2) when the component mounts.
    setCurrentPlayer(Math.random() < 0.5 ? 1 : 2);
  }, []);

  const roll = () => {
    if (
      (currentPlayer === 1 && player1TurnsLeft === 0) ||
      (currentPlayer === 2 && player2TurnsLeft === 0)
    ) {
      return; // No more turns left for the current player
    }

    if (turn > 6) {
      return; // The game is over
    }

    const randomSideIndex1 = Math.floor(Math.random() * sides.length);
    const randomSideIndex2 = Math.floor(Math.random() * sides.length);
    const newDie1 = sides[randomSideIndex1];
    const newDie2 = sides[randomSideIndex2];
    setDie1(newDie1);
    setDie2(newDie2);
    setRolling(true);

    setTimeout(() => {
      setRolling(false);

      // Calculate score of each player
      const total = sides.indexOf(newDie1) + sides.indexOf(newDie2) + 2;
      if (currentPlayer === 1) {
        setPlayer1Score(player1Score + total);
        setPlayer1TurnsLeft(player1TurnsLeft - 1);
      } else {
        setPlayer2Score(player2Score + total);
        setPlayer2TurnsLeft(player2TurnsLeft - 1);
      }

      if (turn < 6) {
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        setTurn(turn + 1);
      } else {
        // Calculate the final winner or declare a tie
        if (player1Score > player2Score) {
          alert("Player 1 wins!");
        } else if (player2Score > player1Score) {
          alert("Player 2 wins!");
        } else {
          alert("It's a tie!");
        }
      }
    }, 1000);
  };

  const resetGame = () => {
    // reset the game: score and turn for each player
    setDie1("one");
    setDie2("one");
    setRolling(false);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setCurrentPlayer(null);
    setTurn(1);
    setPlayer1TurnsLeft(3);
    setPlayer2TurnsLeft(3);
  };

  const handleBtn = rolling ? "RollDice-rolling" : "";

  return (
    <div className="container mx-auto my-10 text-center">
      <h1 className="text-3xl font-bold mb-6">Roll the Dice</h1>
      <div className="flex justify-center items-center">
        <div className="w-1/2 pr-4">
          <Die face={die1} rolling={rolling} />
        </div>
        <div className="w-1/2 pl-4">
          <Die face={die2} rolling={rolling} />
        </div>
      </div>
      <button
        className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded ${
          rolling || (player1TurnsLeft === 0 && player2TurnsLeft === 0)
            ? "cursor-not-allowed"
            : ""
        }`}
        disabled={rolling || (player1TurnsLeft === 0 && player2TurnsLeft === 0)}
        onClick={roll}
      >
        {rolling
          ? "Rolling"
          : player1TurnsLeft > 0 || player2TurnsLeft > 0
          ? "Roll Dice!"
          : "Game Over"}
      </button>
      <div className="mt-6">
        <p className="text-xl mb-2">
          Player 1 Score: <span className="font-semibold">{player1Score}</span>
        </p>
        <p className="text-xl mb-2">
          Player 2 Score: <span className="font-semibold">{player2Score}</span>
        </p>
        {currentPlayer && (
          <p className="text-xl">
            Current Player:{" "}
            <span className="font-semibold">Player {currentPlayer}</span>
          </p>
        )}
        <p className="text-xl">
          Turns Left - Player 1: {player1TurnsLeft}, Player 2:{" "}
          {player2TurnsLeft}
        </p>
      </div>
      <button
        className="mt-6 bg-red-500 text-white font-semibold py-2 px-4 rounded"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
};

RollDice.defaultProps = {
  sides: ["one", "two", "three", "four", "five", "six"],
};

export default RollDice;
