import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import NewVote from './NewVote' //TODO
import VotesContainer from './VotesContainer'
import { sendVotesSet, getAllVotesSetsSuccess, cleanScreen } from '../actions/VotesActions'
import history from '../helpers/History';
import { mockData } from '../mockData'
// import axios from 'axios';
// import EditVote from './EditVote'
// import RemoveVoteWrapper from './RemoveVoteWrapper'


class HomeScreen extends Component {
    state = {
        zeroFlag: true,
        addWindow: false,
        editWindow: false,
        removePopUp: false,
        dataForRemovePopUp: [],
        lang: '-',
    }

    componentDidMount() {
        const other = this;
        const apiBaseUrl = "http://localhost:8081/api";

        if ((Object.entries(mockData).length !== 0 && mockData.constructor === Object)) {
            this.setState({
                zeroFlag: false
            })
        }

        // axios.get(`${apiBaseUrl}/votesSet/user/`+ localStorage.getItem('username')) //TODO
        //       .then(function (response) {
        //           if (response.status === 200) {
        //             other.props.getAllVotesSetsSuccess(response.data.votesSetList)
        //           }
        //       })
        //       .catch(error => {
        //           alert("Something went wrong...")
        //         throw(error);
        //       });
    }

    sendVotesSetAction = (data) => {
        this.props.sendVotesSet(data);
    }

    openAddWindow = () => {
        this.setState({
            addWindow: !this.state.addWindow
        })
    }

    openEditWindow = (data) => {
        this.setState({
            editWindow: !this.state.editWindow,
            editWindowData: data
        })
    }

    logout = () => {
        // const other=this;//TODO
        // localStorage.removeItem('token');
        // localStorage.removeItem('auth');
        // localStorage.removeItem('username');
        // let apiBaseUrl = "http://localhost:8081/api";
        // axios.delete(apiBaseUrl + '/session')
        // .then(function (response) {
        //         if (response.status === 200) {
        //                 other.props.cleanScreen()
        //                 history.push('/home');
        //             }
        //         })
        // .catch(function (error) {
        //     //alert("Something wrong") //TODO
        // });
        history.push('/');//TODO
    }

    removeVoteBox = (id, name, langFlag) => {
        let removeData = {
            id: id,
            name: name,
            langFlag: langFlag
        }
        this.setState({
            dataForRemovePopUp: removeData,
            removePopUp: !this.state.removePopUp
        })
    }

    openRemovePopUp = () => {
        this.setState({
            removePopUp: !this.state.removePopUp
        })
    }

    newPoll = () => {
        alert("open Add window!")
        this.openAddWindow()//wazne, zeby stan po zamknieciu alertu zmienic
    }

    render() {
        const { addWindow, zeroFlag, lang, editWindow, removePopUp, editWindowData, dataForRemovePopUp } = this.state;

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
                        </div> : <VotesContainer VotesStore={mockData} playVote={this.openPlayWindow} />
                    }
                    {
                        addWindow ? this.newPoll() : null
                    }
                    {/* {
                editWindow ? <EditVote openWindow={this.openEditWindow} data={editWindowData}/> : null 
            }
            {
                removePopUp ?
                    <RemoveVoteWrapper 
                        data={dataForRemovePopUp}
                        setLang={this.setOriginalLang}
                        openWindow={this.openRemovePopUp}
                    />
                : null
            } */}
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