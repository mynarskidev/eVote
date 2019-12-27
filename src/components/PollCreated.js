import React, { Component } from 'react'
import Poll from 'react-polls'

const pollQuestion1 = 'Do you like me?'
const pollAnswers1 = [
  { option: 'Yes', votes: 10 },
  { option: 'No', votes: 1 },
]
const pollStyles1 = {
  questionSeparator: true,
  questionSeparatorWidth: 'question',
  questionBold: true ,
  questionColor: '#90ee90',
  align: 'center',
  theme: 'green'
}


// const pollQuestion2 = 'What framework do you prefer?' //TODO
// const pollAnswers2 = [
//   { option: 'React', votes: 5 },
//   { option: 'Vue', votes: 2 },
//   { option: 'Angular', votes: 1 }
// ]
// const pollStyles2 = {
//   questionSeparator: false,
//   questionSeparatorWidth: 'question',
//   questionBold: false ,
//   questionColor: '#4F70D6',
//   align: 'center',
//   theme: 'blue'
// }


export default class PollCreated extends Component {
  state = {
    pollAnswers1: [...pollAnswers1],
    // pollAnswers2: [...pollAnswers2]//TODO
  }

  handleVote = (voteAnswer, pollAnswers, pollNumber) => {
    const newPollAnswers = pollAnswers.map(answer => {
      if (answer.option === voteAnswer) answer.votes++
      return answer
    })

    if (pollNumber === 1) {
      this.setState({
        pollAnswers1: newPollAnswers
      })
    // } else {//TODO
    //   this.setState({
    //     pollAnswers2: newPollAnswers
    //   })
    }
  }

  componentDidMount() {
    const { pollAnswers1, pollAnswers2 } = this.state
  }


  render () {
    const { pollAnswers1, pollAnswers2 } = this.state

    return (
      <div className='pollcreated'>
        <header className='header'>
          <h1 className='name'>My Polls</h1>
        </header>
        <main className='main'>
          <div>
            <Poll question={pollQuestion1} answers={pollAnswers1} onVote={voteAnswer => this.handleVote(voteAnswer, pollAnswers1, 1)} customStyles={pollStyles1} noStorage />
          </div>
          {/* <div>
            <Poll question={pollQuestion2} answers={pollAnswers2} onVote={voteAnswer => this.handleVote(voteAnswer, pollAnswers2, 2)} customStyles={pollStyles2} noStorage />
          </div> //TODO*/}
        </main>
      </div>
    )
  }
}