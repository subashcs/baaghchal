import React, { Component } from "react";
import { PanResponder, Animated, View, Text, Alert, TouchableHighlight } from "react-native";
import { Circle } from "./Circle";


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
  let initialY = vSpacing / 2;
  let radius = 15;
  let colPosition = n % 5;
  let rowPosition = Math.floor(n / 5);
  let cx = colPosition * spacing + initialX;
  let cy = initialY + rowPosition * vSpacing;

  //   <Circle
  //   cx={colPosition * spacing + initialX}
  //   cy={initialY + rowPosition * vSpacing}
  //   r={radius}
  //   onPress={() => { Alert.alert(`clicked ${n}`); handleClick(n) }}
  // >
  //   <Text style={{ color: 'white' }}>{n}</Text>
  // </Circle>

  return (


    <TouchableHighlight
      onPress={() => handleClick(n)}
      style={{
        position: 'absolute',

        left: cx - radius,
        top: cy - radius * 1.8,

        width: 2 * radius,
        height: 2 * radius,

        backgroundColor: "black",
        borderRadius: 50
      }}
    >
      <View >
        <Text style={{ color: 'white' }}>{ }</Text>
      </View>




    </TouchableHighlight>


  );
};
export default Holder;
