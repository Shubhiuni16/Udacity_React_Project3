import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableHighlight, TextInput, KeyboardAvoidingView} from 'react-native';
import { connect } from "react-redux"
import {addCard} from "../actions/index"
import {addCard as NewCard} from "../utils/helpers"
import {getDeck} from "../utils/helpers"

class AddQuestion extends Component {
    state={
        questionText:"",
        answerText:""
    }
    handleChange_question = questionText => {
        this.setState({ questionText:questionText });
    };
    handleChange_answer = answerText => {
        this.setState({ answerText:answerText });
    };
    handleSubmit = async (name) => {
        const { addCard, navigation} = this.props;
        const { questionText,answerText } = this.state;
        addCard(name,{question:questionText,answer:answerText});
        await NewCard(name,{question:questionText,answer:answerText});
        this.setState(() => ({ questionText: "",answerText:"" }));
        const refreshedDeck=await getDeck(name);
        navigation.navigate('VIEW DECK', {deckData:refreshedDeck})

    };
    render(){
        const deck = this.props.route.params.deck;
        return(
           <View style={styles.container}>
               <Text>NEW QUESTION-CARD</Text>
               <KeyboardAvoidingView>
                   <View>
                    <TextInput value={this.state.questionText} onChangeText={this.handleChange_question} placeholder="ADD QUESTION" style={styles.input} />
                    <TextInput value={this.state.answerText} onChangeText={this.handleChange_answer} placeholder="ADD ANSWER" style={styles.input} />
                   </View>
                   <TouchableHighlight onPress={()=>this.handleSubmit(deck.title)} style={styles.submitButton}>
                       <View>
                          <Text style={styles.submitButtonText}>Submit</Text>
                       </View>
		   </TouchableHighlight>
               </KeyboardAvoidingView>
           </View> 
        )
    }
}

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

export default connect(null,{ addCard })(AddQuestion);
