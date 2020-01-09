import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Grid } from '@material-ui/core'
import NewVote from './NewVote';
import { arrayOf } from 'prop-types';
import { mockAnswers } from '../mockData'

let shortid = require('shortid');
class NewVoteContainer extends Component {
    state = {
        pollName:'',
        ifLearned:false,
        wrapperHeight : {
            'height' : '100%'
        },
        answers: mockAnswers, //TODO dlaczego to na to wplywa???
        arrayOfObjectsState: [],
        stateVariable: [],
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
        console.log("sdfsdfsdf")
        this.setState({
            isMounted: true,
            answers: [ [{},{},{},{},{},{},{},{},{},{},], [{},{},{},{},{},{},{},{},{},{},], [{},{},{},{},{},{},{},{},{},{},], [{},{},{},{},{},{},{},{},{},{},], [{},{},{},{},{},{},{},{},{},{},], [{},{},{},{},{},{},{},{},{},{},], [{},{},{},{},{},{},{},{},{},{},], [{},{},{},{},{},{},{},{},{},{},], [{},{},{},{},{},{},{},{},{},{},], [{},{},{},{},{},{},{},{},{},{},],]
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

    handleWin = async () => {
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
        await this.setState({
            answers: mockAnswers
        })
        this.forceUpdate();
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

    handleQuestionChange = (newQuestion) => {      
        let array = this.state.questions;
        var index = Number(Object.keys(newQuestion));
        array[index] = Object.values(newQuestion).toString();
        this.setState({
            questions: array
        })
        this.forceUpdate();
    }

    handleAnswerChange = async (answer) => { //TODO albo tutaj albo w newvote
        let pollAnswers = this.state.answers;
        let pollAnswersIndex = answer[1];
        let indexOfInputs = answer[2]
        let objectToSwitch = {option: answer[0], votes: 0}
        pollAnswers.forEach(function (insideArray, indexOfInsideArray) {
            if(indexOfInsideArray === pollAnswersIndex){
                insideArray.forEach(function (item, index) {
                    if(index === indexOfInputs){
                        this[indexOfInputs] = objectToSwitch;
                    }
                }, insideArray);
            }
        });
        await this.setState({
            answers: pollAnswers
        })
    }

    addQuestionCard = async () => {
        let val = this.state.questions
        val.push('')
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

    sendNewPoll = (e) => {//TODO dzisiaj
        //TODO close okno on click!!!!!!!!! i nie mozna dodawac wiecej niz 10 pytan i 10 odpowiedzi!!!
        let stateAnswers = this.state.answers;
        console.log(this.state.answers)
        var filtered = stateAnswers.filter(el => (el.filter(value => Object.keys(value).length !== 0)).length !== 0);
        filtered.forEach(function (insideArray, indexOfInsideArray) {
            insideArray.forEach(function (item, index) {
                if(Object.keys(item).length === 0 && item.constructor === Object){
                    insideArray.splice(index, 10);
                }
            })
        });
        console.log(filtered)
        e.preventDefault();
        let VoteName = this.state.pollName;
        let VoteQuest = this.state.questions;
        ///TO  co powyzej to dziala
        let VoteArr = filtered

        // let VoteIfLearned = this.state.ifLearned;//TODO zmien na ifVoted
        if (typeof VoteName !== 'undefined' && VoteName.length > 0) {
            let packedData = {};
            packedData.pollName = VoteName;
            packedData.username = localStorage.getItem('username');
            packedData.question = VoteQuest;
            // packedData.ifLearned = VoteIfLearned;
            packedData.answers = []
            // eslint-disable-next-line
            VoteArr.map((Vote) => {
                if(typeof Vote != 'undefined' && Vote[0].length > 0){
                    Vote.splice(2,1);
                    // Vote[2] = shortid.generate();//TODO tak, ale daj do poll? a nie do opcji?
                    packedData.answers.push(Vote);
                }
            })
            if( packedData.answers.length > 0 ){
                console.log("nie wchodze co?")
                this.props.VotePack(packedData);
                this.handleWin();
            }
        }
        this.setState({
            answers: mockAnswers
        })
    }
    
    render(){   
        let optionsToRender = [];
        let obj = this.state.questions;
        var other = this
        Object.keys(obj).forEach(function(key) {
            optionsToRender[key] = <NewVote key={key} id={key} onQuestionChange={(question) => other.handleQuestionChange(question)} onAnswerChange={(ans) => other.handleAnswerChange(ans)} />
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
                        <Button variant="success" onClick={() => this.addQuestionCard()}>Add another question</Button>
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