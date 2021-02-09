import * as React from "react";
import Holder from "./Holder";
import BoardMaker from "./BoardMaker";
import allowedMoves, { TIGER, GOAT } from "../constants";
import Tiger from "./Tiger";
import Goat from "./Goat";

export interface IAppProps {
  spacing: number;
  vSpacing: number;
  handleHolderClick: (position: number) => void;
  boardState: Array<string | null>;
  tigerTurn: boolean;
  goatsAvailable: number;
  isMoveAllowedGoat: (
    initialPosition: number,
    newPosition: number,
    move: string | undefined
  ) => boolean;
  moveGoat: (initialPosition: number, newPosition: number) => void;
  resetGoatMove: (position: number) => void;

  selectTigerToMove: (position: number) => void;
  selected: number | null;
  resetTigerMove: (position: number) => void;
  moveTiger: (
    initialPosition: number,
    newPosition: number,
    step: number
  ) => void;
  isMoveAllowedTiger: (
    initialPosition: number,
    newPosition: number,
    move: string,
    step: number
  ) => boolean;
}
type State = {
  scale: any;
  goatsAvailable: any;
  tigersAvailable: any;
  goatsKept: number;
  goatsKilled: number;
  boardState: Array<string | null>;
  selected: number | null;
  tigerTurn: boolean;
};


export default class Board extends React.Component<IAppProps> {
  constructor(props: any) {
    super(props);
  }

  renderBoard = () => {
    return Array(25)
      .fill([])
      .map((item, index) => {
        return (
          <BoardMaker
            key={index}
            n={index}
            spacing={this.props.spacing}
            vSpacing={this.props.vSpacing}
          />
        );
      });
  };

  renderHolders = () => {
    return Array(25)
      .fill([])
      .map((item, index) => {
        let moves = allowedMoves[index];
        return (
          <Holder
            key={index}
            n={index}
            possibleMoves={moves}
            handleClick={this.props.handleHolderClick}
            spacing={this.props.spacing}
            vSpacing={this.props.vSpacing}
          />
        );
      });
  };
  renderTigerGoats = () => {
    let {
      boardState,
      tigerTurn,
      selected,

      goatsAvailable,
      isMoveAllowedGoat,
      moveGoat,
      resetGoatMove,
      spacing,
      vSpacing,
      selectTigerToMove,
      resetTigerMove,
      moveTiger,
      isMoveAllowedTiger,
    } = this.props;
    return boardState.map((item: string | null, index: number) => {
      if (item === GOAT) {
        let moves = allowedMoves[index];
        let goatMovable = !tigerTurn && goatsAvailable <= 0;
        return (
          <Goat
            key={index}
            n={index}
            moves={moves}
            movable={goatMovable}
            isMoveAllowed={isMoveAllowedGoat}
            moveGoat={moveGoat}
            resetMove={resetGoatMove}
            spacing={spacing}
            vSpacing={vSpacing}
            tigerTurn={tigerTurn}
          />
        );
      }
      if (item === TIGER) {
        let tigerMovable = tigerTurn;
        return (
          <Tiger
            key={index}
            n={index}
            movable={tigerMovable}
            selectTigerToMove={selectTigerToMove}
            selected={selected === index}
            spacing={spacing}
            vSpacing={vSpacing}
            moveTiger={moveTiger}
            resetMove={resetTigerMove}
            isMoveAllowed={isMoveAllowedTiger}
          />
        );
      }
      return null;
    });
  };
  public render() {
    return (
      <React.Fragment>
        {this.renderBoard()}
        {this.renderHolders()}
        {this.renderTigerGoats()}
      </React.Fragment>
    );
  }
}
