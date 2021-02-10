export const mv = {
  topRight: "tr",
  topLeft: "tl",
  bottomLeft: "bl",
  bottomRight: "br",
  top: "t",
  bottom: "b",
  left: "l",
  right: "r",
};

export const TIGER = "tiger";
export const GOAT = "goat";
export const allowedMoves: Array<Array<string>> = [
  [mv.right, mv.bottomRight, mv.bottom],
  [mv.right, mv.bottom, mv.left],
  [mv.right, mv.bottomRight, mv.bottom, mv.bottomLeft, mv.left],
  [mv.right, mv.bottom, mv.left],
  [mv.bottom, mv.bottomLeft, mv.left],
  [mv.top, mv.right, mv.bottom],
  [
    mv.top,
    mv.topRight,
    mv.right,
    mv.bottomRight,
    mv.bottom,
    mv.bottomLeft,
    mv.left,
    mv.topLeft,
  ],
  [mv.top, mv.right, mv.bottom, mv.left],
  [
    mv.top,
    mv.topRight,
    mv.right,
    mv.bottomRight,
    mv.bottom,
    mv.bottomLeft,
    mv.left,
    mv.topLeft,
  ],
  [mv.top, mv.bottom, mv.left],
  [mv.top, mv.topRight, mv.right, mv.bottomRight, mv.bottom],
  [mv.top, mv.right, mv.bottom, mv.left],
  [
    mv.top,
    mv.topRight,
    mv.right,
    mv.bottomRight,
    mv.bottom,
    mv.bottomLeft,
    mv.left,
    mv.topLeft,
  ],
  [mv.top, mv.right, mv.left, mv.bottom],
  [mv.top, mv.bottom, mv.bottomLeft, mv.left, mv.topLeft],
  [mv.top, mv.right, mv.bottom],
  [
    mv.top,
    mv.topRight,
    mv.right,
    mv.bottomRight,
    mv.bottom,
    mv.bottomLeft,
    mv.left,
    mv.topLeft,
  ],
  [mv.top, mv.right, mv.bottom, mv.left],
  [
    mv.top,
    mv.topRight,
    mv.right,
    mv.bottomRight,
    mv.bottom,
    mv.bottomLeft,
    mv.left,
    mv.topLeft,
  ],
  [mv.top, mv.bottom, mv.left],
  [mv.top, mv.topRight, mv.right],
  [mv.top, mv.right, mv.left],
  [mv.top, mv.topRight, mv.right, mv.left, mv.topLeft],
  [mv.top, mv.right, mv.left],
  [mv.top, mv.left, mv.topLeft],
];

export default allowedMoves;
