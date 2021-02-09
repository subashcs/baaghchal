import React, { useEffect, useState } from "react";
import { TIGER, GOAT } from "../constants";
interface Props {
  boardState: Array<string | null>;
  goatsAvailable: number;
}
type ResultType = {
  winner: "tiger" | "goat" | "";
};

export function useResult({ boardState, goatsAvailable }: Props): ResultType {
  const [winner, setWinner] = useState("");
  const haveMovableTigers = (boardState: Array<string | null>) => {
    let tigersLocations: Array<number> = [];
    boardState.map((item, index) => {
      if (item === TIGER) {
        tigersLocations.push(index);
      }
    });
    console.log(tigersLocations);
    return true;
  };

  useEffect(() => {
    if (goatsAvailable === 0 && !boardState.includes(GOAT)) {
      setWinner(() => TIGER);
    }
    if (!haveMovableTigers(boardState)) {
      setWinner(() => GOAT);
    }
  }, [goatsAvailable, boardState]);

  return {
    winner: "tiger",
  };
}
