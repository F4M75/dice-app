"use client";

import React, { useState } from "react";
import "./RollDice.css";
import Die from "./Dice";

interface RollDiceProps {
  sides: string[];
}

const RollDice: React.FC<RollDiceProps> = ({ sides }) => {
  const [die1, setDie1] = useState("one");
  const [die2, setDie2] = useState("one");
  const [rolling, setRolling] = useState(false);

  const roll = () => {
    const randomSideIndex1 = Math.floor(Math.random() * sides.length);
    const randomSideIndex2 = Math.floor(Math.random() * sides.length);
    setDie1(sides[randomSideIndex1]);
    setDie2(sides[randomSideIndex2]);
    setRolling(true);

    setTimeout(() => {
      setRolling(false);
    }, 1000);
  };

  const handleBtn = rolling ? "RollDice-rolling" : "";

  return (
    <div className="RollDice">
      <div className="RollDice-container">
        <Die face={die1} rolling={rolling} />
        <Die face={die2} rolling={rolling} />
      </div>
      <button className={handleBtn} disabled={rolling} onClick={roll}>
        {rolling ? "Rolling" : "Roll Dice!"}
      </button>
    </div>
  );
};

RollDice.defaultProps = {
  sides: ["one", "two", "three", "four", "five", "six"],
};

export default RollDice;
