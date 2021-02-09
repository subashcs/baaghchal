import React, {  ChangeEventHandler, FormEvent, useState } from 'react';
import {NativeSyntheticEvent, StyleSheet, TextInputChangeEventData, View} from 'react-native';
import { Input } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

type PropTypes = {

}
export default function(props:PropTypes){
    const initialState = {
        firstname:"",
        lastname:"",
        email:"",
        phone:"",
        password:""

    }

    const [formData ,setFormData]=useState(initialState);
    const handleChange = (e:any) =>{
        let {key,value} = e.target;
        setFormData({...formData,[key]:value})
    }

return (
    <ScrollView>
        <View>
            <Input textContentType="name" value={formData.firstname} onChange={handleChange}/>
        </View>

    </ScrollView>
)
}

const styles = StyleSheet.create({

})