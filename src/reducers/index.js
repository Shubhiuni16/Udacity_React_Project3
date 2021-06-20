import {ADD_DECK, GET_DECKS, GET_DECK, ADD_CARD} from '../actions'

const decks=(state={},action)=>{
    switch(action.type){
        case ADD_DECK:
            return {
                data:{
                    ...state.data,
                    [action.deck]:{
                        title:[action.deck],
                        questions:[]
                    }
                }
            }
        case GET_DECK:
            return state.data[action.deck];
        case GET_DECKS:
            return {
                ...state,
                ...action.decks
              };
        case ADD_CARD:{
            const {deck,card}=action
            return {
                data:{
                    ...state.data,
                    [deck]:{
                        ...state.data[deck],
                        questions:[...state.data[deck].questions].concat(card)
                    }
                }
            }}
        default:
            return state;        
    }
}
export default decks;