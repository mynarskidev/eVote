import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import VoteBox from './VoteBox'


class VotesContainer extends Component {

    editWrapper = (data) => {
        this.props.editWrapper(data)
    }

    playWrapper = (data) => {
        this.props.playVote(data);
    }

    removeWrapper = (id, name) => {
        let langCount = 0;
        // eslint-disable-next-line
        this.props.VotesStore.map((Vote) => {
            if(Vote.frontLanguage === this.props.VotesLang){
                langCount++;
            }
            if(Vote.backLanguage === this.props.VotesLang){
                langCount++;
            }
        })
        let langFlag = false;
        if(langCount <= 1){
            langFlag = true;
        }
        this.props.removeWrapper(id, name, langFlag);
    }
    
  render() {
      const { VotesStore } = this.props;
      let VotesArr = [];
      // eslint-disable-next-line
      VotesStore.map((Voteka) => {
          if (typeof Voteka !== 'undefined') {
                  if (this.props.VotesLang === '-') {
                      VotesArr.push(
                          <VoteBox Voteka={Voteka} key={Voteka.votesSetId} editWrapper={this.editWrapper} removeWrapper={this.removeWrapper} playVote={this.playWrapper} />
                      )
                  }
                  if (this.props.VotesLang === Voteka.frontLanguage || this.props.VotesLang === Voteka.backLanguage) {
                      VotesArr.push(
                          <VoteBox Voteka={Voteka} key={Voteka.votesSetId} editWrapper={this.editWrapper} removeWrapper={this.removeWrapper} playVote={this.playWrapper} />
                      )
                  }
          }
      });
      let zeroFlag = true;
      if(VotesArr.length > 0){
          zeroFlag = false;
      }
    return (
        <div>
         <div className="container"> 
            {
                zeroFlag ? 
                <div className='emptyContainer'>
                    <span className='font-no-votes'>You do not have anything to vote :(</span>
                    <img className='noVotes-image' src='img/noVotes.png' alt="NO POLLS AVAILABLE"/>
                </div>
                : null
            }
            <CSSTransitionGroup transitionName="a-VoteBox" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                {VotesArr}
            </CSSTransitionGroup>
         </div>
        </div>
    );
  }
}

export default VotesContainer;