import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { connect } from 'react-redux'
import { editVoteLanguages } from '../actions/VotesActions'


class EditVoteLangs extends Component {
    state={
        editing: false,
        langsArr: ['','']
    }

    openEditWin = () => {
        if (this.state.editing === false){
            this.setState({
                langsArr: [this.props.langs[0], this.props.langs[1]]
            })
        }
        this.setState({
            editing: !this.state.editing
        })
    }
    
    newLangs = (e, id) =>{
        let txt = e.target.value;
        let langs = this.state.langsArr;
        langs[id] = txt;
        this.setState({
            langsArr: langs
        })
    }

    sendNewLangs = (e) => {
        e.preventDefault();
        let langs = this.state.langsArr;
        langs[0] = langs[0].toLowerCase();
        langs[0] = langs[0].charAt(0).toUpperCase() + langs[0].slice(1);
        langs[1] = langs[1].toLowerCase();
        langs[1] = langs[1].charAt(0).toUpperCase() + langs[1].slice(1);
        if(langs[0].length > 0 && langs[1].length > 0){
            let data ={
                "frontLanguage": langs[0],
                "backLanguage": langs[1]      
            }
            this.props.editVoteLanguages(this.props.uniqID, data);
            this.setState({
                editing: !this.state.editing
            })
        }else{
            this.setState({
                editing: !this.state.editing
            })
        }
    }
    
  render() {
      const { langs } = this.props;
    return (
      <div className="EditVote-editLangs-cont">
            <span className='font-edit-smll-hdr'>Languages</span>
            {this.state.editing ?
                <form onSubmit={(e) => this.sendNewLangs(e)} className="EditVote-editLangs-row">
                    <CSSTransitionGroup  transitionName="a-edit-langs" transitionAppear={true} transitionAppearTimeout={250} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
                        <input value={this.state.langsArr[0]} onChange={(e) => {this.newLangs(e, 0)}} className='EditVote-langs-input font-edit-info'/>
                    </CSSTransitionGroup>
                    <span className='font-edit-info edit-langs-dash'>-</span>
                    <CSSTransitionGroup  transitionName="a-edit-langs" transitionAppear={true} transitionAppearTimeout={250} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
                        <input value={this.state.langsArr[1]} onChange={(e) => {this.newLangs(e, 1)}} className='EditVote-langs-input font-edit-info'/>
                    </CSSTransitionGroup>
                    <CSSTransitionGroup  transitionName="a-edit-icons" transitionAppear={true} transitionAppearTimeout={250} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
                        <div className='EditVote-lagns-btns-row'>
                            <input type="submit" className='EditVote-accept-btn EditVote-langs-btns EditVote-accept-langs' value=''/>
                            <div onClick={() => {this.openEditWin()}} className='EditVote-cancel-btn EditVote-langs-btns'></div>
                        </div>
                    </CSSTransitionGroup>
                </form>
            :
                <div className="EditVote-editLangs-row">
                    <span className='font-edit-info'>{langs[0]}</span>
                    <span className='font-edit-info edit-langs-dash'>-</span>
                    <span className='font-edit-info'>{langs[1]}</span>
                    <div className='EditVote-edit-btn EditVote-edit-btn-info EditVote-EditVote-btn-hover' onClick={() => {this.openEditWin()}}></div>
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

const mapDispatchToProps = { editVoteLanguages }

export default connect(mapStateToProps, mapDispatchToProps)(EditVoteLangs);

