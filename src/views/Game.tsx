import React from "react";
import { Animated, View, StyleSheet, Dimensions, Text, Button } from "react-native";
import { Svg, Rect } from "react-native-svg";
import allowedMoves, { TIGER, GOAT } from "../constants";

import Board from "../components/Board";
import { Store } from "../store";
import checkResults from "../utils/checkResults";
import { Card } from "react-native-elements";
import { getDirection } from "../utils";

type Props = {
  gameState?: State;
  opponent?: any;
  handleUpdate?: (gameState: State) => void | undefined;
};

type State = {
  role?: string;
  scale?: any;
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


  static getDerivedStateFromProps(nextProps: Props, state: State) {

    if (nextProps.gameState) {
      let {
        boardState,
        tigerTurn,
        goatsAvailable,
        tigersAvailable,
        goatsKilled,
        selected
      } = nextProps.gameState;
      if (
        Array.isArray(boardState) &&
        boardState.length > 2
      ) {
        //update state
        return ({ tigerTurn, boardState, goatsAvailable, tigersAvailable, goatsKilled, selected })
      }
    }

    // Return null to indicate no change to state.
    return null;
  }


  updateState = (newState: any) => {
    if (this.props.gameState && this.props.handleUpdate) {
      this.props.handleUpdate(newState);
    }
    this.setState(() => ({ ...newState }));
  };

  makeTigerMove = (initialPosition: number, newPosition: number, step: number) => {
    let newBoardState = this.state.boardState;
    let moveOffset = newPosition - initialPosition;
    let middlePos = initialPosition + moveOffset / 2;
    let goatsKilled = this.state.goatsKilled;


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
      selected: null
    };
    this.updateState(newState);
  };

  makeGoatMove = (initialPosition: number, newPosition: number) => {
    let newBoardState = this.state.boardState;
    newBoardState[initialPosition] = null;
    newBoardState[newPosition] = GOAT;

    let newState = {
      boardState: newBoardState,
      tigerTurn: true,
      selected: null
    };
    this.updateState(newState);
  };
  moveGoat = (initialPosition: number, nextPosition: number) => {
    const direction = getDirection(initialPosition, nextPosition);

    let moveAllowed = this.isMoveAllowedGoat(
      initialPosition,
      nextPosition,
      direction
    );
    if (moveAllowed) {
      this.makeGoatMove(initialPosition, nextPosition);
    } else {
      console.log("resetting move");
      this.resetGoatMove(initialPosition);
    }

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
    if (!this.isTiger()) return;

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
      }
    }
    return false;
  };

  isMoveAllowedGoat = (
    initialPosition: number,
    newPosition: number,
    move: string
  ) => {
    if (!this.isGoat()) return;

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

  moveTiger = (initialPosition: number, nextPosition: number) => {
    let diff = Math.abs(nextPosition - initialPosition);
    const direction = getDirection(initialPosition, nextPosition);

    let step = diff === 2 || diff >= 8 ? 2 : 1
    let moveAllowed = this.isMoveAllowedTiger(
      initialPosition,
      nextPosition,
      direction,
      step
    );
    if (moveAllowed) {
      this.makeTigerMove(initialPosition, nextPosition, step);
    } else {
      this.resetTigerMove(initialPosition);
    }

  };

  handleHolderClick = (position: number) => {
    if (this.state.tigerTurn) {
      // it must be checked for null this way otherwise chances are selected position 0 will malfunction
      if (this.state.selected !== null && this.isTiger()) {
        this.moveTiger(this.state.selected, position);
      }
    }
    else {
      if (this.state.selected !== null && this.isGoat()) {
        this.moveGoat(this.state.selected, position);
      }
      else {
        this.putGoat(position);
      }
    }
  };
  isTiger = () => {
    if (this.props.gameState?.role && this.props.gameState?.role === GOAT) {
      return false;
    }
    return true;
  }
  isGoat = () => {
    //for offline and online compatibility in selectTigerToMove logic
    //i.e if role is not specified the user is also considered goat 
    if (this.props.gameState?.role && this.props.gameState?.role === TIGER) {
      return false;
    }
    return true;
  }
  putGoat = (position: number) => {
    if (!this.isGoat()) return;

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
    if (!this.state.tigerTurn) return;
    if (!this.isTiger()) return;
    let newState = {
      selected: this.state.selected !== position ? position : null,
    };
    this.updateState(newState);

  };

  selectGoatToMove = (position: number) => {
    if (this.state.tigerTurn || this.state.goatsAvailable > 0) return;
    if (!this.isGoat()) return;
    let newState = {
      selected: this.state.selected !== position ? position : null,
    };
    this.updateState(newState);
  }

  render() {

    let { boardState, tigerTurn, goatsAvailable, selected } = this.state;
    const { winner } = checkResults({ boardState, goatsAvailable });
    if (winner) {
      return (
        <View style={styles.game}>
          <Card>

            <Text>{winner === this.props?.gameState?.role ? "You" : (this.props.opponent ? this.props.opponent.displayName : winner)} won the game</Text>

            <Button title="Restart" onPress={() => { }} />
          </Card>

        </View>
      )
    }
    return (
      <View style={styles.game}>
        <View style={{ height: verticalHolderSpacing * 5, width: windowWidth, backgroundColor: "#eeeeee" }} >
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
            selectGoatToMove={this.selectGoatToMove}
            isMoveAllowedGoat={this.isMoveAllowedGoat}
            isMoveAllowedTiger={this.isMoveAllowedTiger}
            moveGoat={this.moveGoat}
            moveTiger={this.moveTiger}
            resetGoatMove={this.resetGoatMove}
            resetTigerMove={this.resetTigerMove}
          />
        </View>
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
          {this.props.opponent && <Text style={styles.textStyle}>
            You're : {this.props.gameState?.role}
             Opponent : {this.props.opponent.displayName}

          </Text>}

        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  game: {
    backgroundColor: "rgba(255,255,255,0.01)",
    display: "flex",
    justifyContent: "center",
    height: "100%"

  },
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
