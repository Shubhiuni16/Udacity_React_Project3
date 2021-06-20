import React,{Component} from "react"
import { View, StatusBar } from "react-native"
import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux'
import reducer from './src/reducers'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import Main from './src/components/Main'
import AddDeck from './src/components/AddDeck'
import DeckView from './src/components/DeckView'
import AddQuestion from './src/components/AddQuestion'
import QuizScreen from './src/components/QuizScreen'
import Constants from 'expo-constants'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { setLocalNotification } from './src/utils/helpers'
console.reportErrorsAsExceptions = false;
const store=createStore(reducer, applyMiddleware(thunk,logger))

const Tab = createMaterialTopTabNavigator()
const TabNav=()=>(
  <Tab.Navigator >
    <Tab.Screen name="DECKS" component={Main} />
    <Tab.Screen name="ADD DECK" component={AddDeck} />
  </Tab.Navigator>
)

const Stack=createStackNavigator();
const MyStack=()=>(
    <Stack.Navigator headerMode="screen">
      <Stack.Screen name="DECKS" component={TabNav} />
      <Stack.Screen name="ADD DECK" component={AddDeck} />
      <Stack.Screen name="VIEW DECK" component={DeckView} />
      <Stack.Screen name="ADD QUESTION" component={AddQuestion} />
      <Stack.Screen name="QUIZ SCREEN" component={QuizScreen} />
    </Stack.Navigator>
)


function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height:Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
} 

export default class App extends Component {
  componentDidMount(){
    setLocalNotification()
}
  render(){
    return (
      <Provider store={store}>
        <NavigationContainer>
          <UdaciStatusBar backgroundColor={ "#292477"} barStyle="light-content"/>
          <MyStack />
        </NavigationContainer>
      </Provider>
    );
  } 
}
