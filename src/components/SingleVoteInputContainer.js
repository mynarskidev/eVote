import React, { Component } from 'react';
import {connect} from 'react-redux'
import SingleVoteInput from './SingleVoteInput'
import {addSingleVote} from '../actions/VotesActions'

let shortid = require('shortid');


class SingleVoteInputContainer extends Component { 
    state = {
        data: ['','','']
    }

    passInputFocusFun = (e) => {
        this.setState({
            inputFocusFun: e
        })
    }
    
    addVote = (e,uniqID) => {
        e.preventDefault();
        let data = this.state.data
        data[2] = shortid.generate();
        if (data[0].length < 1 || data[1].length < 1){
            alert('One of inputs is empty...');
        }else{
            let dataSend ={
                "id": data[2],
                "front": data[0],
                "back": data[1],
                "votesSetId": uniqID
            }
            this.props.addSingleVote(dataSend);
            this.props.resizeOnAdd();
            this.setState({
                data: ['','','']
            })
            this.state.inputFocusFun();
        }
    }

    getData = (data) => {
        this.setState({
            data: data
        })
    }
    
    render() {
        const {uniqID, index} = this.props;
        return (
            <div >
                <form onSubmit={(e) => this.addVote(e, uniqID)} className='EditVote-addnew-Vote-wrapper'>
                    <span className='font-edit-Vote-nbmr'>{index}. </span>
                    <SingleVoteInput ab={this.getData} inputFocus={this.passInputFocusFun}/>
                    <input type="submit" className='EditVote-addVote-btn EditVote-addVote-btn-fx' value=''/>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        Votes: state.Votes
    }
}

const mapDispatchToProps = { addSingleVote }

export default connect(mapStateToProps, mapDispatchToProps)(SingleVoteInputContainer);