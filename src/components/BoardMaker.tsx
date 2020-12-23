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
import allowedMoves, { mv } from "../constants";
export interface NodeProps {
  n: number;
  spacing: number;
  vSpacing: number;
}

const BoardMaker: React.FC<NodeProps> = (props: NodeProps) => {
  let { n, spacing, vSpacing } = props;

  // console.log("got", colPosition, rowPosition);
  let initialX = spacing / 2;
  let initialY = vSpacing / 2.5;
  let colPosition = n % 5;
  let rowPosition = Math.floor(n / 5);

  let topRightChecker = allowedMoves[n].includes(mv.topRight);
  let bottomRightChecker = allowedMoves[n].includes(mv.bottomRight);

  return (
    <G>
      {allowedMoves[n].includes(mv.bottom) && (
        <Line
          style={{
            fill: "none",
            zIndex: 1,
            position: "absolute",

            stroke: "#000",
            strokeWidth: "3.56500006",
            strokeLinecap: "butt",
            strokeLinejoin: "bevel",
          }}
          x1={colPosition * spacing + initialX}
          y2={initialY + vSpacing * (1 + rowPosition)}
          x2={colPosition * spacing + initialX}
          y1={initialY + rowPosition * vSpacing}
          stroke="#aff"
          strokeWidth="2"
        />
      )}
      {topRightChecker && (
        <Line
          style={{
            fill: "none",
            zIndex: 1,
            position: "absolute",

            stroke: "#000",
            strokeWidth: "3.56500006",
            strokeLinecap: "butt",
            strokeLinejoin: "bevel",
          }}
          x1={colPosition * spacing + initialX}
          y1={initialY + rowPosition * vSpacing}
          x2={(colPosition + 1) * spacing + initialX}
          y2={(rowPosition - 1) * vSpacing + initialY}
          stroke="#aff"
          strokeWidth="2"
        />
      )}
      {bottomRightChecker && (
        <Line
          style={{
            fill: "none",
            zIndex: 1,
            position: "absolute",

            stroke: "#000",
            strokeWidth: "3.56500006",
            strokeLinecap: "butt",
            strokeLinejoin: "bevel",
          }}
          x1={colPosition * spacing + initialX}
          y1={initialY + rowPosition * vSpacing}
          x2={(colPosition + 1) * spacing + initialX}
          y2={(rowPosition + 1) * vSpacing + initialY}
          stroke="#aff"
          strokeWidth="2"
        />
      )}

      {allowedMoves[n].includes(mv.right) && (
        <Line
          style={{
            fill: "none",
            zIndex: 1,
            position: "absolute",
            stroke: "#000",
            strokeWidth: "3.56500006",
            strokeLinecap: "butt",
            strokeLinejoin: "bevel",
          }}
          x1={colPosition * spacing + initialX}
          y1={initialY + vSpacing * rowPosition}
          x2={(colPosition + 1) * spacing + initialX}
          y2={initialY + rowPosition * vSpacing}
          stroke="#aff"
          strokeWidth="2"
        />
      )}
    </G>
  );
};
export default BoardMaker;
