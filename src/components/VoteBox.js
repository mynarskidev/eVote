import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Modal from 'react-bootstrap/Modal'
import PollCreated from './PollCreated'
import { toggleCardFunction } from '../actions/VotesActions'

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
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

        return (
            <Fragment>
                {/* {toggleCard ? null : */}
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{cardTitle}</Card.Title>
                        <Card.Text>
                            {textCard}
                        </Card.Text>
                        {/* <ButtonToolbar> */}
                        <Button variant="success" onClick={() => this.setModalShow(true)}>Open</Button>
                        <MyVerticallyCenteredModal
                            show={modalShow}
                            onHide={() => this.setModalShow(false)}
                            data={data}
                        />
                        {/* </ButtonToolbar> */}
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