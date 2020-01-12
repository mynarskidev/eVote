import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PollCreated from './PollCreated'
import { removeVoteSet, sendNewAnswers } from '../actions/VotesActions'

function VerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{zIndex: "100001"}}
        >
            <Modal.Header closeButton>
                <Modal.Title style={{ color: "green" }} id="contained-modal-title-vcenter">
                    {props.data.pollName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PollCreated onAnswersCount={props.onAnswersCount} onSaveClose={props.onSaveClose} data={props.data} />
            </Modal.Body>
            <Modal.Footer>
                <Button disabled={props.closingDisabled} variant="success" onClick={props.onHide}>{`Save & Close`}</Button>
            </Modal.Footer>
        </Modal>
    );
}

class VoteBox extends Component {
    state = {
        modalShow: false,
        closingDisabled: true,
        newAnswersData: {},
        disableOpening: false
    }

    setModalShow = (value) => {
        this.setState({
            modalShow: value,
            closingDisabled: true
        })
        if(value===false&&!this.state.closingDisabled){
            this.props.sendNewAnswers(this.state.newAnswersData);
            this.setState({ disableOpening: true }) //todo console.log zmien w mocku czy juz glosowales
        } 
    }

    handleAnswersCount = (value) => {
        if(value===this.props.data.pollQuestions.length){
            this.setState({
                closingDisabled: false
            })
        }
    }

    handleSaveClose = async (value) => {
        await this.setState({
            newAnswersData: value
        })
    }

    handleDeleteClick() {
        this.props.removeVoteSet(this.props.id);
        this.props.onDataChange()
    }

    render() {
        const { cardTitle, userRole, data } = this.props;
        const { modalShow, closingDisabled, disableOpening } = this.state;

        return (
            <Fragment>
                <Card style={{ width: '20rem', boxShadow: "0px 0px 7px 0px rgba(0,0,0,0.2)" }}>
                    <Card.Body>
                        <Card.Title>
                            {cardTitle}
                            {userRole==='admin'? <DeleteForeverIcon onClick={() => this.handleDeleteClick()} color="secondary" fontSize="large" style={{ cursor: 'pointer', position:'absolute', right:'0', top:'-15px'}} /> : null}
                        </Card.Title>
                        <Card.Text>
                            Click open button to see questions
                        </Card.Text>
                        <Button variant="success" onClick={() => this.setModalShow(true)} disabled={disableOpening}>Open</Button>
                        <VerticallyCenteredModal
                            show={modalShow}
                            onHide={() => this.setModalShow(false)}
                            data={data}
                            onAnswersCount={this.handleAnswersCount}
                            onSaveClose={this.handleSaveClose}
                            // eslint-disable-next-line
                            closingDisabled={closingDisabled}
                        />
                    </Card.Body>
                </Card>
            </Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = { removeVoteSet, sendNewAnswers }

export default connect(mapStateToProps, mapDispatchToProps)(VoteBox);