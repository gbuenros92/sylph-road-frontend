import { useState } from 'react'
import { signUp } from '../../utilities/trainers-service'
import { useNavigate, Link } from 'react-router-dom'
import { HiOutlineMail, HiOutlineKey, HiOutlineHome } from 'react-icons/hi'
import { AiOutlineUser } from 'react-icons/ai'

const SignUp = ({ setTrainer }) => {
    const [newTrainer, setNewTrainer] = useState({
        email: '',
        password: '',
        trainerName: '',
        trainerHandle: '',
        region: ''
    })

    const navigate = useNavigate()

    const handleChange = e => {
        setNewTrainer({
            ...newTrainer,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const trainer = await signUp(newTrainer)
            setTrainer(trainer)
            if (trainer) navigate('/')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div id="sign-up-parent">

            <div id="form-container">

                <h2>Register Here</h2>

                <form onSubmit={handleSubmit}>

                    <div class="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><AiOutlineUser /></span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="What's Your Name?"
                            aria-label="Trainer Name"
                            name="trainerName"
                            value={newTrainer.trainerName}
                            onChange={handleChange}
                        />
                    </div>

                    <div class="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><HiOutlineMail /></span>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            aria-label="Email"
                            name="email"
                            value={newTrainer.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div class="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><HiOutlineKey /></span>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            aria-label="Password"
                            name="password"
                            value={newTrainer.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div class="input-group mb-3">
                        <label class="input-group-text" htmlForfor="inputGroupSelect01"><HiOutlineHome/></label>
                        <select class="form-select" id="inputGroupSelect01">
                            <option selected>Your Home Region</option>
                            <option value="1">Kanto</option>
                            <option value="2">Johto</option>
                            <option value="3">Hoenn</option>
                            <option value="3">Sinnoh</option>
                            <option value="3">Unova</option>
                            <option value="3">Kalos</option>
                            <option value="3">Alola</option>
                            <option value="3">Galar</option>
                        </select>
                    </div>

                    <button class="btn btn-primary" type="submit">Submit</button>

                </form>

                <small>Already have an account? <Link to="/login">Log in here!</Link></small>

            </div>

        </div>
    );
}

export default SignUp;
