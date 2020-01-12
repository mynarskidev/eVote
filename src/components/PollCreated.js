import React, { Component } from 'react'
import Poll from 'react-polls'
import { Grid } from '@material-ui/core'

const pollStyles = {
  questionSeparator: true,
  questionSeparatorWidth: 'question',
  questionBold: true,
  questionColor: '#90ee90',
  align: 'center',
  theme: 'green',
  width:"100%"
}

class PollCreated extends Component {
  state = {
    pollAnswers: this.props.data.pollAnswers,
    pollQuestions: this.props.data.pollQuestions,
    pollName: this.props.data.pollName,
    howManyAnswers: 0
  }

  handleVote = (voteAnswer, pollAnswers, pollNumber) => {
    const newPollAnswers = pollAnswers.map(answer => {
      if (answer.option === voteAnswer) answer.votes++
      return answer
    })

    let newChangedAnswers = this.state.pollAnswers;
    newChangedAnswers[pollNumber] = newPollAnswers

    let answersCount = this.state.howManyAnswers;
    answersCount++;

    this.props.onAnswersCount(answersCount)

    let answersObject = {}
    answersObject.pollName= this.state.pollName;
    answersObject.pollQuestions= this.state.pollQuestions;
    answersObject.pollAnswers= newChangedAnswers;
    this.props.onSaveClose(answersObject)

    this.setState({ pollAnswers: newChangedAnswers, howManyAnswers: answersCount });
  }

  render() {
    const { pollAnswers, pollQuestions } = this.state
    return (
      <Grid container alignItems="center" spacing={16} direction="row" justify="center" style={{ margin: "10px" }}>
        {pollAnswers.map((answer, index) => {
          return <div className='pollcreated' key={index}>
            <main className='main'>
              <Grid item>
                <Poll question={pollQuestions[index]} answers={answer} onVote={voteAnswer => this.handleVote(voteAnswer, answer, index)} customStyles={pollStyles} noStorage />
              </Grid>
            </main>
          </div>
        })}
      </Grid>
    )
  }
}

export default PollCreated;