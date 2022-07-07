import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../utilities/trainers-service'
import { HiOutlineMail, HiOutlineKey } from 'react-icons/hi'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

const LogIn = ({ setTrainer }) => {
    const [message, setMessage] = useState('')

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const handleChange = e => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            const trainer = await login(credentials)

            if (trainer) {
                setTrainer(trainer)
                navigate('/home')
            } else {
                throw new Error()
            }

        } catch (e) {
            setMessage('Login failed. Try again.')
        }
    }

    const [passwordVisible, setPasswordVisible] = useState(false)

    const handleVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }
    return (
        <div id="form-container">
            <form onSubmit={handleSubmit}>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1"><HiOutlineMail /></span>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        aria-label="Email"
                        name="email"
                        value={credentials.email}
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
                        value={credentials.password}
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

                <button className="btn btn-primary" type="submit">Log In</button>
                <div id="emailHelp" className="form-text">{message}</div>

            </form>
        </div>
    );
}

export default LogIn;
