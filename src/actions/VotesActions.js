import { DO_NOTHIN, GET_ALL, SEND_VOTE_SET, EDIT_VOTE_NAME, EDIT_VOTE_IFLEARNED, EDIT_VOTE, EDIT_VOTE_LANGUAGES, REMOVE_VOTE_SET, REMOVE_SINGLE_VOTE, ADD_SINGLE_VOTE, CLEAN_ALL, TOGGLE_CARD } from '../store/types'

import axios from 'axios';


const apiBaseUrl = "http://localhost:8081/api";
let shortid = require('shortid');

export const doNothin = () => {
    return {
        type: DO_NOTHIN
    }
}

export function toggleCardFunction(bool) {
    console.log("wchodze")
    console.log(bool)
    return { type: TOGGLE_CARD, toggleCard: bool };
}

export const getAllVotesSetsSuccess = (data) => {
    console.log(data)
    return {
        type: GET_ALL,
        Votes: data,
    }
};

export const cleanScreen = () => {
    return {
        type: CLEAN_ALL,
        Votes: [],
    }
};

export const sendVotesSet = (data) => {
    // return (dispatch) => { //TODO console.log
    //   return axios.post(`${apiBaseUrl}/votesSet`, data, {headers: {'Authorization': localStorage.getItem('token')}})
    //     .then(response => {
    //         if (response.status === 201) {
    //              dispatch(sendVotesSetSuccess(response.data))
                    return sendVotesSetSuccess(data)
    //         }
    //     })
    //     .catch(error => {
    //         //alert("Something went wrong...") TODO
    //       throw(error);
    //     });
    // };
};

export const sendVotesSetSuccess = (data) => {
    return {
        type: SEND_VOTE_SET,
        Votes: data,
        id: shortid.generate()
    }
}

export const editIfLearnedVoteSet = (data, id) => {
    let url
    if (data === true) {
      url = `${apiBaseUrl}/votesSet/`+id+'/learned'
    } else {
      url = `${apiBaseUrl}/votesSet/`+id+ '/unlearned'
    }
    return (dispatch) => {
      return axios.put(url)
        .then(response => {
            if (response.status === 200) {
                dispatch(editIfLearnedVoteSetSuccess(response.data))              
            }
        })
        .catch(error => {
          throw (error);
        });
    };
};
  
export const editIfLearnedVoteSetSuccess = (data) => {
    return {
        type: EDIT_VOTE_IFLEARNED,
        newIfLearned: data.ifLearned,
        uniqID: data.votesSetId,
    }
}

export const removeVoteSet = (id) => {
    console.log(id)
    return {
        type: REMOVE_VOTE_SET,
        id : id
    } //TODOOOOOOOOO
//     return (dispatch) => {
//       return axios.delete(`${apiBaseUrl}/votesSet/`+ id)
//       .then(response => {
//         if (response.status === 204) {
//           dispatch(removeVoteSetSuccess(id))      
//         }
//       })
//       .catch(error => {
//         throw(error);
//       });
//   };
};
    
export const removeVoteSetSuccess = (id) => {
    return {
        type: REMOVE_VOTE_SET,
        id : id
    }
}

export const editVoteSetName = (data, id) => {
    return (dispatch) => {
      return axios.put(`${apiBaseUrl}/votesSet/`+id+'/name', data)
        .then(response => {
            if (response.status === 200) {
                dispatch(editVoteSetNameSuccess(response.data.votesSetName, response.data.votesSetId))   
            }
        })
        .catch(error => {
          throw(error);
        });
    };
};

export const editVoteSetNameSuccess = (votesSetName, votesSetId) => {
    return {
        type: EDIT_VOTE_NAME,
        newName: votesSetName,
        uniqID: votesSetId,
    }
}

export const editVoteLanguages = (id, data) => {
    return (dispatch) => {
        return axios.put(`${apiBaseUrl}/votesSet/`+id,data)
          .then(response => {
              if (response.status === 200) {
                  dispatch(editVoteLanguagesSuccess(response.data.votesSetId, response.data.frontLanguage, response.data.backLanguage))   
              }
          })
          .catch(error => {
            throw(error);
          });
      };
};

export const editVoteLanguagesSuccess = (id, frontLang, backLang) => {
    let data =[frontLang,backLang]
    return {
        type: EDIT_VOTE_LANGUAGES,
        uniqID: id,
        newLangs: data
    }
}

export const removeSingleVote = (votesSetId, VoteID, SingleVoteId) => {
    return (dispatch) => {
      return axios.delete(`${apiBaseUrl}/vote/`+SingleVoteId)
        .then(response => {
            if (response.status === 204) {
                dispatch(removeSingleVoteSuccess(votesSetId, VoteID))
            }
        })
        .catch(error => {
          throw(error);
        });
    };
};

export const removeSingleVoteSuccess = (votesSetId, VoteID) => {
    return {
        type: REMOVE_SINGLE_VOTE,
        uniqID : votesSetId,
        arrID : VoteID
    }
}

export const addSingleVote = (data) => {
    let dataArray = [data.back, data.front, data.id];
    return (dispatch) => {
      return axios.post(`${apiBaseUrl}/vote`, data)
        .then(response => {
            if (response.status === 201) {
                dispatch(addSingleVoteSuccess(dataArray, data.votesSetId))
            }
        })
        .catch(error => {
          throw(error);
        });
    };
};

export const addSingleVoteSuccess = (dataArray, uniqID) => {
    return {
        type: ADD_SINGLE_VOTE,
        newVote: dataArray,
        uniqID : uniqID,
    }
}

export const editVoteSetWords = (data, arr, uniqId, VoteID, SingleVoteId) => { 
    return (dispatch) => {
      return axios.put(`${apiBaseUrl}/vote/`+SingleVoteId, data)
      .then(response => {
            if (response.status === 200) {
                dispatch(editVoteSetWordsSuccess(arr, uniqId, VoteID))
            }
        })
        .catch(error => {
          throw(error);
        });
    };
};

export const editVoteSetWordsSuccess = (arr, uniqId, arrId) => {
    return {
        type: EDIT_VOTE,
        ab: arr,
        id: uniqId,
        arrId: arrId
    }
}