import React, { Component } from 'react';
import {connect} from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {editVoteSetName} from '../actions/VotesActions'


class EditVoteName extends Component {  
    state={
        editing: false,
        name:''
    }

    componentWillMount(){
        this.setState({
            name: this.props.name
        })
    }

    handleEditing = () => {
        this.setState({
            editing: !this.state.editing
        })
    }

    updateName = (e) => {
        let txt = e.target.value;
        this.setState({
            name: txt
        })
    }

    sendNewName = (e) => {
        e.preventDefault();
        if(this.state.name.length > 0){
            let data={"votesSetName": this.state.name}
            this.props.editVoteSetName(data, this.props.uniqID);
            this.handleEditing();
        }else{
            this.handleEditing();
        }
    }
    
  render() {
      const {name} = this.props;

    return (
      <div className="EditVoteInput-name-wrapper">
        <span className='font-edit-title-hdr'>Title</span>
       {this.state.editing ?
            <div className='EditVoteInput-name-form-wrapper'>
                <form onSubmit={(e) => this.sendNewName(e)} className='EditVoteInput-name-form'>
                    <CSSTransitionGroup  transitionName="a-edit-title" transitionAppear={true}
                    transitionAppearTimeout={250} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
                        <input value={this.state.name} onChange={(e) => this.updateName(e)} className='font-edit-title-input EditVote-title-input'/>
                    </CSSTransitionGroup>
                    <input type="submit" className='EditVote-accept-btn edit-accept-title' value=''/>
                    <div onClick={() => this.handleEditing()} className='EditVote-cancel-btn edit-cancel-title'></div>
                </form>
            </div>
            :
            <div className='EditVoteInput-nameHeader-wrapper'>
                <div className='EditVote-title-col'>
                    <span className='font-edit-title-input'>{name}</span> 
                </div>
                <div className='EditVote-edit-btn title-edit-btn EditVote-EditVote-btn-hover' onClick={() => this.handleEditing()} ></div>
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

const mapDispatchToProps = { editVoteSetName }

export default connect(mapStateToProps, mapDispatchToProps)(EditVoteName);