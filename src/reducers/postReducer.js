import { SEND_VOTE_SET, GET_ALL, REMOVE_VOTE_SET, CLEAN_ALL, SEND_NEW_ANSWERS } from '../store/types'

export default function postReducer(state={Votes: []}, action){
    switch(action.type){
        case GET_ALL:{
            let data = action.Votes;
            state = {Votes: data}
            return state
        }
        case CLEAN_ALL:{
            let data = action.Votes;
            state = {Votes: data}
            return state
        }
        case SEND_VOTE_SET:{
            let id = action.id
            let oldData = {...state.Votes}
            let newData = action.Votes
            let data = {[`${id}`] : newData}
            state = {...state, Votes: Object.assign( {}, oldData, data )}
            return state
        }
        case SEND_NEW_ANSWERS:{
            //TODO console.log
            console.log(action)
            return null
            // state = {...state,
            //         // eslint-disable-next-line
            //         FlashCards: state.FlashCards.map((FlashCardObj) => {
            //             if(FlashCardObj.cardsSetId === action.uniqID){
            //                 FlashCardObj.cardsSetName = action.newName
            //             }
            //          return FlashCardObj
            //         })
            //         }
            // return state
        }
        case REMOVE_VOTE_SET:{
            delete state.Votes[action.id]
            state = {...state,
                Votes: state.Votes  
            }
            return state
        }
        default:{
            return state
        }
    }
}