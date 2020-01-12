import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import VotesContainer from './VotesContainer'
import { sendVotesSet, getAllVotesSetsSuccess, cleanScreen } from '../actions/VotesActions'
import history from '../helpers/History';
import { mockData } from '../mockData'
import NewVoteContainer from './NewVoteContainer';
// import axios from 'axios';//todo console.log


class HomeScreen extends Component {
    state = {
        votesData: {},
        didDataChanged: false,
        zeroFlag: true,
        addWindow: false
    }

    async componentDidMount() {
        const other = this;
        //TODO console.log
        //const apiBaseUrl = "http://localhost:8080";
        // axios.get(`${apiBaseUrl}/survey/all`, {headers: {'Authorization': localStorage.getItem('token')}}) //TODO console.log czy na pewno token w ten sposob???
        //       .then(function (response) {
            //           if (response.status === 200) {
                //            await other.props.getAllVotesSetsSuccess(response.data.votesSetList) //TODO console.log czy tak to sie bedzie nazywac???
                //            await this.setState({votesData: this.props.Votes})
                await other.props.getAllVotesSetsSuccess(mockData)
                await this.setState({votesData: this.props.Votes})
                //           }
                //       })
                //       .catch(error => {
                    //           alert("Something went wrong... Please login again.")
                    //         throw(error);
                    //       });
        if ((Object.entries(this.state.votesData).length !== 0 && this.state.votesData.constructor === Object)) {
            this.setState({
                zeroFlag: false
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.Votes !== prevProps.Votes) {
            this.setState({votesData: this.props.Votes})
        }
    }

    handleDataChange() {
        this.setState({
            didDataChanged: !this.state.didDataChanged
        })
    }

    sendVotesSetAction = (data) => {
        this.props.sendVotesSet(data);
    }

    openAddWindow = () => {
        this.setState({
            addWindow: !this.state.addWindow
        })
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('auth');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        // const other=this;
        // let apiBaseUrl = "http://localhost:8080";
        // axios.delete(apiBaseUrl + '/login') // todo console.log czy na pewno login? 
        // .then(function (response) {
            //         if (response.status === 200) {
                //                 other.props.cleanScreen()
                //                 history.push('/');
                                    history.push('/');//TODO console.log usun
                //             }
                //         })
                // .catch(function (error) {
                    //     //alert("Something wrong happened. Please contact support.")
                    // });
    }

    render() {
        const { addWindow, zeroFlag, votesData } = this.state;

        return (
            <MuiThemeProvider>
                <div className="HomeScreen">
                    <AppBar className="homescreen-topGrid" style={{ background: "green" }} showMenuIconButton={false} title="e-Vote App">
                        <Button variant="dark" style={{ marginRight: "10px" }} onClick={() => this.openAddWindow()}>Add New</Button>
                        <Button variant="dark" onClick={() => this.logout()}>Log Out</Button>
                    </AppBar>
                    {
                        zeroFlag ? <div className='emptyContainer'>
                            <span className='font-no-votes'>You do not have anything to vote :(</span>
                            <img className='noVotes-image' src='img/noVotes.png' alt="NO POLLS AVAILABLE" />
                        </div> : <VotesContainer onDataChange={() => this.handleDataChange()} VotesStore={votesData} />
                    }
                    {
                        addWindow ? <NewVoteContainer VotePack={(data) => this.sendVotesSetAction(data)} openWindow={this.openAddWindow} /> : null
                    }
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = state => {
    return {
        Votes: state.Votes
    }
}

const mapDispatchToProps = { sendVotesSet, getAllVotesSetsSuccess, cleanScreen }

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);