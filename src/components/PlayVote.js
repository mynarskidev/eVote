import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux'
import { editIfLearnedVoteSet } from '../actions/VotesActions'


class PlayVote extends Component {
    state = {
        VoteToGo : [],
        VoteDone: [],
        actualVote : [],
        congrats : ['Congratulations!', 'You\'ve done it!', 'Great job!'],
        VoteShowed: false,
        isPlaying: false,
        firstTime: true,
        isGameFinished: false,
        goodAnswer: 0,
        wrongAnswer: 0,
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
            VoteToGo: this.props.Voteka.vote
        })
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
            })
        }, 5)
    }

    componentWillUnmount(){
        const { Voteka } = this.props;
        const { goodAnswer, wrongAnswer } = this.state;
        let amount = Voteka.vote.length;
        if ((goodAnswer === amount || goodAnswer === amount-1) && wrongAnswer === 0){
            this.props.editIfLearnedVoteSet(true, Voteka.votesSetId);
        }else this.props.editIfLearnedVoteSet(false, Voteka.votesSetId);

        document.removeEventListener('keydown',this.exitWindow, false)
        this.setState({
            VoteToGo : [],
            VoteDone: [],
            actualVote : [],
            VoteShowed: false,
            isPlaying: false,
            goodAnswer: 0,
            wrongAnswer: 0
        })
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
            this.props.openWindowFun();
        }, 5);
    }

    exitWindow = (e) => {
        if ( e.keyCode === 27 ) {
            this.openWindow();
        }
    }

    randomVote = () => {
        let VotesArr = this.state.VoteToGo;
        let VoteArrLength = VotesArr.length;
        let randID = Math.floor(Math.random() * VoteArrLength);
        this.setState({
            actualVote: VotesArr[randID]
        })
    }
    
    playIt = () => {
        this.randomVote();
        this.setState({
            isPlaying: !this.state.isPlaying
        })
    }

    showVote = () => {
        this.setState({
            VoteShowed: !this.state.VoteShowed
        })
    }

    knewIt = () => {
        let actual = this.state.actualVote;
        let VoteToGo = this.state.VoteToGo;
        let VoteDone = this.state.VoteDone;
        // eslint-disable-next-line
        VoteToGo = VoteToGo.filter((Vote) => {
            if(Vote[0] !== actual[0] && Vote[1] !== actual[1]){
                return Vote
            }
        })
        VoteDone.push(actual);
        this.setState({
            goodAnswer: this.state.goodAnswer + 1,
            actualVote: [],
            VoteToGo: VoteToGo,
            VoteDone: VoteDone,
            VoteShowed: false,
            firstTime: false
        })
        let VoteArrLength = VoteToGo.length;
        if(VoteArrLength > 0){
            let randID = Math.floor(Math.random() * VoteArrLength);
            this.setState({
                actualVote: VoteToGo[randID]
            })    
        }else{
            this.setState({
                isGameFinished: true
            })
        }
    }

    didntKnowIt = () => {
        this.setState({
            wrongAnswer: this.state.wrongAnswer + 1,
            actualVote: [],
            VoteShowed: false,
            firstTime: false
        })
        this.randomVote();
    }

    playAgain = () => {
        this.setState({
            VoteToGo : this.props.Voteka.vote,
            VoteDone: [],
            actualVote : [],
            VoteShowed: false,
            isPlaying: false,
            firstTime: true,
            isGameFinished: false,
            goodAnswer: 0,
            wrongAnswer: 0,
        })
    }

    render() {
        const { Voteka } = this.props;
        const { congrats, boxStyle_bckg, boxStyle_cont, isPlaying, isGameFinished, goodAnswer, wrongAnswer, VoteShowed, actualVote } = this.state;
        let amount = Voteka.vote.length;

        return (
            <div className="playVote-wrapper">
                <div style={boxStyle_bckg} className="playVote-bkcg" onClick={() => { this.openWindow() }}></div>
                <div className='playVote-container' style={boxStyle_cont}>
                    {isPlaying ?
                        (isGameFinished ?
                               <GameFinished Voteka={Voteka} congrats={congrats} goodAnswer={goodAnswer} wrongAnswer={wrongAnswer} playAgain={() => this.playAgain()}/>
                            : <GameNotFinished Voteka={Voteka} VoteShowed={VoteShowed} actualVote={actualVote} goodAnswer={goodAnswer} wrongAnswer={wrongAnswer} showVote={() => this.showVote()} knewIt={() => this.knewIt()} didntKnowIt={() => this.didntKnowIt()}/>)
                        : <StartScreenPlay Voteka={Voteka} amount={amount} playIt={() => this.playIt()} />
                    }
                </div>
            </div>
        );
    }
}

const GameNotFinished = (props) => {
    const {Voteka, goodAnswer, wrongAnswer, showVote, VoteShowed, actualVote, knewIt, didntKnowIt} = props

    return (
        <div>
            <div className='playVote-top-wrapper'>
                <div className='playVote-top-name'>
                    <span className='font-playVote-title'>{Voteka.votesSetName}</span>
                </div>
                <div className='playVote-top-stats'>
                    <div className='playVote-top-stats-bar-wrapper first-stat-bar'>
                        <span className='font-playVote-stat'>GOOD</span>
                        <div className='playVote-top-stats-count-bar-wrapper'>
                            <div className='playVote-top-stats-count-bar-nmbr'>
                                <span className='font-playVote-stat-nmbr'>{goodAnswer}</span>
                            </div>
                        </div>
                    </div>
                    <div className='playVote-top-stats-bar-wrapper'>
                        <span className='font-playVote-stat'>WRONG</span>
                        <div className='playVote-top-stats-count-bar-wrapper'>
                            <div className='playVote-top-stats-count-bar-nmbr'>
                                <span className='font-playVote-stat-nmbr'>{wrongAnswer}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='playVote-words-container'>
                <div className='playVote-word-firstWord'>
                    <span className='font-playVote-Vote'>{actualVote[0]}</span>
                </div>
                {VoteShowed ?
                    <div>
                        <div className='playVote-secondWord'>
                            <span className='font-playVote-Vote'>{actualVote[1]}</span>
                        </div>
                        <div>
                            <div className='playVote-start-amount-wrapper'>
                                <div className='playVote-start-amount-line'></div>
                                <div className='playVote-start-amount-txt-wrap'>
                                    <span className='font-playVote-letsStart-amount'>Did you knew the answer?</span>
                                </div>
                                <div className='playVote-start-amount-line'></div>
                            </div>
                        </div>
                        <div className='playVote-check-btns-wrapper'>
                            <div className='playVote-btn btn-color-green playVote-checkBtn' onClick={knewIt}>
                                <span className='font-playVote-btn'>YES</span>
                            </div>
                            <div className='playVote-btn btn-color-red playVote-checkBtn' onClick={didntKnowIt}>
                                <span className='font-playVote-btn'>NO</span>
                            </div>
                        </div>
                    </div>
                    : <div>
                        <br />
                        <RaisedButton label={"Show me"} primary onClick={showVote} />
                    </div>
                }
            </div>
        </div>
    );
}
 


const GameFinished = (props) => {
    const {Voteka, congrats, goodAnswer, wrongAnswer, playAgain} = props
    return (
        <div className='playVote-finished-container'>
            <div className='playVote-finished-nameCont'>
                <span className='font-playVote-title'>{Voteka.votesSetName}</span>
            </div>
            <div className='playVote-finished-congrats'>
                <span className='font-playVote-congrats'>{congrats[Math.floor(Math.random() * congrats.length)]}</span>
            </div>
            <div className='playVote-finished-stats-wrapper'>
                <span className='font-playVote-stat'>GOOD</span>
                <div className='playVote-finished-stats'>
                    <div className='playVote-finished-stat-bar-cont'>
                        <div className='playVote-finished-stat-bar count-bar-green'></div>
                        <div className='playVote-finish-stats-nmbr'>
                            <span className='font-playVote-over-stat-nmbr'>{goodAnswer}</span>
                        </div>
                    </div>
                    <div className='playVote-finished-stat-bar-cont'>
                        <div className='playVote-finished-stat-bar count-bar-red'></div>
                        <div className='playVote-finish-stats-nmbr stats-nmbr-right'>
                            <span className='font-playVote-over-stat-nmbr'>{wrongAnswer}</span>
                        </div>
                    </div>
                </div>
                <span className='font-playVote-stat'>WRONG</span>
            </div>
            <div className='playVote-againBtn'>
                <RaisedButton label={"Try again"} primary onClick={playAgain} />
            </div>
        </div>
    );
}

const StartScreenPlay = (props) => {
    const {Voteka, amount, playIt} = props
    return (
        <div className='playVote-start'>
            <span className='font-playVote-letsStart'>Lets learn <b className='font-playVote-letsStart-bold'>{Voteka.votesSetName}</b></span>
            <div className='playVote-start-amount-wrapper'>
                <div className='playVote-start-amount-line'></div>
                <div className='playVote-start-amount-txt-wrap'>
                    <span className='font-playVote-letsStart-amount'>Amount: </span>
                    <span className='font-playVote-letsStart-amount-nmbr'> {amount}</span>
                </div>
                <div className='playVote-start-amount-line'></div>
            </div>
            <RaisedButton label={"Start"} primary onClick={playIt} />
        </div>
    );
}

const mapStateToProps = state => {
    return {
        Votes: state.Votes
    }
}

const mapDispatchToProps = { editIfLearnedVoteSet }

export default connect(mapStateToProps, mapDispatchToProps)(PlayVote);