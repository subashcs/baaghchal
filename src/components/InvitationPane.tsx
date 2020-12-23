import * as React from 'react';
import {  Alert, Modal, StyleSheet, Text, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

export interface IInvitationPaneProps {
    acceptInvitation:()=>void
    rejectInvitation:()=>void,
    inviter:{displayName:string , requestFrom:string} | {},
    modalVisible:boolean
}

const InvitationPane = (props:IInvitationPaneProps) =>{
  console.log("props in pane",props)
    const {acceptInvitation , rejectInvitation, inviter,modalVisible}= props;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={ modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{`Invitation from ${inviter?.displayName} ${modalVisible}` }</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                
                rejectInvitation();
              }}
            >
              <Text style={styles.textStyle}>Reject </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.openButton}
              onPress={() => {
                acceptInvitation();
              }}
            >
              <Text style={styles.textStyle}>Accept</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      

      
    );
  
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default InvitationPane;