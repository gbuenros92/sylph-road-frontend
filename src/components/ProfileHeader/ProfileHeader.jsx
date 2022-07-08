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
        <div id="header-container" className="h-auto d-inline-flex align-items-center">

            <div id="profile-picture">
                <img src={trainer.picture} alt="" />
            </div>

            <div id="name-handle">
                <h4>{trainer.trainerName}</h4>
                <span><BsPinMapFill/><h6>{trainer.region[0].toUpperCase()+trainer.region.substring(1)}</h6></span>
                <small>@{trainer.trainerHandle}</small>
            </div>

            <div id="follow">
                <h6>Following</h6>
                <h6>Followers</h6>
            </div>

            <Button
                // className="btn btn-outline-primary btn-sm"
                variant="outline-primary"
                onClick={handleShow}
            // onClick={() => navigate(`/trainer/${trainer._id}/edit`, { state: trainer })}
            >
                Edit Profile
            </Button>

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
                                placeholder={trainer.trainerHandle}/>
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
