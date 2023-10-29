import React from "react";
import "./Dice.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
  faDiceSix,
} from "@fortawesome/free-solid-svg-icons";

interface DieProps {
  face: string;
  rolling: boolean;
}

const Die: React.FC<DieProps> = ({ face, rolling }) => {
  console.log(face, "here is the random face");
  let icon;

  switch (face) {
    case "one":
      icon = faDiceOne;
      break;
    case "two":
      icon = faDiceTwo;
      break;
    case "three":
      icon = faDiceThree;
      break;
    case "four":
      icon = faDiceFour;
      break;
    case "five":
      icon = faDiceFive;
      break;
    case "six":
      icon = faDiceSix;
      break;
    default:
      icon = faDiceOne; // Default to "one" icon if face is not recognized
  }

  return (
    <div>
      <FontAwesomeIcon
        icon={icon}
        className={`Die ${rolling ? "Die-shaking" : ""}`}
      />
    </div>
  );
};

export default Die;
