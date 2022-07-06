import { useState } from 'react'
import { signUp } from '../../utilities/trainers-service'
import { useNavigate, Link } from 'react-router-dom'
import { HiOutlineMail, HiOutlineKey, HiOutlineHome } from 'react-icons/hi'
import { AiOutlineUser, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

const SignUp = ({ setTrainer }) => {
    const [newTrainer, setNewTrainer] = useState({
        email: '',
        password: '',
        trainerName: '',
        // trainerHandle: '',
        region: ''
    })

    const [passwordVisible, setPasswordVisible] = useState(false)

    const navigate = useNavigate()

    const handleVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }

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

                    <div className="input-group mb-3">
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

                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="inputGroupSelect01 region"><HiOutlineHome /></label>
                        <select
                            className="form-select"
                            id="inputGroupSelect01 region"
                            defaultValue="none"
                            name="region"
                            onChange={handleChange}
                            required
                        >
                            <option value="none" disabled hidden>Your Home Region</option>
                            <option value="kanto">Kanto</option>
                            <option value="johto">Johto</option>
                            <option value="hoenn">Hoenn</option>
                            <option value="sinnoh">Sinnoh</option>
                            <option value="unova">Unova</option>
                            <option value="kalos">Kalos</option>
                            <option value="kalos">Alola</option>
                            <option value="galar">Galar</option>
                        </select>
                    </div>

                    <div className="input-group mb-3">
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

                    <div className="input-group mb-3 position-relative">
                        <span className="input-group-text" id="basic-addon1"><HiOutlineKey /></span>
                        <input
                            type={(passwordVisible === false) ? "password" : "text"}
                            className="form-control"
                            placeholder="Password"
                            aria-label="Password"
                            name="password"
                            value={newTrainer.password}
                            onChange={handleChange}
                            required
                        />

                        <div className="position-absolute end-0 fs-4 mx-3">
                            {
                                (passwordVisible === false)
                                    ?
                                    <AiFillEye onClick={handleVisibility} className="eyes" />
                                    :
                                    <AiFillEyeInvisible onClick={handleVisibility} className="eyes" />
                            }
                        </div>
                    </div>

                    <button className="btn btn-primary" type="submit">Submit</button>

                </form>

                <small>Already have an account? <Link to="/login">Log in here!</Link></small>

            </div>

        </div>
    );
}

export default SignUp;
