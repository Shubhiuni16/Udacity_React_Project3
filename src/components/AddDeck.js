import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity , TextInput, KeyboardAvoidingView} from 'react-native';
import { connect } from "react-redux"
import {addDeck} from "../actions/index"
import {addDeck as NewDeck} from "../utils/helpers"
import {getDeck} from "../utils/helpers"

class AddDeck extends Component {
    state={
        inputText:""
    }
    handleChange = inputText => {
        this.setState({ inputText });
    };
    handleSubmit = async() => {
        const { addDeck, navigation } = this.props;
        const { inputText } = this.state;
        addDeck(inputText);
        NewDeck(inputText);
        this.setState(() => ({ inputText: '' }));
        const refreshedDeck=await getDeck(inputText);
        navigation.navigate('VIEW DECK', {deckData:refreshedDeck})
    };
    render(){
        return(
           <View style={styles.container}>
               <Text>NEW DECK NAME WOULD BE...</Text>
               <KeyboardAvoidingView>
                   <TextInput value={this.state.inputText} onChangeText={this.handleChange} placeholder="NEW DECK TITLE" style={styles.input} />
                   <TouchableOpacity onPress={this.handleSubmit} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Submit</Text>
		   </TouchableOpacity>
               </KeyboardAvoidingView>
           </View> 
        )
    }
    
}

export default connect(null,{ addDeck })(AddDeck);

const styles=StyleSheet.create({
    container: {
        padding: 23,        
     },  
    input: {
        margin: 15,
        height: 40,
        borderColor: '#2196F3',
        borderWidth: 1,   
     },
     submitButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        margin: 15,
        height: 40,
     },
     submitButtonText:{
        color: 'white',
        alignSelf:'center'
     }
  
})
