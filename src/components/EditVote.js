import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import EditVoteInput from './EditVoteInput'
import EditVoteLangs from './EditVoteLangs'
import EditVoteName from './EditVoteName'
import SingleVoteInputContainer from './SingleVoteInputContainer'

class EditVote extends Component {
    state = {
        wrapperHeight : {
            'height' : '100%'
        },
        boxStyle_bckg:{
            'opacity' : 0
        },
        boxStyle_cont:{
            'opacity' : 0,
            'transform' : 'translateY(-80px)'
        }
    }
    
    componentDidMount(){
        document.addEventListener('keydown', this.exitWindow, false)
        setTimeout(() => {
            this.setState({
                boxStyle_bckg:{
                'opacity' : 1
                },
                boxStyle_cont:{
                    'opacity' : 1,
                    'transform' : 'translateY(0px)'
                }
            });
            let docH = document.height;
            let boxH = document.getElementById('EditVote-cont').clientHeight + 100;
            if(boxH > docH){
                this.setState({
                    wrapperHeight: {
                        'height' : boxH + 37 + 'px'
                    }
                })
            }
        }, 10)
    }
    componentWillUnmount(){
        document.removeEventListener('keydown',this.exitWindow, false)
    }
    
    openWindow = () => {
        this.setState({
            boxStyle_bckg:{
                'opacity' : 0
            },
            boxStyle_cont:{
                'opacity' : 0,
                'transform' : 'translateY(-80px)'
            }
        })
        setTimeout(() => {
            this.props.openWindow();
        }, 300)
    }

    exitWindow = (e) => {
        if ( e.keyCode === 27 ) {
            this.openWindow();
        }
    }
    
    resizeOnAdd = () => {
        setTimeout(() => {
            let wrapH = document.getElementById('EditVote-wrapp').clientHeight;
            let docH = document.height;
            let boxH = document.getElementById('EditVote-cont').clientHeight + 100;
            if( (boxH + 37) > docH){
                this.setState({
                    wrapperHeight: {
                        'height' : wrapH + 37 + 'px'
                    }    
                })    
            }    
        }, 300)
    }
    
    resizeOnRemove = () => {
        let wrapH = document.getElementById('EditVote-wrapp').clientHeight;
        let docH = document.height;
        let boxH = document.getElementById('EditVote-cont').clientHeight + 100;
        if( (boxH - 37) > docH){
            setTimeout(() => {
                this.setState({
                    wrapperHeight: {
                            'height' : wrapH - 37 + 'px'
                        }    
                })    
            }, 300)
        }else{
            setTimeout(() => {
                this.setState({
                    wrapperHeight: {
                        'height' : docH + 'px'
                    }    
                })    
            }, 300)
        }
    }

  render() {
      const { data } = this.props;
      let array = [];
      let languages= [data.frontLanguage, data.backLanguage]
      // eslint-disable-next-line
      data.vote.map((Voteka) => {
        let VoteId = data.vote.indexOf(Voteka);
        let SingleVoteId = data.vote[VoteId][2];
        array.push(
            <EditVoteInput key={SingleVoteId} uniqId={data.votesSetId} SingleVoteId={SingleVoteId} VoteData={Voteka} VoteID={VoteId} resizeOnRemove={this.resizeOnRemove}/>
            )
        })
      let nextInputIndex = data.vote.length + 1;
    return (
      <div className="EditVote-wrap" id='EditVote-wrapp' style={this.state.wrapperHeight}>
        <div style={this.state.boxStyle_bckg} className="EditVote-bckg" onClick={() => this.openWindow()}></div>
        <div className="EditVote-cont" style={this.state.boxStyle_cont} id='EditVote-cont'>
                <EditVoteName name={data.votesSetName} uniqID={data.votesSetId}/>
                <div className='EditVote-splitline'></div>
                <div className='EditVote-langsAndCategory-wrapper'>
                    <EditVoteLangs uniqID={data.votesSetId} langs={languages}/>  
                </div>
                <div className='EditVote-Votes-wrapper'>
                    <CSSTransitionGroup  transitionName="a-edit-VoteCont" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                        {array}  
                    </CSSTransitionGroup>
                    <SingleVoteInputContainer uniqID={data.votesSetId} index={nextInputIndex} resizeOnAdd={this.resizeOnAdd}/>
                </div>
        </div>
      </div>
    );
  }
}

export default EditVote;