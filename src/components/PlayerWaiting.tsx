import * as React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface IAppProps {
  handleQuit:()=>{},
  isPlayerWaiting:boolean
}

export const PlayerWaiting =(props:IAppProps)=> {

    const {handleQuit,isPlayerWaiting}= props;
    return (
      <View>
        <Text>Waiting for Opponent .... </Text>
        <TouchableOpacity  onPress={handleQuit}>
            <Text>Quit</Text>
        </TouchableOpacity>
      </View>
    );
  
}


export default PlayerWaiting;