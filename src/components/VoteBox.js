import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PollCreated from './PollCreated'
import { toggleCardFunction, removeVoteSet } from '../actions/VotesActions'

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
                <PollCreated onAnswersCount={props.onAnswersCount} data={props.data} />
            </Modal.Body>
            <Modal.Footer>
                <Button disabled={props.closingDisabled} variant="success" onClick={props.onHide}>{`Save & Close`}</Button>
                {/*todo wyslij odpowiedzi gdzies do bazy console.log */}
            </Modal.Footer>
        </Modal>
    );
}

class VoteBox extends Component {
    state = {
        modalShow: false,
        closingDisabled: true
    }

    setModalShow = (value) => {
        this.setState({
            modalShow: value,
            closingDisabled: true
        })
    }

    handleAnswersCount = (value) => {
        if(value===this.props.data.pollQuestions.length){
            this.setState({
                closingDisabled: false
            })
        }
    }

    handleDeleteClick() {
        this.props.removeVoteSet(this.props.id);
        this.props.onDataChange()
    }

    render() {
        const { cardTitle, userRole, data, toggleCard } = this.props;
        const { modalShow, closingDisabled } = this.state;

        return (
            <Fragment>
                {/* {toggleCard ? null : */}
                <Card style={{ width: '20rem', boxShadow: "0px 0px 7px 0px rgba(0,0,0,0.2)" }}>
                    <Card.Body>
                        <Card.Title>
                            {cardTitle}
                            {userRole==='admin'? <DeleteForeverIcon onClick={() => this.handleDeleteClick()} color="secondary" fontSize="large" style={{ cursor: 'pointer', position:'absolute', right:'0', top:'-15px'}} /> : null}
                        </Card.Title>
                        <Card.Text>
                            Click open button to see questions
                        </Card.Text>
                        <Button variant="success" onClick={() => this.setModalShow(true)}>Open</Button>
                        <VerticallyCenteredModal
                            show={modalShow}
                            onHide={() => this.setModalShow(false)}
                            data={data}
                            onAnswersCount={this.handleAnswersCount}
                            // eslint-disable-next-line
                            closingDisabled={closingDisabled}
                        />
                        {/* <Button variant="success" onClick={() => { this.props.toggleCardFunction(true) }}>Open</Button> */}
                    </Card.Body>
                </Card>
                {/* } */}
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { toggleCard } = state
    return {
        toggleCard: toggleCard
    }
}

const mapDispatchToProps = { removeVoteSet, toggleCardFunction }

export default connect(mapStateToProps, mapDispatchToProps)(VoteBox);