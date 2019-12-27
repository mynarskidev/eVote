import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import NewVote from './NewVote' //TODO
import PollCreated from './PollCreated'
import VotesContainer from './VotesContainer'
import EditVote from './EditVote'
import PlayVote from './PlayVote'
import RemoveVoteWrapper from './RemoveVoteWrapper'
import { sendVotesSet, getAllVotesSetsSuccess, cleanScreen } from '../actions/VotesActions'
import history from '../helpers/History';
import axios from 'axios';


class HomeScreen extends Component {        
    state = {
        addWindow : false,
        editWindow: false,
        playWindow: false,
        removePopUp: false,
        dataForplayWrapper: [],
        dataForRemovePopUp: [],
        lang: '-',
    }

    componentDidMount(){
        const other=this;
        const apiBaseUrl = "http://localhost:8081/api";

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

    openPlayWindow = (data) => {
        this.setState({
            playWindow:!this.state.playWindow,
            dataForplayWrapper: data
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

    selectLanguages = e => {
        let lang = e.target.value
        this.setState({
            lang: lang
        });
    }
    
    removeVoteBox = (id, name, langFlag) => {
        let removeData = {
            id: id,
            name: name,
            langFlag: langFlag
        }
        this.setState({
            dataForRemovePopUp:removeData,
            removePopUp: !this.state.removePopUp
        })
    }

    setOriginalLang = () => {
        this.setState({
            lang: '-'
        })
    }

    openRemovePopUp = () => {
        this.setState({
            removePopUp: !this.state.removePopUp
        })
    }

  render() {
    const { addWindow, lang, editWindow, removePopUp, editWindowData, dataForRemovePopUp, playWindow, dataForplayWrapper } = this.state;
      let languages = [];
      // eslint-disable-next-line
      this.props.Votes.map((Voteka) => {
          if(typeof Voteka === 'undefined'){}
          else{
            let dataVote = Voteka.vote;
            dataVote = dataVote.map(function(obj) {
                return Object.keys(obj).sort().map(function(key) { 
                    return obj[key];
                });
            });
            Voteka.vote = dataVote.slice(0);  
            let flag1 = true;
            let flag2 = true;
            for (let i = 0; i < languages.length; i++){
                if(Voteka.frontLanguage === languages[i]){
                    flag1 = false;
                }
                if(Voteka.backLanguage === languages[i]){
                    flag2 = false;
                }
            }
            if(flag1 === true){
                languages.push(Voteka.frontLanguage)
            }
            if(flag2 === true){
                languages.push(Voteka.backLanguage)
            }
          }
      });

    return (
      <MuiThemeProvider>
        <div className="HomeScreen">
            <AppBar className="homescreen-topGrid" style={{background: "green"}} showMenuIconButton={false} title="e-Vote App">
                <Button variant="dark" style={{marginRight: "10px"}} onClick={() => this.openAddWindow()}>Add New</Button>
                <Button variant="dark" onClick={() => this.logout()}>Log Out</Button>
            </AppBar>
            {
                addWindow ? <PollCreated openWindow={this.openAddWindow} /> : <VotesContainer VotesStore={this.props.Votes} VotesLang={lang} editWrapper={this.openEditWindow} playVote={this.openPlayWindow} removeWrapper={this.removeVoteBox} /> 
                // addWindow ? <NewVote VotePack={this.sendVotesSetAction} openWindow={this.openAddWindow} /> : null //TODO
            }
            {/* <VotesContainer VotesStore={this.props.Votes} VotesLang={lang} editWrapper={this.openEditWindow} playVote={this.openPlayWindow} removeWrapper={this.removeVoteBox} />  //TODO*/}
            {
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
            }
            {
                playWindow ?
                    <PlayVote openWindowFun={this.openPlayWindow} Voteka={dataForplayWrapper} />
                : null
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