import allowedMoves, { TIGER, GOAT, mv } from "../constants";
interface Props {
  boardState: Array<string | null>;
  goatsAvailable: number;
}
type ResultType = {
  winner: string;
};

const isMoveAllowedTiger = (
  initialPosition: number,
  newPosition: number,
  move: string,
  step: number,
  boardState: Array<string | null>
) => {
  if (newPosition > 24 && newPosition < 0) {
    return false;
  }
  if (step === 1) {
    if (
      move &&
      allowedMoves[initialPosition].includes(move) &&
      !boardState[newPosition]
    ) {
      return true;
    }
    return false;
  }
  let posOffset = newPosition - initialPosition;
  let middlePos = initialPosition + posOffset / 2;
  if (
    move &&
    allowedMoves[initialPosition].includes(move) &&
    !boardState[newPosition]
  ) {
    if (
      allowedMoves[middlePos].includes(move) &&
      boardState[middlePos] === GOAT
    ) {
      return true;
    } else {
      return false;
    }
  }
  return false;
};
const findNextPositionTiger = (
  currentPosition: number,
  move: string | undefined,
  step: number
) => {
  if (!move) {
    return currentPosition;
  }
  let currentPosOffset = 0;
  switch (move) {
    case mv.top: {
      currentPosOffset = -5;
      break;
    }
    case mv.topRight: {
      currentPosOffset = -4;
      break;
    }
    case mv.right: {
      currentPosOffset = 1;
      break;
    }
    case mv.bottomRight: {
      currentPosOffset = 6;
      break;
    }
    case mv.bottom: {
      currentPosOffset = 5;
      break;
    }
    case mv.bottomLeft: {
      currentPosOffset = 4;
      break;
    }
    case mv.left: {
      currentPosOffset = -1;
      break;
    }
    case mv.topLeft: {
      currentPosOffset = -6;
      break;
    }
    default: {
      currentPosOffset = 0;
      break;
    }
  }
  currentPosOffset = step === 2 ? currentPosOffset * 2 : currentPosOffset;
  return currentPosition + currentPosOffset;
};

function getPossibleNewPositionsTiger(
  initialPosition: number,
  boardState: Array<any>
) {
  let possibleMoves = allowedMoves[initialPosition];
  let newPositions: Array<number> = [];
  possibleMoves.map((direction: string) => {
    let newPosition = findNextPositionTiger(initialPosition, direction, 1);
    if (
      newPosition &&
      isMoveAllowedTiger(initialPosition, newPosition, direction, 1, boardState)
    ) {
      newPositions.push(newPosition);
    }
    newPosition = findNextPositionTiger(initialPosition, direction, 2);
    if (
      newPosition &&
      isMoveAllowedTiger(initialPosition, newPosition, direction, 2, boardState)
    ) {
      newPositions.push(newPosition);
    }
  });
  return newPositions;
}

export function checkResults({
  boardState,
  goatsAvailable,
}: Props): ResultType {
  let winner = "";

  const hasMovableTigers = (boardState: Array<string | null>) => {
    let tigersLocations: Array<number> = [];
    boardState.map((item, index) => {
      if (item === TIGER) {
        tigersLocations.push(index);
      }
    });
    let allPossiblePositions: Array<number> = [];
    tigersLocations.map((position: number) => {
      let possibleNewPositions = getPossibleNewPositionsTiger(
        position,
        boardState
      );
      allPossiblePositions = [...allPossiblePositions, ...possibleNewPositions];
    });
    if (allPossiblePositions.length < 1) return false;
    return true;
  };

  if (goatsAvailable === 0 && !boardState.includes(GOAT)) {
    winner = TIGER;
  }
  if (!hasMovableTigers(boardState)) {
    winner = GOAT;
  }

  return {
    winner,
  };
}

export default checkResults;
