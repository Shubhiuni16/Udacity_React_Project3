import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { connect } from "react-redux"

class QuizScreen extends Component {
    state={
        correctAnswered:0,
        incorrectAnswered:0,
        current:1,
        showAnswer:false,
        quizCompleted:false
    }
    handleShowAns = () => {
        this.setState({showAnswer:true});
    };
    handleShowQues = () => {
        this.setState({showAnswer:false});
    };
    handleRight = (count) => {
        this.setState((prev)=>({showAnswer:false,correctAnswered:prev.correctAnswered+1,current:prev.current+1,quizCompleted:prev.current===count?true:false}));
    };
    handleWrong = (count) => {
        this.setState((prev)=>({showAnswer:false,incorrectAnswered:prev.incorrectAnswered+1,current:prev.current+1,quizCompleted:prev.current===count?true:false}));
    };
    handleRestart=()=>{
        this.setState({correctAnswered:0,
        incorrectAnswered:0,
        current:1,
        showAnswer:false,
        quizCompleted:false
    })}
    render(){
        const deck = this.props.route.params.deck;
        let ques,ans;
        const quesCount=deck.questions.length
        if(quesCount>=this.state.current){
        ques=deck.questions[this.state.current-1].question;
        ans=deck.questions[this.state.current-1].answer
        }
        return(
            <View style={styles.container}>
                    {!this.state.quizCompleted?(
                        <View style={{alignItems:'center'}}>
                            <Text style={styles.count}>{this.state.current}/{quesCount}</Text>
                            {this.state.showAnswer?(
                                <View >
                                    <Text style={styles.text}>{ans}</Text>
                                    <TouchableOpacity onPress={this.handleShowQues} style={styles.submitButton}>
                                        <Text style={styles.submitButtonText}>SHOW QUESTION</Text>
                                    </TouchableOpacity>
                                    <View style={styles.answers}>
                                        <TouchableOpacity onPress={()=>this.handleRight(quesCount)} style={styles.submitButtonRight}>
                                            <Text style={styles.submitButtonText}>CORRECT</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={()=>this.handleWrong(quesCount)} style={styles.submitButtonWrong}>
                                            <Text style={styles.submitButtonText}>INCORRECT</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ):(
                                <View >
                                    <Text style={styles.text}>{ques}</Text>
                                    <TouchableOpacity onPress={this.handleShowAns} style={styles.submitButton}>
                                        <Text style={styles.submitButtonText}>SHOW ANSWER</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                            }
                        </View>):(
                            <View>
                                <Text style={styles.text}>RESULT</Text>
                                <Text style={styles.text}>CORRECT:{this.state.correctAnswered}</Text>
                                <Text style={styles.text}>INCORRECT:{this.state.incorrectAnswered}</Text>
                                <TouchableOpacity onPress={this.handleRestart} style={styles.submitButton}>
                                        <Text style={styles.submitButtonText}>RESTART QUIZ</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('VIEW DECK', {deckData:deck})} style={styles.submitButton}>
                                        <Text style={styles.submitButtonText}>BACK TO DECK</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container: {
        padding: 23, 
        flex:1,
        alignItems:'center',
     },  
     count:{
        fontWeight: 'bold',
        fontFamily: 'notoserif',
        fontSize:40,
        paddingBottom:30,
     },
     text:{
        fontWeight: 'bold',
        fontFamily: 'notoserif',
        fontSize:40,
        paddingBottom:30
     },
     answers:{
        flexDirection:'row',
        justifyContent:'center',
        paddingTop:10
     },
     submitButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        height: 40,
        alignItems:'center',
        margin:10
     },
     submitButtonRight: {
        backgroundColor: 'green',
        padding: 10,
        height: 40,
        alignItems:'center',
        margin:10,
        marginTop:20
     },
     submitButtonWrong: {
        backgroundColor: 'red',
        padding: 10,
        height: 40,
        alignItems:'center',
        margin:10,
        marginTop:20
     },
     submitButtonText:{
        color: 'white',
        alignSelf:'center'
     }
  
})

export default connect()(QuizScreen);