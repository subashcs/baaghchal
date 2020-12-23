import React from "react";
import { Animated, View, StyleSheet, Dimensions, Text } from "react-native";
import { Svg, Rect } from "react-native-svg";
import allowedMoves, { TIGER, GOAT } from "../constants";

import Board from "../components/Board";
import { Store } from "../store";

type Props = {
  gameState: State | undefined;
  opponent:any;
  handleUpdate: (gameState: State) => void | undefined;
};

type State = {
  scale: any;
  goatsAvailable: number;
  tigersAvailable: number;
  goatsKept: number;
  goatsKilled: number;
  boardState: Array<string | null>;
  selected: number | null;
  tigerTurn: boolean;
  
};
let windowWidth = Math.round(Dimensions.get("window").width);
let windowHeight = Math.round(Dimensions.get("window").height);
const horizontalHolderSpacing =
  windowHeight < windowWidth ? windowHeight / 5.5 : windowWidth / 5;
const verticalHolderSpacing =
  windowHeight > windowWidth ? horizontalHolderSpacing : windowHeight / 5.8;
export default class extends React.Component<Props, State> {
  static contextType = Store;

  constructor(props: Props) {
    super(props);
    const TOTAL_GOATS = 21;
    const TOTAL_TIGERS = 4;

    let initialBoardState = Array(25).fill(null);
    initialBoardState[0] = TIGER;
    initialBoardState[4] = TIGER;
    initialBoardState[20] = TIGER;
    initialBoardState[24] = TIGER;
    this.state = {
      scale: new Animated.Value(0),
      goatsAvailable: TOTAL_GOATS,
      tigersAvailable: TOTAL_TIGERS,
      goatsKilled: 0,
      boardState: initialBoardState,
      goatsKept: 0,
      selected: null,
      tigerTurn: false,
    };
    this.putGoat.bind(this);
    this.handleHolderClick.bind(this);
    this.selectTigerToMove.bind(this);
    this.moveGoat.bind(this);
    this.isMoveAllowedGoat.bind(this);
    this.updateState.bind(this);
    // this.animate = this.animate.bind(this);
  }
  componentDidMount() {
      const { state } = this.context;

      let TOTAL_GOATS = state.goats;

      let newState = { goatsAvailable: TOTAL_GOATS };
      this.updateState(newState);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.gameState) {
      let {
        boardState,
        tigerTurn,
        goatsAvailable,
        tigersAvailable,
        goatsKilled,
      } = nextProps.gameState;
      if (
        Array.isArray(boardState) &&
        boardState.length > 2 
      ) {
        //update state
        this.setState({tigerTurn,boardState,goatsAvailable,tigersAvailable,goatsKilled})
      }
    }
  }

  
  updateState = (newState: any) => {
    if(this.props.gameState){
      this.props.handleUpdate(newState);
    }
    this.setState(() => ({ ...newState }));
  };

  moveTiger = (initialPosition: number, newPosition: number, step: number) => {
    let newBoardState = this.state.boardState;
    let moveOffset = newPosition - initialPosition;
    let middlePos = initialPosition + moveOffset / 2;
    let goatsKilled = this.state.goatsKilled;

    console.log("moving tiger", middlePos, moveOffset, step);

    if (step === 1) {
      newBoardState[initialPosition] = null;
      newBoardState[newPosition] = TIGER;
    }
    if (step === 2 && newBoardState[middlePos] === GOAT) {
      newBoardState[initialPosition] = null;

      newBoardState[middlePos] = null;
      goatsKilled = goatsKilled + 1;

      newBoardState[newPosition] = TIGER;
    }
    let newState = {
      boardState: newBoardState,
      tigerTurn: false,
      goatsKilled: goatsKilled,
    };
    this.updateState(newState);
  };

  moveGoat = (initialPosition: number, newPosition: number) => {
    let newBoardState = this.state.boardState;
    newBoardState[initialPosition] = null;
    newBoardState[newPosition] = GOAT;

    let newState = {
      boardState: newBoardState,
      tigerTurn: true,
    };
    this.updateState(newState);
  };

  resetGoatMove = (position: number) => {
    let newBoardState = this.state.boardState;
    newBoardState[position] = GOAT;
    let newState = {
      boardState: newBoardState,
    };
    this.updateState(newState);
  };
  resetTigerMove = (position: number) => {
    let newBoardState = this.state.boardState;
    newBoardState[position] = TIGER;
    let newState = {
      boardState: newBoardState,
    };
    this.updateState(newState);
  };

  isMoveAllowedTiger = (
    initialPosition: number,
    newPosition: number,
    move: string,
    step: number
  ) => {
    console.log(
      "checking move validity ",
      move,
      allowedMoves[initialPosition],
      " board state:",
      this.state.boardState[newPosition]
    );
    if (newPosition > 24 && newPosition < 0) {
      return false;
    }
    if (step === 1) {
      if (
        move &&
        allowedMoves[initialPosition].includes(move) &&
        !this.state.boardState[newPosition]
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
      !this.state.boardState[newPosition]
    ) {
      if (
        allowedMoves[middlePos].includes(move) &&
        this.state.boardState[middlePos] === GOAT
      ) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  isMoveAllowedGoat = (
    initialPosition: number,
    newPosition: number,
    move: string | undefined
  ) => {
    console.log(
      "checking move validity ",
      move,
      allowedMoves[initialPosition],
      " board state:",
      this.state.boardState[newPosition]
    );
    if (newPosition > 24) {
      return false;
    }
    if (
      move &&
      allowedMoves[initialPosition].includes(move) &&
      !this.state.boardState[newPosition]
    ) {
      return true;
    }
    return false;
  };

  handleHolderClick = (position: number) => {
    if (this.state.tigerTurn) return;
    this.putGoat(position);
  };

  putGoat = (position: number) => {
    console.log("got this number on click", position);
    let boardState = this.state.boardState;
    if (!boardState[position] && this.state.goatsAvailable > 0) {
      boardState[position] = GOAT;
      let newState = {
        boardState,
        goatsAvailable: this.state.goatsAvailable - 1,
        tigerTurn: true,
      };
      this.updateState(newState);
    }
  };

  selectTigerToMove = (position: number) => {
    let newState = {
      selected: position,
    };
    this.updateState(newState);
  };

  render() {

    let { boardState, tigerTurn, goatsAvailable, selected } = this.state;
    return (
      <>
        <Svg height={verticalHolderSpacing * 5} width={windowWidth}>
          <Rect
            fill="#bbbbbb"
            y="0"
            x="0"
            height={verticalHolderSpacing * 6}
            width={horizontalHolderSpacing * 5.6}
          />
          <Board
            handleHolderClick={this.handleHolderClick}
            spacing={horizontalHolderSpacing}
            vSpacing={verticalHolderSpacing}
            boardState={boardState}
            tigerTurn={tigerTurn}
            goatsAvailable={goatsAvailable}
            selected={selected}
            selectTigerToMove={this.selectTigerToMove}
            isMoveAllowedGoat={this.isMoveAllowedGoat}
            isMoveAllowedTiger={this.isMoveAllowedTiger}
            moveGoat={this.moveGoat}
            moveTiger={this.moveTiger}
            resetGoatMove={this.resetGoatMove}
            resetTigerMove={this.resetTigerMove}
          />
        </Svg>
        <View style={styles.bottomTab}>
          <Text style={styles.textStyle}>
            {this.state.tigerTurn ? "Tiger's Turn" : "Goats Turn"}
          </Text>
          <Text style={styles.textStyle}>
            Goats In Hand
            <Text style={styles.numberStyle}>{this.state.goatsAvailable}</Text>
          </Text>
          <Text style={styles.textStyle}>
            Goats killed
            <Text style={styles.numberStyle}>{this.state.goatsKilled}</Text>
          </Text>
          <Text style={styles.textStyle}>
                  Opponent: {this.props.opponent ?this.props.opponent.displayName:""}
          </Text>
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  textStyle: {
    color: "#f57c00",
    fontWeight: "bold",
    textShadowColor: "#000",
    textShadowRadius: 3,
    margin: 5,
    padding: 5,
    display: "flex",
    alignItems: "center",
  },
  numberStyle: {
    paddingHorizontal: 3,
    margin: 3,
    borderWidth: 1,
    borderColor: "#543",
    borderRadius: 4,
  },

  bottomTab: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    left: 0,
    bottom: 2,
    position: "absolute",
    width: "100%",
    backgroundColor: "#1976d3",
  },
});
