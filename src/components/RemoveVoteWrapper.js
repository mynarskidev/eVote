import React, { Component } from 'react';
import {connect} from 'react-redux'
import {removeVoteSet} from '../actions/VotesActions'


class RemoveVoteWrapper extends Component {
    state = {
        boxStyle_bckg:{
            'opacity' : 0
        },
        boxStyle_cont:{
            'opacity' : 0,
            'transform' : 'translateY(-80px)'
        }
    }

    componentWillMount(){
        document.addEventListener('keydown', this.exitWindow, false)
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({
                boxStyle_bckg:{
                'opacity' : 1
                },
                boxStyle_cont:{
                    'opacity' : 1,
                    'transform' : 'translateY(0px)'
                }
            })
        }, 5)
    }

    componentWillUnmount(){
        document.removeEventListener('keydown',this.exitWindow, false)
    }
    
    removeVote = (data) => {
        this.props.removeVoteSet(data.id);
        if(data.langFlag === true){
            this.props.setLang();
        }
        this.props.openWindow();
    }

    cancel = () => {
        this.setState({
            boxStyle_bckg:{
                'opacity' : 0
            },
            boxStyle_cont:{
                'opacity' : 0,
                'transform' : 'translateY(-80px)'
            }
        })
        setTimeout(() => {
            this.props.openWindow();
        }, 300);
    }

    exitWindow = (e) => {
        if ( e.keyCode === 27 ) {
            this.cancel();
        }
    }

    render(){
        const {data} = this.props
        return (
            <div className='removePopUp-wrapper'>
                <div style={this.state.boxStyle_bckg} className='removePopUp-background' onClick={() => this.cancel()}></div>
                <div className='removePopUp-content' style={this.state.boxStyle_cont}>
                    <span className='removePopUp-name font-removePopUp-name'>Remove <b>{data.name}</b>?</span>
                    <div className='removePopUp-buttons-row'>
                        <div className='removePopUp-button btn-red' onClick={() => this.removeVote(data)}>
                            <span  className='font-removePopUp-btn'>Yes</span>
                        </div>
                        <div className='removePopUp-button btn-green' onClick={() => this.cancel()}>
                            <span className='font-removePopUp-btn'>No</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        Votes: state.Votes
    }
}


const mapDispatchToProps = { removeVoteSet }

export default connect(mapStateToProps, mapDispatchToProps)(RemoveVoteWrapper);