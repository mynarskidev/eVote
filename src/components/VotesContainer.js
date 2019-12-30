import React, { Component } from 'react';
import VoteBox from './VoteBox';

class VotesContainer extends Component {
    render() {
        const { VotesStore } = this.props;
        return (
            <div className="container">
                {
                    Object.keys(VotesStore).map((key, index) => {
                        return <VoteBox
                            key={key}
                            data={VotesStore[key]}
                            cardTitle={VotesStore[key].pollName}
                            textCard={VotesStore[key].pollQuestions} />;
                    })
                }
            </div>
        );
    }
}

export default VotesContainer;