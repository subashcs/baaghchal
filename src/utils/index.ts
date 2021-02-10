import { mv } from "../constants";

export function getTanFromDegrees(degrees: number) {
  return Math.tan((degrees * Math.PI) / 180);
}

/**
 *
 * @param initialPosition number
 * @param nextPosition number
 * @return direction string
 *
 */
export function getDirection(initialPosition: number, nextPosition: number) {
  let positionDiff = nextPosition - initialPosition;
  let direction;
  if (positionDiff < 0) {
    if (positionDiff === -1 || positionDiff === -2) {
      direction = mv.left;
    } else if (positionDiff === -5 || positionDiff === -10) {
      direction = mv.top;
    } else if (positionDiff === -6 || positionDiff === -12) {
      direction = mv.topLeft;
    } else if (positionDiff === -4 || positionDiff === -8) {
      direction = mv.topRight;
    } else {
      direction = "";
    }
  } else {
    if (positionDiff === 1 || positionDiff === 2) {
      direction = mv.right;
    } else if (positionDiff === 5 || positionDiff === 10) {
      direction = mv.bottom;
    } else if (positionDiff === 6 || positionDiff === 12) {
      direction = mv.bottomRight;
    } else if (positionDiff === 4 || positionDiff === 8) {
      direction = mv.bottomLeft;
    } else {
      direction = "";
    }
  }

  return direction;
}

export function getMoveAngle(x: number, y: number) {
  let slope = y / x;
  let angle = (Math.atan(slope) * 180) / Math.PI;
  //Transforming angle
  if (y < 0 && x >= 0) {
    //first quadrant
    angle = Math.abs(angle);
  }
  if (y <= 0 && x < 0) {
    //second quadrant
    angle = 180 - Math.abs(angle);
  }
  if (y > 0 && x <= 0) {
    //third quadrant
    angle = 180 + Math.abs(angle);
  }
  if (y >= 0 && x > 0) {
    //fourth quadrant
    angle = 360 - Math.abs(angle);
  }
  return angle;
}
export default function populateCoordinates(
  angle: number,
  x: number,
  y: number
) {
  let direction = "";
  if ((angle < 20 && angle >= 0) || (angle <= 360 && angle > 335)) {
    //right
    console.log("right");
    direction = mv.right;
    x = x;
    y = 0;
  }
  if (angle > 20 && angle < 65) {
    //top right
    console.log("top right");
    direction = mv.topRight;
    let newcoord = (Math.abs(x) + Math.abs(y)) / 2;
    x = newcoord;
    y = -newcoord;
  }
  if (angle > 65 && angle < 110) {
    //top
    console.log("top");
    direction = mv.top;
    x = 0;
    y = y;
  }
  if (angle > 110 && angle < 155) {
    //top left
    console.log("top left");
    let newcoord = (Math.abs(x) + Math.abs(y)) / 2;
    direction = mv.topLeft;
    x = -newcoord;
    y = -newcoord;
  }
  if (angle > 155 && angle < 200) {
    //left
    console.log("left");
    direction = mv.left;
    x = x;
    y = 0;
  }
  if (angle > 200 && angle < 250) {
    //bottom left
    console.log("bottom left");
    let newcoord = (Math.abs(x) + Math.abs(y)) / 2;
    direction = mv.bottomLeft;
    x = -newcoord;
    y = newcoord;
  }
  if (angle > 250 && angle < 290) {
    //bottom
    console.log("bottom ");
    direction = mv.bottom;
    x = 0;
    y = y;
  }
  if (angle > 290 && angle < 335) {
    //bottom right
    console.log("bottom right");
    let newcoord = (Math.abs(x) + Math.abs(y)) / 2;
    direction = mv.bottomRight;
    x = newcoord;
    y = newcoord;
  }
  return { x, y, direction };
}
