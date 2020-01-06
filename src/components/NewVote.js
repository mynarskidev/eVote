import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import InputVote from './InputVote'
import RaisedButton from 'material-ui/RaisedButton';
import Button from 'react-bootstrap/Button';
import { Grid } from '@material-ui/core'

import ReactFileReader from 'react-file-reader';


let shortid = require('shortid');
let globalId = 0;
let inputs = [];

class NewVote extends Component {
    state = {
        votesSetName:'',
        firstTime:true,
        isMounted:false,
        ifLearned:false,
        wrapperHeight : {
            'height' : '100%'
        },
        vote : [],
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
            firstTime: false,
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
        inputs = [];
        this.setState({
            isMounted: false,
        })
        document.removeEventListener('keydown',this.exitWindow, false)
    }
    
    updateVote = (data) => {
        if(this.state.isMounted){
            let state = this.state.vote;
            let id = data[2]
            state[id] = data;
            this.setState({
                vote: state
            })
        }
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

    addInput = () => {
        let id = globalId
        inputs[id] = (<div className='addNew-input-container' key={id}>
                        <InputVote  data={(e) => this.updateVote(e)} id={id} remove={(id) => this.removeInput(id)}/>
                      </div>)
        globalId++;
        setTimeout(() => {  
            let wrapH = document.getElementById('wrapp').clientHeight;
            let docH = document.height;
            let boxH = document.getElementById('addNew-box').clientHeight + 100;
            if( (boxH + 34) > docH){
                this.setState({
                    wrapperHeight: {
                        'height' : wrapH + 34 + 'px'
                    }    
                })    
            }    
        }, 200)

        this.forceUpdate();
    }

    removeInput = (id) => {
        let update = this.state.vote;
        update[id] = undefined;
        this.setState({
            vote: update
        })
        inputs[id] = null;
            let wrapH = document.getElementById('wrapp').clientHeight;
            let docH = document.height;
            let boxH = document.getElementById('addNew-box').clientHeight + 100;
            if ((boxH - 34) > docH) {
                setTimeout(() => {
                    this.setState({
                        wrapperHeight: {
                            'height': wrapH - 34 + 'px'
                        }
                    })
                }, 200)
            } else {
                setTimeout(() => {
                    this.setState({
                        wrapperHeight: {
                            'height': docH + 'px'
                        }
                    })
                }, 200)
            }
    }

    updateName = (e) => {
        let val = e.target.value;
        this.setState({
            votesSetName: val
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

    newQuestion = (e, nmbr) => {
        let quest = this.state.questions;
        let txt = e.target.value;
        txt = txt.toLowerCase();
        txt = txt.charAt(0).toUpperCase() + txt.slice(1);
        quest[nmbr] = txt;
        this.setState({
            questions: quest
        })
    }

    sendNewPoll = (e) => {
        e.preventDefault();
        let VoteName = this.state.votesSetName;
        let VoteQuest = this.state.questions;
        let VoteIfLearned = this.state.ifLearned;//TODO zmien na ifVoted
        VoteQuest[0] = VoteQuest[0].toLowerCase();
        VoteQuest[0] = VoteQuest[0].charAt(0).toUpperCase() + VoteQuest[0].slice(1);
        let VoteArr = this.state.vote;
        if (typeof VoteName !== 'undefined' && VoteName.length > 0) {
            let packedData = {};
            packedData.votesSetName = VoteName;
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
        if(this.state.firstTime){
           for(let i = 0; i < 3; i++){
               let id = globalId
                inputs[id] = 
                    <div className='addNew-input-container' key={id}>
                        <InputVote data={(e) => this.updateVote(e)} id={id} remove={(id) => this.removeInput(id)}/>
                    </div>
                globalId++;
            } 
        }
        let optionsToRender = [];
        let globalOptionsId = 0;
        for (var i = 0; i < this.state.questions.length; i++) {
            let id = globalOptionsId;
            optionsToRender[id] =
                <Grid item key={id}  style={{ boxShadow: "0px 0px 7px 0px rgba(0,0,0,0.2)", margin: "10px",  marginRight: "15px" }}>
                    <div className="addNew-questionsInput-cont">
                        <span className='font-addNew-input-quest-hdr'>Question</span>
                        <div className="addNew-questInput-wrapper">
                            <input className="addNew-question-input font-addNew-input-quest" required="required" onChange={(e) => this.newQuestion(e, 0)} />
                        </div>
                    </div>

                    <div className='addNew-addNewBTN-container'>
                        <Button variant="success" onClick={() => this.addInput()}>Add another answer</Button>
                    </div>

                    <div className='addNew-inputs-col'>
                        <CSSTransitionGroup transitionName="a-AddNew-inputs" transitionEnterTimeout={350} transitionLeaveTimeout={250}>
                            {inputs}
                            {/* TODO Tu bedzie ten inputs do przerobienia w ch.. */}
                        </CSSTransitionGroup>
                    </div>
                </Grid>
            globalOptionsId++
        }

        return (
            <div className="addNew-wrap" id='wrapp' style={this.state.wrapperHeight}>
                <div className="addNew-bckg" onClick={() => this.handleWin()} style={this.state.boxStyle_bckg}>
                </div>
                <div className="addNew-cont" id='addNew-box' style={this.state.boxStyle_cont}>
                    <form className='addNew-form' onSubmit={(e) => this.sendNewPoll(e)}>
                        <div className='addNew-input-container'>
                            <span className='font-addNew-input-name-hdr'>Poll Title</span>
                            <input value={this.state.votesSetName} onChange={this.updateName} required="required" className="addNew-name-input font-addNew-input-name" />
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
export default NewVote