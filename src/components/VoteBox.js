import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Modal from 'react-bootstrap/Modal'
import PollCreated from './PollCreated'
import { toggleCardFunction } from '../actions/VotesActions'

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
                <PollCreated data={props.data} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

class VoteBox extends Component {
    state = {
        modalShow: false,
    }

    setModalShow = (value) => {
        this.setState({
            modalShow: value
        })
    }

    render() {
        const { cardTitle, textCard, data, toggleCard } = this.props;
        const { modalShow } = this.state;
        // // const cosik = Object.values(textCard).split(',').join("<br />")
        // const a = Object.keys(textCard).forEach(function(key) {

        //     console.log(textCard[key]);
          
        //   });

        return (
            <Fragment>
                {/* {toggleCard ? null : */}
                <Card style={{ width: '20rem', boxShadow: "0px 0px 7px 0px rgba(0,0,0,0.2)" }}>
                    <Card.Body>
                        <Card.Title>{cardTitle}</Card.Title>
                        <Card.Text>
                            Click open button to see questions
                            {/* {textCard} */}
                        </Card.Text>
                        <Button variant="success" onClick={() => this.setModalShow(true)}>Open</Button>
                        <VerticallyCenteredModal
                            show={modalShow}
                            onHide={() => this.setModalShow(false)}
                            data={data}
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

const mapDispatchToProps = { toggleCardFunction }

export default connect(mapStateToProps, mapDispatchToProps)(VoteBox);