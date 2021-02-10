import React from 'react'
import { View } from 'react-native'

interface Props {

    x1: number;
    x2: number;
    y1: number;
    y2: number;
}

export const BottomLine = ({ x1, x2, y1, y2 }: Props) => {
    return (
        <View style={{ position: "absolute", left: x1, top: y1, height: y2 - y1, width: x2 - x1, display: 'flex', flexDirection: 'row', borderLeftWidth: 5, borderLeftColor: "red" }}>

        </View>
    )
}
