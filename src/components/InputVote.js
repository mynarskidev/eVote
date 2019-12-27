import React, { Component } from 'react';

class InputVote extends Component {
    state = {
        Vote: ['', '']
    }

    componentDidMount(){
        let data = this.state.Vote;
        data[2] = this.props.id;
        this.setState({
            Vote: data
        })
    }
    
    typeOfVote = (id, e) => {
        let data = this.state.Vote;
        data[id] = e.target.value;
        data[2] = this.props.id;
        this.props.data(data);
        this.setState({
            Vote: data
        })
    }

    render(){
        return (
            <div className="addNew-inputs-wrap">
               <input value={this.state.Vote[0]} onChange={(e) => this.typeOfVote(0, e)} required="required" className="addNew-Vote-input font-addNew-input-txt"/>
               <input value={this.state.Vote[1]} onChange={(e) => this.typeOfVote(1, e)} required="required" className="addNew-Vote-input font-addNew-input-txt"/>
                <div onClick={() => {this.props.remove(this.state.Vote[2])}} className="addNew-removeSingleInput-btn"></div>
            </div>
        )
    }
}
export default InputVote