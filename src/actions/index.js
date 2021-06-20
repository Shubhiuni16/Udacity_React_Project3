import * as AsyncStorage from '../utils/helpers';

export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';
export const GET_DECKS = 'GET_DECKS';
export const GET_DECK='GET_DECK'

export const addDeck = (deck) => ({
  type: ADD_DECK,
  deck
});

export const getDecks =(decks) => ({
  type: GET_DECKS,
  decks
});

export const getDeck = (deck) => ({
  type: GET_DECK,
  deck
});

export const addCard=(deck,card) => {
  console.log(deck,card);
  return{
  type:ADD_CARD,
  deck,
  card
}}

export const fetchDecks = () => async dispatch => {
  const decks = await AsyncStorage.getDecks();
  return dispatch(getDecks(decks));
};