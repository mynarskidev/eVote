import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Grid } from '@material-ui/core'
import NewVote from './NewVote';

let shortid = require('shortid');

class NewVoteContainer extends Component {
    state = {
        pollName:'',
        ifLearned:false,
        wrapperHeight : {
            'height' : '100%'
        },
        vote : [],
        answers:[],
        questions:['',''],
        boxStyle_bckg:{
            'opacity' : 0
        },
        boxStyle_cont:{
            'opacity' : 0,
            'transform' : 'translateY(-80px)'
        }
    }

    componentDidMount(){
        this.setState({
            isMounted: true,
        })
        setTimeout(() => {
            this.setState({
                boxStyle_bckg:{
                    'opacity' : 1
                },
                boxStyle_cont:{
                    'opacity' : 1,
                    'transform' : 'translateY(0px)'
                }
            })
        }, 5);
        document.addEventListener('keydown', this.exitWindow, false)
    }

    componentWillUnmount(){
        document.removeEventListener('keydown',this.exitWindow, false)
    }

    handleWin = () => {
        if(this.state.isMounted){
            this.setState({
                boxStyle_bckg:{
                    'opacity' : 0
                },
                boxStyle_cont:{
                    'opacity' : 0,
                    'transform' : 'translateY(-80px)'
                }
            })
            setTimeout(() => {this.props.openWindow()}, 200);
        }
    }

    exitWindow = (e) => {
        if ( e.keyCode === 27 ) {
            this.handleWin();
        }
    }

    updateName = (e) => {
        let val = e.target.value;
        this.setState({
            pollName: val
        })
    }

    addQuestion = async () => {
        let val = this.state.questions
        val.push("")
        await this.setState({
            questions: val
        })
        this.forceUpdate();
    }

    removeOption = async () => {
        let tempQuestions = this.state.questions
        tempQuestions.pop();
        await this.setState({
            questions: tempQuestions
        })
        this.forceUpdate();
      }

    sendNewPoll = (e) => {
        e.preventDefault();
        let VoteName = this.state.pollName;
        let VoteQuest = this.state.questions;
        let VoteIfLearned = this.state.ifLearned;//TODO zmien na ifVoted
        VoteQuest[0] = VoteQuest[0].toLowerCase();
        VoteQuest[0] = VoteQuest[0].charAt(0).toUpperCase() + VoteQuest[0].slice(1);
        let VoteArr = this.state.vote;
        if (typeof VoteName !== 'undefined' && VoteName.length > 0) {
            let packedData = {};
            packedData.pollName = VoteName;
            packedData.username = localStorage.getItem('username');
            packedData.question = VoteQuest[0];
            packedData.ifLearned = VoteIfLearned;
            packedData.vote = []
            // eslint-disable-next-line
            VoteArr.map((Vote) => {
                if(typeof Vote != 'undefined' && Vote[0].length > 0){
                    Vote.splice(2,1);
                    Vote[2] = shortid.generate();//TODO tak, ale daj do poll? a nie do opcji?
                    packedData.vote.push(Vote);
                }
            })
            if( packedData.vote.length > 0 ){
                this.props.VotePack(packedData);
                this.handleWin();
            }
        }  
    }
    
    render(){        
        let optionsToRender = [];
        let obj = this.state.questions;
        Object.keys(obj).forEach(function(key) {
            optionsToRender[key] = <NewVote key={key} />
        })

        return (
            <div className="addNew-wrap" id='wrapp' style={this.state.wrapperHeight}>
                <div className="addNew-bckg" onClick={() => this.handleWin()} style={this.state.boxStyle_bckg}>
                </div>
                <div className="addNew-cont" id='addNew-box' style={this.state.boxStyle_cont}>
                    <form className='addNew-form' onSubmit={(e) => this.sendNewPoll(e)}>
                        <div className='addNew-input-container'>
                            <span className='font-addNew-input-name-hdr'>Poll Title</span>
                            <input value={this.state.pollName} onChange={this.updateName} required="required" className="addNew-name-input font-addNew-input-name" />
                        </div>
                        <Button variant="success" onClick={() => this.addQuestion()}>Add another question</Button>
                        <Button variant='danger' style={{"marginLeft": "30px"}} onClick={this.removeOption} disabled={this.state.questions.length===1} >Delete question!</Button> 
                        <Grid container alignItems="center" spacing={16} direction="row" justify="center" style={{ margin: "10px" }}>
                            {optionsToRender}
                        </Grid>
                        <input className='addNew-submit-collection font-addNew-addCollection-btn' type="submit" value="Add to database" />
                    </form>
                </div>
            </div>
        )
    }
}
export default NewVoteContainer