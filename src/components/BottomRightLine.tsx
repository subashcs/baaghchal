import React from 'react'
import { View } from 'react-native'

interface Props {

    x1: number;
    x2: number;
    y1: number;
    y2: number;
    spacing: number;
    vSpacing: number
}

export const BottomRightLine = ({ x1, x2, y1, y2 }: Props) => {
    let calculateWidth = Math.floor(Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)));
    return (
        <View style={{
            position: "absolute", zIndex: -1, display: 'flex', justifyContent: 'center', alignItems: "center", left: x1, top: y1, transform: [{ rotateZ: '45deg' }], width: Math.abs(x2 - x1), height: Math.abs(y2 - y1), backgroundColor: "transparent"
        }}>
            <View style={{ zIndex: 5, backgroundColor: "red", width: calculateWidth, height: 5 }} >

            </View>
        </View >
    )
}
