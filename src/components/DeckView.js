import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View,Text,TouchableHighlight,StyleSheet} from 'react-native'
import { clearLocalNotification,setLocalNotification } from '../utils/helpers';

export class DeckView extends Component {

    handleTakeQuiz=(deck)=>{
        clearLocalNotification()
        .then(setLocalNotification())
        this.props.navigation.navigate('QUIZ SCREEN',{deck:deck})
    }
    render(){
        const deck = this.props.route.params.deckData;
        const {navigation}=this.props;
        return(
            <View style={styles.container}>
                <Text style={styles.deckText}>{deck.title}</Text>
                <Text style={styles.deckCountText}>TOTAL CARD : {deck.questions.length}</Text>
                {deck.questions.length?
                    <View>
                        <TouchableHighlight onPress={() => this.handleTakeQuiz(deck)}>
                            <View style={styles.buttonQuizStart}>
                                <Text style={styles.buttonText}>TAKE QUIZ</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => navigation.navigate('ADD QUESTION',{deck:deck})}>
                            <View style={styles.buttonAddCard}>
                                <Text style={styles.buttonText}>ADD QUESTION</Text>
                            </View>
                        </TouchableHighlight>
                    </View>:
                    <View>
                        <Text style={styles.addWarning} >ADD QUESTIONS TO TAKE QUIZ :(</Text>
                        <TouchableHighlight onPress={() => navigation.navigate('ADD QUESTION',{deck:deck})}>
                            <View style={styles.buttonAddCard}>
                                <Text style={styles.buttonText}>ADD QUESTION</Text>
                            </View>
                        </TouchableHighlight>
                    </View>}
            </View>            
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    deckText:{
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontFamily: 'notoserif',
        fontSize:40,
        padding:15
    },
    deckCountText:{
        color:'#2196F3',
        padding:5
    },
    buttonQuizStart: {
        margin: 30,
        width: 260,
        alignItems: 'center',
        backgroundColor: '#2196F3'
    }, 
    buttonAddCard: {
        margin: 30,
        width: 260,
        alignItems: 'center',
        backgroundColor: '#2196F3'
    },
    addWarning:{
        textAlign: 'center',
        padding: 20,
        color: 'red'
    },
    buttonText: {
        textAlign: 'center',
        padding: 20,
        color: 'white'
    }
  });

export default connect()(DeckView);
  