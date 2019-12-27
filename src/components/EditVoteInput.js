import React, { Component } from 'react';
import {connect} from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { editVoteSetWords, removeSingleVote } from '../actions/VotesActions'


class EditVoteInput extends Component {
    state = {
        a: this.props.VoteData[0],
        b: this.props.VoteData[1],
        editMode:false,
    }

    componentDidMount(){
        document.addEventListener('click', this.editMode, false);
        this.EditVoteInputWrapper.addEventListener('click', this.noPropagation, false);
        
    }
    componentWillUnmount(){
        document.removeEventListener('click', this.editMode, false);
        this.EditVoteInputWrapper.removeEventListener('click', this.noPropagation, false);
    }
    noPropagation = (event) => {
        event.stopPropagation();
        if(event.target.className === 'EditVote-edit-btn edit-Vote-btns EditVote-EditVote-btn-hover' || event.target.className === 'EditVote-cancel-btn EditVote-Vote-btns'){
            this.openEditWin();
        } 
        if(event.target.className === 'EditVote-remove-btn edit-Vote-btns EditVote-removeSingleVote-btn-hover'){
            this.removeSingleVoteFun()
        }
    }
    editMode = () => {
        if (this.state.editMode === true) {
            this.setState({
                editMode: !this.state.editMode
            })
        }
    }
    typeOfInput = (what, e) => {
        let data = e.target.value;
        if(what === 'a'){
            this.setState({
                a: data
            })
        }else if(what === 'b'){
            this.setState({
                b: data
            })
        }
    }
    openEditWin = () => {
        this.setState({
            editMode: !this.state.editMode,
            a: this.props.VoteData[1],
            b: this.props.VoteData[0],
        })
    }
    
    editVoteFun = (e) => {
        e.preventDefault();
        const { uniqId, VoteID, SingleVoteId } = this.props;
        let arr = []
        arr[0] = this.state.a;
        arr[1] = this.state.b;
        if( arr[0].length > 0 && arr[1].length > 0 ){
            let data ={
                "front": arr[0],
                "back": arr[1]      
            }
            this.props.editVoteSetWords(data, arr, uniqId, VoteID, SingleVoteId);
            this.setState({
                editMode: !this.state.editMode,
            })
        }
        
    }
    
    removeSingleVoteFun = () => {
        const { uniqId, VoteID, SingleVoteId } = this.props;
        this.props.removeSingleVote(uniqId, VoteID, SingleVoteId);
        this.props.resizeOnRemove();
    }

  render() {
    const { VoteData, VoteID } = this.props;
    return (
      <div className="EditVoteInput-wrap" ref={elem => this.EditVoteInputWrapper = elem}>
        {
            this.state.editMode ?
                <div className="EditVoteInput-editRow" >
                    <span className='font-edit-Vote-nbmr'>{VoteID + 1}. </span>
                    <form className="EditVoteInput-editRow" onSubmit={(e) => this.editVoteFun(e)}>
                        <CSSTransitionGroup  transitionName="a-edit-EditVote" transitionAppear={true} transitionAppearTimeout={250} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
                            <input value={this.state.a} onChange={(e) => this.typeOfInput('a', e)}  className='EditVote-Vote-input font-edit-Vote'/>
                        </CSSTransitionGroup>
                        <span className='font-edit-Vote EditVote-Vote-dash'>-</span>
                        <CSSTransitionGroup  transitionName="a-edit-EditVote" transitionAppear={true} transitionAppearTimeout={250} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
                            <input value={this.state.b} onChange={(e) => this.typeOfInput('b', e)} className='EditVote-Vote-input font-edit-Vote'/>
                        </CSSTransitionGroup>
                        <CSSTransitionGroup  transitionName="a-edit-icons" transitionAppear={true} transitionAppearTimeout={250} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
                            <div className='edit-EditVote-btns-row'>
                                <input type="submit" value="" className='EditVote-accept-btn EditVote-Vote-accept-btn EditVote-Vote-btns' /> 
                                <div onClick={() => this.openEditWin()} className='EditVote-cancel-btn EditVote-Vote-btns'></div>
                            </div>
                        </CSSTransitionGroup>
                    </form>
                </div>
             :
                <div className="EditVoteInput-showRow">
                    <span className='font-edit-Vote-nbmr'>{VoteID + 1}. </span>
                    <span className='font-edit-Vote'>{VoteData[1]} </span>
                    <span className='font-edit-Vote EditVote-Vote-dash'>-</span>
                    <span className='font-edit-Vote'>{VoteData[0]} </span>
                    <div onClick={() => this.openEditWin()} className='EditVote-edit-btn edit-Vote-btns EditVote-EditVote-btn-hover'></div>
                    <div onClick={() => this.removeSingleVoteFun()} className='EditVote-remove-btn edit-Vote-btns EditVote-removeSingleVote-btn-hover'></div>
                </div>
        }    
      </div>

    );
  }
}

const mapStateToProps = state => {
    return {
        Votes: state.Votes
    }
}

const mapDispatchToProps = { editVoteSetWords, removeSingleVote }
  
export default connect(mapStateToProps, mapDispatchToProps)(EditVoteInput);