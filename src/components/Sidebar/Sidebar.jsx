import { Link, useNavigate } from 'react-router-dom'

const Sidebar = ({ trainer, setTrainer, logOut }) => {

    const navigate = useNavigate()

    const handleLogOut = () => {
        setTrainer(null)
        logOut()
        navigate('/')
    }

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid d-flex justify-content-between">

                <Link className="navbar-brand col" to="/home">
                    <img src="logo-sm.png" alt="" width="35" height="35" />
                    Silph Road
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {
                        trainer
                            ?
                            <>
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                                    <li className="nav-item">
                                        <Link className="nav-link" to={`trainer/${trainer._id}`}>Profile</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link" onClick={handleLogOut} to="/">Logout</Link>
                                    </li>

                                    <li className="nav-item">
                                        <p>Logged in as {trainer.trainerName}</p>
                                    </li>
                                </ul>
                            </>
                            :
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup">Sign Up</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                            </ul>
                    }
                </div>
            </div>
        </nav>
    );
}

export default Sidebar;
