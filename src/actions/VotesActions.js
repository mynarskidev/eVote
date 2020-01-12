import { DO_NOTHIN, GET_ALL, SEND_VOTE_SET, REMOVE_VOTE_SET, CLEAN_ALL, SEND_NEW_ANSWERS } from '../store/types'

// import axios from 'axios';//TODO console.log


// const apiBaseUrl = "http://localhost:8080";//TODO console.log

let shortid = require('shortid');

export const doNothin = () => {
    return {
        type: DO_NOTHIN
    }
}

export const getAllVotesSetsSuccess = (data) => {
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

export const removeVoteSet = (id) => {
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

export const sendNewAnswers = (data) => {
    // return (dispatch) => { //TODO console.log
    //   return axios.post(`${apiBaseUrl}/votesSet`, data, {headers: {'Authorization': localStorage.getItem('token')}})
    //     .then(response => {
    //         if (response.status === 201) {
    //              dispatch(sendVotesSetSuccess(response.data))
                    return sendNewAnswersSuccess(data)//TODO console.log usun to
    //         }
    //     })
    //     .catch(error => {
    //         //alert("Something went wrong...") TODO
    //       throw(error);
    //     });
    // };
};

export const sendNewAnswersSuccess = (data) => {
    return {
        type: SEND_NEW_ANSWERS,
        singleVote: data,
        // id: shortid.generate()//todo console.log chyba nie potrzebne
    }
}