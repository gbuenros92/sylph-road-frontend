import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { TiThMenu } from 'react-icons/ti'
import { IoMdTrendingUp } from 'react-icons/io'
import { IoClose, IoSettingsOutline, IoNotificationsOutline } from 'react-icons/io5'
import { VscAccount } from 'react-icons/vsc'
import { MdCatchingPokemon } from 'react-icons/md'
import { BsChatDots } from 'react-icons/bs'
import { AiOutlineLogout, AiOutlineLogin, AiOutlineUserAdd } from 'react-icons/ai'

import './Nav.css'

const Nav = ({ trainer, setTrainer, logOut }) => {

    const [sidebar, setSidebar] = useState(false)

    const showSideBar = () => setSidebar(!sidebar)

    const navigate = useNavigate()

    const handleLogOut = () => {
        setTrainer(null)
        logOut()
        navigate('/')
    }

    return (
        <>
            <div className="navbar d-flex flex-row">
                <Link to="#" className="menu-bars">
                    <TiThMenu onClick={showSideBar} />
                </Link>
                <Link className="navbar-brand" to="/home">
                    <img src="new-logo.png" />
                    The Sylph Road
                </Link>
            </div>

            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-items" onClick={showSideBar}>

                    <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                            <IoClose />
                        </Link>
                    </li>

                    {
                        trainer
                            ?
                            <>
                                <li className="nav-text">
                                    <Link to={`/trainer/${trainer._id}`}>
                                        <VscAccount />
                                        <span className="nav-text-span">Profile</span>
                                    </Link>
                                </li>

                                <li className="nav-text">
                                    <Link to="/pokemon">
                                        <MdCatchingPokemon />
                                        <span className="nav-text-span">Pok&eacute;dex</span>
                                    </Link>
                                </li>

                                <li className="nav-text">
                                    <Link to="#">
                                        <BsChatDots />
                                        <span className="nav-text-span">Messages</span>
                                    </Link>
                                </li>

                                <li className="nav-text">
                                    <Link to="#">
                                        <IoNotificationsOutline />
                                        <span className="nav-text-span">Notifications</span>
                                    </Link>
                                </li>

                                <li className="nav-text">
                                    <Link to="#">
                                        <IoMdTrendingUp />
                                        <span className="nav-text-span">Trending</span>
                                    </Link>
                                </li>

                                <li className="nav-text">
                                    <Link to="#">
                                        <IoSettingsOutline />
                                        <span className="nav-text-span">Account</span>
                                    </Link>
                                </li>

                                <li className="nav-text">
                                    <Link onClick={handleLogOut} to="/">
                                        <AiOutlineLogout />
                                        <span className="nav-text-span">Log Out</span>
                                    </Link>
                                </li>
                            </>
                            :
                            <>
                                <li className="nav-text">
                                    <Link to="/login">
                                        <AiOutlineLogin />
                                        <span className="nav-text-span">Log In</span>
                                    </Link>
                                </li>

                                <li className="nav-text">
                                    <Link to="/">
                                        <AiOutlineUserAdd />
                                        <span className="nav-text-span">Sign Up</span>
                                    </Link>
                                </li>
                            </>
                    }
                </ul>
            </nav>
        </>
    );
}

export default Nav;
