import React, { Component } from 'react';
import { Grid } from '@material-ui/core'
import VoteBox from './VoteBox';

class VotesContainer extends Component {
  render() {
    const { VotesStore } = this.props;

    return (
      <Grid container alignItems="center" spacing={16} direction="row" justify="flex-start" style={{marginTop: "20px", paddingLeft: "20px", paddingRight: "5px", width:"100%"}}>
        {Object.keys(VotesStore).map((key, index) => {
          // console.log(VotesStore[key].pollQuestions)
          // console.log(typeof(VotesStore[key].pollQuestions))
          return <Grid item key={key}>
            <VoteBox
              key={key}
              data={VotesStore[key]}
              cardTitle={VotesStore[key].pollName}
              textCard={VotesStore[key].pollQuestions} />
          </Grid>
        })}
      </Grid>
    );
  }
}

export default VotesContainer;