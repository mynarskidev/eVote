import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import InputVote from './InputVote'
import RaisedButton from 'material-ui/RaisedButton';
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
        languages:['',''],
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

    
    newLangsuage = (e, nmbr) => {
        let langs = this.state.languages;
        let txt = e.target.value;
        txt = txt.toLowerCase();
        txt = txt.charAt(0).toUpperCase() + txt.slice(1);
        langs[nmbr] = txt;
        this.setState({
            languages: langs
        })
    }
    
    handleFiles = files => {
        var reader = new FileReader();
        const other=this;
        reader.onload = function(e) {
            let lines = reader.result.split(/\r?\n/);
            let words = lines[1].split(",")

            let word, oddOnes=[], evenOnes=[], data=[];
            for(let i=2; i<lines.length-1; i++) {
                word = lines[i].split(",")
                for (let j=0; j<word.length; j++){
                    (j % 2 === 0 ? evenOnes : oddOnes).push(word[j])
                }
            }
            for (let i=0; i<evenOnes.length; i++){
                data.push([evenOnes[i], oddOnes[i]])
            }
            let VoteName = lines[0];
            let VoteLangs = [words[0],words[1]];
            let VoteIfLearned = false;
            let VoteArr = data;
            if (typeof VoteName !== 'undefined' && VoteName.length > 0) {
                let packedData = {};
                packedData.votesSetName = VoteName;
                packedData.username = localStorage.getItem('username');
                packedData.frontLanguage = VoteLangs[0];
                packedData.backLanguage = VoteLangs[1];
                packedData.ifLearned = VoteIfLearned;
                packedData.vote = []
                // eslint-disable-next-line
                VoteArr.map((Vote) => {
                    if(typeof Vote != 'undefined' && Vote[0].length > 0 && Vote[1].length > 0){
                        Vote.splice(2,1);
                        Vote[2] = shortid.generate();
                        packedData.vote.push(Vote);
                    }
                })
                if(packedData.vote.length > 0 ){
                    other.props.VotePack(packedData);
                    other.handleWin();
                }
            }
        }
        reader.readAsText(files[0]);
    }

    sendVote = (e) => {
        e.preventDefault();
        let VoteName = this.state.votesSetName;
        let VoteLangs = this.state.languages;
        let VoteIfLearned = this.state.ifLearned;
        VoteLangs[0] = VoteLangs[0].toLowerCase();
        VoteLangs[1] = VoteLangs[1].toLowerCase();
        VoteLangs[0] = VoteLangs[0].charAt(0).toUpperCase() + VoteLangs[0].slice(1);
        VoteLangs[1] = VoteLangs[1].charAt(0).toUpperCase() + VoteLangs[1].slice(1);
        let VoteArr = this.state.vote;
        if (typeof VoteName !== 'undefined' && VoteName.length > 0) {
            if(VoteLangs[0] !== VoteLangs[1]){
                let packedData = {};
                packedData.votesSetName = VoteName;
                packedData.username = localStorage.getItem('username');
                packedData.frontLanguage = VoteLangs[0];
                packedData.backLanguage = VoteLangs[1];
                packedData.ifLearned = VoteIfLearned;
                packedData.vote = []
                // eslint-disable-next-line
                VoteArr.map((Vote) => {
                    if(typeof Vote != 'undefined' && Vote[0].length > 0 && Vote[1].length > 0){
                        Vote.splice(2,1);
                        Vote[2] = shortid.generate();
                        packedData.vote.push(Vote);
                    }
                })
                if( packedData.vote.length > 0 ){
                    this.props.VotePack(packedData);
                    this.handleWin();
                }
            }else{
                document.getElementById('first-lang-input').focus();
            }  
        }  
    }
    
    render(){
        if(this.state.firstTime){
           for(let i = 0; i < 3; i++){
               let id = globalId
                inputs[id] = 
                    <div className='addNew-input-container' key={id}>
                    <InputVote  data={(e) => this.updateVote(e)} id={id} remove={(id) => this.removeInput(id)}/>
                    </div>
                globalId++;
            } 
        }
        let allInputsNumber = 0;
        for(let i = 0; i<inputs.length; i++ ){
            let element = inputs[i];
            if( element != null ) {
                allInputsNumber++;
            }
        }

        return (
            <div className="addNew-wrap" id='wrapp' style={this.state.wrapperHeight}>
                <div className="addNew-bckg" onClick={() => this.handleWin()} style={this.state.boxStyle_bckg}>
                </div>
                <div className="addNew-cont" id='addNew-box' style={this.state.boxStyle_cont}>
                    <form className='addNew-form' onSubmit={(e) => this.sendVote(e)}>
                        <div className='addNew-input-container'>
                            <span className='font-addNew-input-name-hdr'>Title</span>
                            <input value={this.state.votesSetName} onChange={this.updateName} required="required" className="addNew-name-input font-addNew-input-name" />
                        </div>

                        <div className="addNew-languagesInput-cont">
                            <span className='font-addNew-input-lang-hdr'>Languages</span>
                            <div className="addNew-langsInput-wrapper">
                                <input value={this.state.frontLanguage} className="addNew-lang-input font-addNew-input-lang" id='first-lang-input' required="required" onChange={(e) => this.newLangsuage(e, 0)} />
                                <input value={this.state.backLanguage} className="addNew-lang-input font-addNew-input-lang" required="required" onChange={(e) => this.newLangsuage(e, 1)} />
                            </div>
                        </div>

                        <div className='addNew-addNewBTN-container'>
                            <RaisedButton label={"Add another pair"} primary onClick={() => this.addInput()} />
                            <div className='addNew-amount-cont'>
                                <span className='font-addNew-amount'>Amount: </span>
                                <span className='font-addNew-amount-nmbr'>{allInputsNumber}</span>
                            </div>
                        </div>

                        <div className='addNew-inputs-col'>
                            <CSSTransitionGroup transitionName="a-AddNew-inputs" transitionEnterTimeout={350} transitionLeaveTimeout={250}>
                                {inputs}
                            </CSSTransitionGroup>
                        </div>
                        <input className='addNew-submit-collection font-addNew-addCollection-btn' type="submit" value="ADD COLLECTION" />
                    </form>
                    <div className="addNew-fromCsv">
                        <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                            <RaisedButton label={"Or Import from CSV"} primary />
                        </ReactFileReader>
                    </div>
                </div>
            </div>
        )
    }
}
export default NewVote