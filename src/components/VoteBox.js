import React, { Component } from 'react';
import { CSVLink } from "react-csv";


class VoteBox extends Component {
    state={
        csvData:[],
        style:{
            'opacity': 0,
            'width': '0px',
            'overflow': 'hidden',
            'whiteSpace' : 'nowrap'
        }
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({
                style : {
                    'opacity' : 1,
                    'width' : '340px',
                    'overflow': 'hidden',
                    'whiteSpace' : 'nowrap'
                }
            })
        }, 5)
    }

    editWrapper = () => {
        this.props.editWrapper(this.props.Voteka);
    }

    removeWrapper = () => {
        this.props.removeWrapper(this.props.Voteka.votesSetId, this.props.Voteka.votesSetName);
    }

    downloadCsv = () => {
        const { Voteka } = this.props;
        let dataVote = Voteka.vote;
        let innerCsvData =[];
        innerCsvData.push([Voteka.votesSetName]);
        innerCsvData.push([[Voteka.backLanguage+','+Voteka.frontLanguage]]);
    
        for (let i=0; i<dataVote.length; i++){
            innerCsvData.push([dataVote[i][0]+','+dataVote[i][1]])
        }
        this.setState({
            csvData: innerCsvData
        })
    }

    playVote = (data) => {
        this.props.playVote(data);
    }
    
  render() {
    const { Voteka } = this.props;

    return (
      <div className="Vote-box" style={this.state.style}>
        {Voteka.ifLearned ? <div><img className='VoteBox-topBar-icon' src="img/alreadyLearned.png" alt="Already-Learned"/><div className='font-VoteBox-ifLearned'>You learned this collection</div><hr/></div> : null}
        <div className='VoteBox-txtWrapper'>
            <span className='font-VoteWrapper-main'>{Voteka.votesSetName}</span>
            <div className='VoteBox-info-col'>
                <span className='font-VoteBox-infoHdr'>Languages: </span>
                <span className='font-VoteBox-infoInfo'>{Voteka.frontLanguage} - {Voteka.backLanguage}</span>
            </div>
        </div>
        <div className='VoteBox-bottomBar'>
            <div className='VoteBox-bottomBar-brick bckgColor-red' onClick={this.removeWrapper}>
                <img className='VoteBox-bottomBar-icon' src='img/garbage.png' alt="Delete"/>
            </div>
            <div className='VoteBox-bottomBar-brick bckgColor-blue' onClick={this.editWrapper}>
                <img className='VoteBox-bottomBar-icon' src='img/edit.png' alt="Edit"/>
            </div>
            <div className='VoteBox-bottomBar-brick bckgColor-yellow' onClick={this.downloadCsv}>
                <CSVLink data={this.state.csvData} filename={"Exported_"+Voteka.votesSetName+".csv"}>
                    <img className='VoteBox-bottomBar-icon' src='img/csv.png' alt="Get"/>
                </CSVLink>
            </div>
            <div className='VoteBox-bottomBar-brick bckgColor-green' onClick={() => this.playVote(Voteka)}>
                <img className='VoteBox-bottomBar-icon' src='img/play.png' alt="Play"/>
            </div>
        </div>
      </div>
    );
  }
}

export default VoteBox;