import React,{Component} from 'react'
import {Text,StyleSheet, ScrollView,TouchableHighlight,Animated} from 'react-native'
import {connect} from 'react-redux'
import { fetchDecks } from '../actions'



class Main extends Component{
    constructor(props){
        super(props);
        this.handlePressIn=this.handlePressIn.bind(this);
        this.handlePressOut=this.handlePressOut.bind(this);
    }
    componentDidMount(){
        this.props.fetchDecks();
        
    }
    UNSAFE_componentWillMount(){
        this.animatedValue=new Animated.Value(1);
    }
    handlePressIn(){
        Animated.spring(this.animatedValue,{
            toValue:.5,
            useNativeDriver:true
        }).start()
    }
    handlePressOut(){
        Animated.spring(this.animatedValue,{
            toValue:1,
            useNativeDriver:true,
            friction:10,
        }).start()
    }
    render(){
        const animatedStyle={
            transform:[{scale:this.animatedValue}]
        }
        const {decks,navigation}=this.props;
        return(
            <ScrollView contentContainerStyle={styles.container}>
                {Object.values(decks).map(d=>{
                    return(
                        <TouchableHighlight key={d.title} onPress={() => navigation.navigate('VIEW DECK', {deckData:decks[d.title]})} onPressIn={this.handlePressIn} onPressOut={this.handlePressOut}>
                            <Animated.View style={[styles.button,animatedStyle]}>
                                <Text style={styles.buttonText}>{d.title}({d.questions.length})</Text>
                            </Animated.View>
                        </TouchableHighlight>
                    )
                })}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 60,
      flex:1,
      alignItems:'center'
    },
    button: {
      margin: 30,
      width: 260,
      alignItems: 'center',
      backgroundColor: '#2196F3'
    },
    buttonText: {
      textAlign: 'center',
      padding: 20,
      color: 'white'
    }
  });

const mapStateToProps = state => {
    let s=state.data===undefined?{}:state.data;
    return(
        { decks: s}
    )};

export default connect(
    mapStateToProps,
    {fetchDecks}
  )(Main)