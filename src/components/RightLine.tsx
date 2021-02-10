import React from 'react'
import { View } from 'react-native'

interface Props {

    x1: number;
    x2: number;
    y1: number;
    y2: number;
}

export const RightLine = ({ x1, y1, x2, y2 }: Props) => {
    return (
        <View style={{ position: "absolute", left: x1, top: y1, height: y2 - y1, width: x2 - x1, borderTopWidth: 5, borderTopColor: "red" }}>

        </View>
    )
}
