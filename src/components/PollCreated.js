import React, { Component, Fragment } from 'react'
import Poll from 'react-polls'
import Button from 'react-bootstrap/Button'
import { toggleCardFunction } from '../actions/VotesActions'
import { connect } from 'react-redux'

const pollStyles = {
  questionSeparator: true,
  questionSeparatorWidth: 'question',
  questionBold: true,
  questionColor: '#90ee90',
  align: 'center',
  theme: 'green'
}

class PollCreated extends Component {
  state = {
    pollAnswers: this.props.data.pollAnswers,
    pollQuestions: this.props.data.pollQuestions
  }

  handleVote = (voteAnswer, pollAnswers, pollNumber) => {
    const newPollAnswers = pollAnswers.map(answer => {
      if (answer.option === voteAnswer) answer.votes++
      return answer
    })

    let newChangedAnswers = this.state.pollAnswers;
    newChangedAnswers[pollNumber] = newPollAnswers

    this.setState({ pollAnswers: newChangedAnswers });
  }

  componentDidMount() {
    const { pollAnswers } = this.state
  }

  render() {
    const { pollAnswers, pollQuestions } = this.state
    console.log(this.props.toggleCard)

    return (
      <Fragment>
        <Button variant="success" onClick={() => { this.props.toggleCardFunction(false) }}>Return</Button>
        <div className='pollcreated'>
          <header className='header'>
            <h1 className='name'>{this.props.data.pollName}</h1>
          </header>
          <main className='main'>
            {
              pollAnswers.map((answer, index) => {
                return <div key={index}>
                  <Poll question={pollQuestions[index]} answers={answer} onVote={voteAnswer => this.handleVote(voteAnswer, answer, index)} customStyles={pollStyles} noStorage />
                </div>
              })
            }
          </main>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const { toggleCard } = state
  return {
    toggleCard: toggleCard
  }
}

const mapDispatchToProps = { toggleCardFunction }

export default connect(mapStateToProps, mapDispatchToProps)(PollCreated);