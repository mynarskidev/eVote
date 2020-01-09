import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import InputVote from './InputVote'
import Button from 'react-bootstrap/Button';
import { Grid } from '@material-ui/core'


class NewVote extends Component {
    state = {
        firstTime: true,
        isMounted: false,
        ifLearned: false,
        inputs: [],
        questionObject: {},
        globalId: 0,
        wrapperHeight: {
            'height': '100%'
        },
        vote: [],
        answersArray: [],
        boxStyle_bckg: {
            'opacity': 0
        },
        boxStyle_cont: {
            'opacity': 0,
            'transform': 'translateY(-80px)'
        }
    }

    componentDidMount() {
        this.setState({
            firstTime: false,
            isMounted: true,
        })
        setTimeout(() => {
            this.setState({
                boxStyle_bckg: {
                    'opacity': 1
                },
                boxStyle_cont: {
                    'opacity': 1,
                    'transform': 'translateY(0px)'
                }
            })
        }, 5);
        document.addEventListener('keydown', this.exitWindow, false)
    }

    componentWillUnmount() {
        this.setState({
            isMounted: false,
            inputs: [],
            globalId: 0
        })
        document.removeEventListener('keydown', this.exitWindow, false)
    }

    newQuestion = (e, nmbr) => {
        let quest = this.state.questionObject;
        let txt = e.target.value;
        txt = txt.toLowerCase();
        txt = txt.charAt(0).toUpperCase() + txt.slice(1);
        quest[nmbr] = txt;
        this.setState({
            questionObject: quest
        })
        this.props.onQuestionChange(quest)
    }

    updateVote = (data) => {
        if (this.state.isMounted) {
            let state = this.state.vote;
            let id = data[2]
            state[id] = data;
            this.setState({
                vote: state
            })
            this.props.onAnswerChange(data)
        }
    }

    addInput = (key) => {
        let id = this.state.globalId
        let newInputs = this.state.inputs;
        newInputs[id] = (<div className='addNew-input-container' key={id}>
            <InputVote length={this.state.inputs.length} data={(e) => this.updateVote(e)} id={id} questionId={Number(this.props.id)} remove={(id) => this.removeInput(id)} />
        </div>)
        id++;
        this.setState({
            inputs: newInputs,
            globalId: id
        })
        setTimeout(() => {
            let wrapH = document.getElementById('wrapp').clientHeight;
            let docH = document.height;
            let boxH = document.getElementById('addNew-box').clientHeight + 100;
            if ((boxH + 34) > docH) {
                this.setState({
                    wrapperHeight: {
                        'height': wrapH + 34 + 'px'
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
        var newInputs = this.state.inputs;
        var removeIndex = newInputs.map(function(item) { return item.id; }).indexOf(id);
        newInputs.splice(removeIndex, 1);

        this.setState({
            inputs: newInputs
        })
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

    render() {
        if (this.state.firstTime) {
            let newInputs = this.state.inputs;
            let id = this.state.globalId
            for (let i = 0; i < 2; i++) {
                newInputs[id] = (<div className='addNew-input-container' key={id}>
                    <InputVote length={this.state.inputs.length} data={(e) => this.updateVote(e)} id={id} questionId={Number(this.props.id)} remove={(id) => this.removeInput(id)} />
                </div>)
                id++;
            }
            this.setState({
                inputs: newInputs,
                globalId: id
            })
        }

        return (
            <Grid key={this.props.id} item style={{ boxShadow: "0px 0px 7px 0px rgba(0,0,0,0.2)", margin: "10px", marginRight: "15px" }}>
                <div className="addNew-questionsInput-cont">
                    <span className='font-addNew-input-quest-hdr'>Question</span>
                    <div className="addNew-questInput-wrapper">
                        <input className="addNew-question-input font-addNew-input-quest" required="required" onChange={(e) => this.newQuestion(e, this.props.id)} />
                    </div>
                </div>

                <div className='addNew-addNewBTN-container'>
                    <Button variant="success" onClick={() => this.addInput()} disabled={this.state.inputs.length === 10 || this.state.inputs.length>10}>Add another answer</Button>
                </div>

                <div className='addNew-inputs-col'>
                    <CSSTransitionGroup transitionName="a-AddNew-inputs" transitionEnterTimeout={350} transitionLeaveTimeout={250}>
                        {this.state.inputs}
                    </CSSTransitionGroup>
                </div>
            </Grid>
        )
    }
}
export default NewVote