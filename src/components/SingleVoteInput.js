import React, { Component } from 'react';

class SingleVoteInput extends Component {
    state={
        ab: ['','']
    }

    componentDidMount(){
        this.props.inputFocus(this.focusOnFirst);
    }

    focusOnFirst = () => {
        this.setState({
            ab: ['','']
        })
        document.getElementById("EditVote-addNew-firstInput").focus();
    }

    inputType = (e, type) => {
        let txt = e.target.value;
        let data = this.state.ab;
        data[type] = txt;
        this.setState({
            ab: data
        });
        this.props.ab(data)
    }

    render() {
    return (
        <div className='EditVote-addNew-inputs-wrapper'>
        <input value={this.state.ab[0]} id='EditVote-addNew-firstInput' onChange={(e) => this.inputType(e, 0)} className='EditVote-addnew-input font-edit-Vote'/> 
        <div className='EditVote-addNew-input-blankSpace'></div>
        <input value={this.state.ab[1]} onChange={(e) => this.inputType(e, 1)} className='EditVote-addnew-input font-edit-Vote'/>    
        </div>
    );
    }
}

export default SingleVoteInput;