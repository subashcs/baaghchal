import React, { Component } from "react";
import { PanResponder, Animated, View, StyleSheet } from "react-native";

import Svg, {
  Circle,
  Ellipse,
  G,
  Text,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from "react-native-svg";

export interface NodeProps {
  possibleMoves: Array<string>;
  n: number;
  handleClick: (position: number) => void;
  spacing: number;
  vSpacing: number;
}
const boardColor = "#fffaff";
const Holder: React.FC<NodeProps> = (props: NodeProps) => {
  let { possibleMoves, n, spacing, vSpacing, handleClick } = props;
  let initialX = spacing / 2;
  let initialY = vSpacing / 2.5;
  let radius = 15;
  let colPosition = n % 5;
  let rowPosition = Math.floor(n / 5);

  // console.log("got", colPosition, rowPosition);

  return (
    <>
      <Circle
        cx={colPosition * spacing + initialX}
        cy={initialY + rowPosition * vSpacing}
        r={radius}
        fill={boardColor}
        onPress={() => handleClick(n)}
      />
    </>
  );
};
export default Holder;
