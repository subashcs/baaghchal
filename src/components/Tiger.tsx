import React from "react";
import { Alert, View, TouchableOpacity } from "react-native";
import * as goatSvg from '../assets/goat.svg';

import Svg, {

    G,
    Path,
    Rect,
    Use,
    Symbol,
    Defs,
    LinearGradient,
    Stop,
} from "react-native-svg";

// import { Audio } from "expo-av";
// import tigerAudio from "../assets/tiger.mp3";


export interface NodeProps {
    n: number;
    spacing: number;
    vSpacing: number;
    selectTigerToMove: (position: number) => void | undefined;
    selected: boolean;
    movable: boolean;
    moveTiger: (
        initialPosition: number,
        newPosition: number,
        step: number
    ) => void;
    isMoveAllowed: (
        initialPosition: number,
        newPosition: number,
        move: string,
        step: number
    ) => boolean;
    resetMove: (initialPosition: number) => void;
}

const Tiger: React.FC<NodeProps> = (props: NodeProps) => {
    let { n, spacing, vSpacing, movable, selected } = props;
    let initialX = spacing / 2;
    let initialY = vSpacing / 2.5;
    let colPosition = n % 5;
    let rowPosition = Math.floor(n / 5);
    let cx = colPosition * spacing + initialX;
    let cy = initialY + rowPosition * vSpacing;



    return (

        <TouchableOpacity
            style={{
                position: 'absolute',
                zIndex: 10,
                left: cx - Math.floor(spacing / 4),
                top: cy - Math.floor(spacing / 3),
                width: Math.floor(spacing / 2),
                height: Math.floor(spacing / 2),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2,
                borderWidth: selected ? 2 : 0,
                borderColor: 'grey',
                borderRadius: 5,
                opacity: movable ? 1 : 0.9

            }}
            onPress={() => {
                props.selectTigerToMove(n)
            }}
        >

            <Svg viewBox="0 0 60 60">
                <G fill="none">
                    <Path
                        d="M41.94 49.77A6.7 6.7 0 0039 40h-.09a1.56 1.56 0 00.09-.7v-.81a1.34 1.34 0 00-.89-1.35A34.17 34.17 0 0030 36a64.2 64.2 0 00-8.06 1.2 1.32 1.32 0 00-.94 1.37v.73a1.56 1.56 0 00.14.66h-.09A6.64 6.64 0 0017 46.15a6.72 6.72 0 001.05 3.61C15.39 47.05 6.16 38.79 7.54 28a24.4 24.4 0 013.78-8.86A23.32 23.32 0 0120.83 11a22 22 0 0118.34 0 23.42 23.42 0 019.51 8.1 24.4 24.4 0 012.64 5 .14.14 0 000 .06c4.68 12.75-6.42 22.6-9.38 25.61z"
                        fill="#ff9801"
                        onPress={() => {
                            props.selectTigerToMove(n)
                        }}
                    />
                    <Path
                        d="M51.34 24.2a.14.14 0 010-.06 24.4 24.4 0 00-2.64-5A23.42 23.42 0 0039.17 11 21.9 21.9 0 0030 9c-.5 0-1 .02-1.5.06A21.79 21.79 0 0136.17 11a23.42 23.42 0 019.51 8.1 24.4 24.4 0 012.64 5 .14.14 0 000 .06C51.66 33.25 47 40.84 43 45.56v.59a6.65 6.65 0 01-1.06 3.62C44.9 46.76 56 36.91 51.34 24.2z"
                        fill="#f57c00"
                    />
                    <Path d="M19.27 55.85h-.08z" fill="#ff9801" />
                    <Path
                        d="M39 38.49c0 1 0 1.13-.14 1.47-.21.54.13.2-8.36 5.43a1 1 0 01-1 0C21 40.15 21.36 40.5 21.14 40a3 3 0 01-.14-1.43 1.32 1.32 0 01.94-1.37A64.2 64.2 0 0130 36a34.17 34.17 0 018.11 1.14c.565.2.929.752.89 1.35z"
                        fill="#37474f"
                    />
                    <Path
                        d="M41.94 49.77a6 6 0 00-.94 1.16 6.49 6.49 0 01-11-4.78c0-.65-.06-.37 0-.62a.94.94 0 00.51-.14C39 40.15 38.64 40.5 38.86 40a6.68 6.68 0 013.08 9.77z"
                        fill="#f57c00"
                    />
                    <Path
                        d="M40.69 55.88a19.93 19.93 0 01-21.38 0 5.77 5.77 0 00-.33-5 6.4 6.4 0 004.51 1.86A6.58 6.58 0 0030 46.15a6.58 6.58 0 006.5 6.64 6.4 6.4 0 004.5-1.86 5.7 5.7 0 00-.31 4.95z"
                        fill="#ff9801"
                    />
                    <Path
                        d="M41 50.93a6.46 6.46 0 01-3.67 1.8 6 6 0 00.35 3.15 20.42 20.42 0 01-9.19 3c.5.04 1 .06 1.5.06a20.26 20.26 0 0010.69-3.11 5.7 5.7 0 01.32-4.9zM30 46.15a6.49 6.49 0 01-11 4.78 5.55 5.55 0 00-.94-1.17A6.69 6.69 0 0121.14 40a1.2 1.2 0 00.48.58c8.55 5.26 8 5 8.37 5-.05.18.01.01.01.57z"
                        fill="#f57c00"
                    />
                    <Path
                        d="M22.81 27.14A4 4 0 0119 30a4.07 4.07 0 01-4-4.14 2.47 2.47 0 01.05-.61zM45 25.86A4.07 4.07 0 0141 30a4 4 0 01-3.82-2.86L45 25.25c.02.203.02.407 0 .61z"
                        fill="#00bcd4"
                    />
                    <Path
                        d="M55.08 18.74c-.19.31-.4.63-.61 1s-.43.65-.66 1l-2.35 3.41-.13.05a24.4 24.4 0 00-2.64-5 17.52 17.52 0 001.23-1.27C55 12 54.24 7.69 53.09 4.86c-.67-1.65-2.57-1.71-4.07-.75l-8.71 6.09 12.16-8.6a3.88 3.88 0 015.65 1.79c1.43 3.47 1.56 7.97-3.04 15.35z"
                        fill="#37474f"
                    />
                    <Path
                        d="M49.91 17.83a17.52 17.52 0 01-1.23 1.27 23.42 23.42 0 00-9.51-8.1l.82-.57h.07l.25-.18L49 4.11c1.5-1 3.4-.9 4.07.75C54.24 7.69 55 12 49.91 17.83z"
                        fill="#f57c00"
                    />
                    <Path d="M48.68 19.1l-.01.01" fill="#ff9801" />
                    <Path
                        d="M11.32 19.1a24.4 24.4 0 00-2.64 5l-.13-.05-2.35-3.37c-.23-.34-.45-.66-.66-1s-.42-.65-.61-1C.32 11.36.45 6.86 1.88 3.39A3.88 3.88 0 017.53 1.6l13 9.18L11 4.11c-1.5-1-3.4-.9-4.07.75C5.76 7.69 5 12 10.09 17.83c.388.444.799.868 1.23 1.27z"
                        fill="#37474f"
                    />
                    <Path
                        d="M58.44 40.73a1 1 0 01-1.7.55.84.84 0 00-1.46.58A21.2 21.2 0 0150 55.68a1 1 0 01-1.32.11L46 53.8a1 1 0 00-1-.12 42.68 42.68 0 00-4.29 2.18 5.7 5.7 0 01.32-5 6.48 6.48 0 00.93-1.16c3-3 14.07-12.86 9.4-25.57a.14.14 0 010-.06c.18-.07-.1.3 2.48-3.46.31-.46.48-.7 1.28-1.94 3.29 5.33 4.78 13.55 3.32 22.06z"
                        fill="#f5f5f5"
                    />
                    <Path
                        d="M55.08 18.74c-.8 1.24-1 1.48-1.28 1.94l-.38.56c2.36 5.18 3.27 12.23 2 19.49a1 1 0 01-1.7.55.84.84 0 00-1.46.58A21.33 21.33 0 0147.59 55l1.09.81a1 1 0 001.32-.13 21.2 21.2 0 005.28-13.82.84.84 0 011.46-.58 1 1 0 001.7-.55c1.46-8.51-.03-16.73-3.36-21.99z"
                        fill="#cfd8dc"
                    />
                    <Path d="M41 55.7h-.08" fill="#ff9801" />
                    <Path
                        d="M19.32 55.88c-.25-.25-3.44-1.79-4.33-2.2a1 1 0 00-1 .12l-2.66 2a1 1 0 01-1.33-.12 21.2 21.2 0 01-5.28-13.82.84.84 0 00-1.46-.58 1 1 0 01-1.7-.55c-1.46-8.51 0-16.73 3.36-22 .19.3.44.7 1.28 1.94 2.57 3.74 2.3 3.39 2.48 3.46A24.89 24.89 0 007.54 28c-1.38 10.79 7.85 19 10.51 21.76.268.427.587.82.95 1.17a5.77 5.77 0 01.32 4.95z"
                        fill="#f5f5f5"
                    />
                    <Path
                        d="M19 50.93a6.27 6.27 0 01-.94-1.17C15.39 47.05 6.16 38.79 7.54 28a24.89 24.89 0 011.14-3.86c-.18-.07.09.28-2.48-3.46-.84-1.24-1.09-1.68-1.28-1.94a21.1 21.1 0 00-1.34 2.5c2.16 3.14 1.93 2.83 2.1 2.9A24.89 24.89 0 004.54 28c-1.38 10.79 7.85 19 10.51 21.76.268.427.587.82.95 1.17a5.3 5.3 0 01.68 3.56 25.51 25.51 0 012.64 1.39 5.77 5.77 0 00-.32-4.95z"
                        fill="#cfd8dc"
                    />
                    <Path d="M19.19 55.81h.08" fill="#ff9801" />
                    <Path
                        d="M20.83 11a23.32 23.32 0 00-9.51 8.09 17.52 17.52 0 01-1.23-1.27C5 12 5.76 7.69 6.91 4.86c.67-1.65 2.57-1.71 4.09-.75l9.54 6.67z"
                        fill="#f57c00"
                    />
                    <Path d="M11.33 19.11l-.01-.01" fill="#ff9801" />
                    <Path
                        d="M59.05 3A4.88 4.88 0 0051.9.78L39.06 9.86A22.64 22.64 0 0021 9.9L8.06.75A4.88 4.88 0 001 3c-1.91 4.54-1 9.47 2.76 15.75C.36 24.48-.83 32.7.58 40.9a2 2 0 003.15 1.3 22 22 0 005.52 14.14 2 2 0 001.47.66c.87 0 1-.3 3.85-2.41 2.5 1.14 4 2 4.29 2.18a20.84 20.84 0 0022.26 0c.38-.18 1.67-1 4.3-2.18 2.91 2.18 3 2.4 3.86 2.4a1.94 1.94 0 001.47-.66 22 22 0 005.52-14.13 2 2 0 003.15-1.3c1.41-8.2.22-16.42-3.18-22.15C60.05 12.47 60.91 7.54 59.05 3zm-1.85.76c2.62 6.36-1.82 12.85-5.64 18.39A26.41 26.41 0 0050 19.24C54.09 15 56.24 10 54 4.49a3.17 3.17 0 00-1.55-1.67l.55-.38a2.88 2.88 0 014.2 1.33zM18.88 49.19a5.68 5.68 0 012-8c.37.3 8 5 8.12 5a5.48 5.48 0 01-9.22 4 6.77 6.77 0 00-.9-1zM30 37a32.68 32.68 0 017.86 1.11c.1.1.152.239.14.38 0 .57.06 1.07-.15 1.2L30 44.54l-7.87-4.85c-.2-.12-.15-.58-.15-1.12a.49.49 0 01.14-.39A57.51 57.51 0 0130 37zm9.13 4.21a5.68 5.68 0 012 8 6.77 6.77 0 00-.89 1.09 5.48 5.48 0 01-9.22-4c.09-.11 7.72-4.77 8.11-5.09zm.86-1.8v-.92a2.33 2.33 0 00-1.63-2.32l-1.13-.27-2-7.25 1.38-.34A4.94 4.94 0 0041 31a5.07 5.07 0 005-5 1.17 1.17 0 00.93-.61 1 1 0 000-.87l-1-2a1 1 0 00-1.78.9l.43.87-9.81 2.39a2 2 0 00-1.42 2.5l1.74 6.25a24.31 24.31 0 00-10.09.19l1.7-6.42a2 2 0 00-1.44-2.5l-9.8-2.38.43-.87a1 1 0 10-1.78-.9l-1 2a1 1 0 00.65 1.45H14a5.06 5.06 0 005 5 4.94 4.94 0 004.38-2.66l1.39.34-2 7.34-1 .2A2.32 2.32 0 0020 38.57v.84a7.6 7.6 0 00-4 6.85 34.53 34.53 0 01-5-6.73 13.59 13.59 0 004 .47 1 1 0 000-2 10.05 10.05 0 01-5.22-1.13 18.28 18.28 0 01-1.21-4.65A12.47 12.47 0 0016.88 36a1 1 0 000-2 10.36 10.36 0 01-8.4-5.21 4.9 4.9 0 01.29-1.58A4.73 4.73 0 0012 29a1 1 0 000-2c-.74 0-1.82-1.15-2.49-2.11A22.27 22.27 0 0129 10.05V15l-4.62-1.92a1 1 0 10-.76 1.84L29 17.17v3.37L18.14 19a1.01 1.01 0 00-.28 2L29 22.56v1a1 1 0 002 0v-1L42.14 21a1.01 1.01 0 00-.28-2L31 20.58v-3.35l5.39-2.31a1 1 0 10-.78-1.84l-4.61 2V10a22 22 0 0119.51 14.87C49.84 25.84 48.75 27 48 27a1 1 0 000 2 4.62 4.62 0 003.15-1.74c.105.516.181 1.036.23 1.56A10.38 10.38 0 0143 34a1 1 0 000 2 12.52 12.52 0 008.35-3.77 18.93 18.93 0 01-1.18 4.67A10.15 10.15 0 0145 38a1 1 0 000 2 13.74 13.74 0 003.94-.46A33.47 33.47 0 0144 46.25a7.59 7.59 0 00-4-6.84zm-1.35-11.59l5.29-1.29a3 3 0 01-5.29 1.29zm-17.3 0a3 3 0 01-5.25-1.3zM7.83 5.24c.43-1 1.69-.88 2.58-.31l8.53 6a24.55 24.55 0 00-7.7 6.7C7.8 13.91 6 9.85 7.83 5.24zm41 12.31a24.25 24.25 0 00-7.7-6.69L49.56 5c.92-.59 2.18-.77 2.61.29 1.83 4.55.04 8.59-3.36 12.26zM2.8 3.77A2.89 2.89 0 017 2.41l.58.41A3.13 3.13 0 006 4.49C3.75 10 5.93 15 10.07 19.27a25.13 25.13 0 00-1.61 2.92C4.71 16.76.17 10.17 2.8 3.77zM13.38 53l-2.63 2a20.07 20.07 0 01-5-13.17 1.84 1.84 0 00-3.17-1.27C1.31 33.36 2.24 25.9 5 20.66c2.2 3.3 2.62 3.61 2.53 3.88a25.88 25.88 0 00-1 3.34c0 .31-.09 1.07-.09 1.17C5.83 39 13.39 46.54 16.7 49.83l.59.59c.257.386.548.747.87 1.08a4.31 4.31 0 01.52 2.89c-1.27-.69-2.54-1.28-3.29-1.62a2 2 0 00-2.01.23zm7.13 2.43a7.27 7.27 0 00.21-2.19 7.42 7.42 0 009.28-3.3 7.42 7.42 0 009.28 3.3 7.27 7.27 0 00.21 2.19 19.08 19.08 0 01-18.98 0zM55 20.66c2.74 5.24 3.67 12.7 2.46 20a1.84 1.84 0 00-3.2 1.23 20.11 20.11 0 01-5 13.15l-2.64-2a2 2 0 00-2-.24c-.74.34-2 .93-3.29 1.62a4.37 4.37 0 01.52-2.89 7.61 7.61 0 00.87-1.08l.6-.59c3.62-3.6 13.07-13 9.28-25-.18-.81-.6.35 2.4-4.2z"
                        fill="#000"
                    />
                </G>
                <Defs>
                    <LinearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                        <Stop offset="0%" stopColor="#05a" />
                        <Stop offset="10%" stopColor="#0a5" />

                        <Stop offset="30%" stopColor="transparent" />
                        <Stop offset="60%" stopColor="transparent" />

                        <Stop offset="80%" stopColor="#05a" />
                        <Stop offset="100%" stopColor="#0a5" />
                    </LinearGradient>
                </Defs>

            </Svg>

        </TouchableOpacity>

    );
};
export default Tiger;
