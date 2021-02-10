import React from 'react'
import { View, TouchableHighlight } from 'react-native'

interface Props {
    cx: number;
    cy: number;
    r: number;
    onPress: () => void
}

export const Circle: React.FC<Props> = ({
    cx, cy, r, ...props
}) => {
    return (
        <TouchableHighlight
            onPress={() => props.onPress()}
            style={{
                position: 'absolute',

                left: cx - r,
                top: cy + r,
                width: 2 * r,
                height: 2 * r,
                backgroundColor: "black",
                borderRadius: 50
            }}
        >
            <View >
                {props.children}
            </View>




        </TouchableHighlight>

    )
}
