import React from "react";
import { View } from "react-native";
import allowedMoves, { mv } from "../constants";
import { BottomLine } from "./BottomLine";
import { BottomRightLine } from "./BottomRightLine";
import { RightLine } from "./RightLine";
import { TopRightLine } from "./TopRightLine";
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
    <View>
      {allowedMoves[n].includes(mv.bottom) && (

        <BottomLine
          x1={colPosition * spacing + initialX}
          y2={initialY + vSpacing * (1 + rowPosition)}
          x2={colPosition * spacing + initialX}
          y1={initialY + rowPosition * vSpacing} />

      )}
      {topRightChecker && (

        <TopRightLine

          x1={colPosition * spacing + initialX}
          y1={initialY + rowPosition * vSpacing}
          x2={(colPosition + 1) * spacing + initialX}
          y2={(rowPosition - 1) * vSpacing + initialY}

        />

      )}
      {bottomRightChecker && (

        <BottomRightLine
          spacing={spacing}
          vSpacing={vSpacing}
          x1={colPosition * spacing + initialX}
          y1={initialY + rowPosition * vSpacing}
          x2={(colPosition + 1) * spacing + initialX}
          y2={(rowPosition + 1) * vSpacing + initialY}
        />

      )}

      {allowedMoves[n].includes(mv.right) && (

        <RightLine
          // left={colPosition * spacing + initialX}
          // top={initialY + vSpacing * rowPosition}

          x1={colPosition * spacing + initialX}
          y1={initialY + vSpacing * rowPosition}
          x2={(colPosition + 1) * spacing + initialX}
          y2={initialY + rowPosition * vSpacing}


        />

      )}
    </View>
  );
};
export default BoardMaker;
