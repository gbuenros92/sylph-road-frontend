import { useState } from 'react'
import * as trainersService from '../../utilities/trainers-service'
// import { useNavigate } from 'react-router-dom'
import { BsPinMapFill } from 'react-icons/bs'

// Bootstrap Components
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'


const ProfileHeader = ({ trainer }) => {

    // Modal
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const [trainerDetails, setTrainerDetails] = useState(trainer)

    const handleChange = e => {
        setTrainerDetails({
            ...trainerDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            const res = await trainersService.updateTrainer(trainerDetails)
            console.log("res", res)
            // if(res.status === 200) handleClose()
        } catch (e) {
            console.log(e)
        }
    }

    // const navigate = useNavigate()

    return (
        <div id="header-container" className="h-auto d-inline-flex align-items-center m-3 p-2">

            <div id="profile-picture">
                <img src={trainer.picture} alt="" className="m-2" />
            </div>

            <div id="name-handle">
                <h3 className="m-0">{trainer.trainerName}</h3>
                <small className="handle">@{trainer.trainerHandle}</small>
                <div className="d-flex flex-row mt-3">
                    <BsPinMapFill style={{ color: 'red' }} />
                    &nbsp;
                    <h6>{trainer.region[0].toUpperCase() + trainer.region.substring(1)}</h6>
                </div>

                <div id="follow" className="d-flex">
                    <span className="follow"><small className="number">1</small>&nbsp;<small className="m-0">Following</small></span>
                    &nbsp;
                    <span className="follow"><small className="number">19.3M</small>&nbsp;<small className="m-0">Followers</small></span>
                </div>
            </div>

            <div className="d-flex flex-column">
                <Button
                    variant="outline-primary"
                    size="sm"
                    className="mx-4 edit-button"
                    onClick={handleShow}
                // onClick={() => navigate(`/trainer/${trainer._id}/edit`, { state: trainer })}
                >
                    Edit Profile
                </Button>
            </div>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={handleSubmit}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                            <FormControl
                                name="trainerHandle"
                                onChange={handleChange}
                                value={trainerDetails.trainerHandle}
                                placeholder={trainer.trainerHandle}
                            />
                        </InputGroup>
                        <Button variant="primary" type="submit">Save Changes</Button>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default ProfileHeader;
