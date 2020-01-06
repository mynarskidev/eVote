import { TOGGLE_CARD, SEND_VOTE_SET, GET_ALL, EDIT_VOTE_NAME, EDIT_VOTE_IFLEARNED, EDIT_VOTE, EDIT_VOTE_LANGUAGES, REMOVE_VOTE_SET, REMOVE_SINGLE_VOTE, ADD_SINGLE_VOTE, CLEAN_ALL } from '../store/types'

export default function postReducer(state={Votes: [], toggleCard: null}, action){
    switch(action.type){
        case GET_ALL:{

            let data = action.Votes;
            state = {Votes: data}
            console.log(state)
            return state
        }
        case TOGGLE_CARD:{
            let data = action.toggleCard;
            state = {toggleCard: data}
            return state
        }
        case CLEAN_ALL:{
            let data = action.Votes;
            state = {Votes: data}
            return state
        }
        case SEND_VOTE_SET:{
            let data = action.Votes;
            data.id = action.id;
            state = {...state, Votes: [...state.Votes, data] }
            return state
        }
        case EDIT_VOTE_NAME:{
            state = {...state,
                    // eslint-disable-next-line
                    Votes: state.Votes.map((VoteObj) => {
                        if(VoteObj.votesSetId === action.uniqID){
                            VoteObj.votesSetName = action.newName
                        }
                     return VoteObj
                    })
                    }
            return state
        }
        case EDIT_VOTE_LANGUAGES:{
            state = {...state,
                // eslint-disable-next-line
                Votes: state.Votes.map((VoteObj) => {
                    if(VoteObj.votesSetId === action.uniqID){
                        VoteObj.frontLanguage = action.newLangs[0];
                        VoteObj.backLanguage = action.newLangs[1];
                    }
                 return VoteObj
                })
            }
            return state
        }
        case REMOVE_SINGLE_VOTE: {
            state = {...state,
                // eslint-disable-next-line
                     Votes: state.Votes.map((VoteObj) => {
                     if(VoteObj.votesSetId === action.uniqID){
                         VoteObj.vote = VoteObj.vote.filter((e) => {
                            return VoteObj.vote.indexOf(e) !== action.arrID
                         })
                         return VoteObj
                     }else{
                         return VoteObj
                     }
                    
                    })
                    }
            return state
        }
        case EDIT_VOTE_IFLEARNED:{
            state = {...state,
                    // eslint-disable-next-line
                    Votes: state.Votes.map((VoteObj) => {
                        if(VoteObj.votesSetId === action.uniqID){
                            VoteObj.ifLearned = action.newIfLearned
                        }
                     return VoteObj
                    })
                }
            return state
        }
        case REMOVE_VOTE_SET:{
            console.log("Przed: ", state.Votes)
            delete state.Votes[action.id]
            console.log("Po: ", state.Votes)
            state = {...state,
                Votes: state.Votes  
            }
            return state
        }
        case ADD_SINGLE_VOTE: {
            state = {...state,
                // eslint-disable-next-line
                     Votes: state.Votes.map((VoteObj) => {
                     if(VoteObj.votesSetId === action.uniqID){
                         VoteObj.vote =  [...VoteObj.vote, [action.newVote[0], action.newVote[1], action.newVote[2]]];
                     }
                    return VoteObj
                    })
                   }
            return state
        }
        case EDIT_VOTE:{
            let a = action.ab[0]
            let b = action.ab[1]
            state = {...state,
                    // eslint-disable-next-line
                     Votes: state.Votes.map((VoteObj) => {
                     if(VoteObj.votesSetId === action.id){
                        // eslint-disable-next-line
                         VoteObj.vote.map((VoteArr, id) => {
                            if(id === action.arrId){
                                VoteArr = [...VoteArr, VoteArr[0] = b, VoteArr[1] = a]
                                return VoteArr
                            }else{
                                return VoteArr
                            }
                         })
                         return VoteObj
                     }else{
                         return VoteObj
                     }
                    })
                    }
            return state
        }
        default:{
            return state
        }
    }
}