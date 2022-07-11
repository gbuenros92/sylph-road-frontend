import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { TiThMenu } from 'react-icons/ti'
import { IoMdTrendingUp } from 'react-icons/io'
import { IoClose, IoSettingsOutline, IoNotificationsSharp } from 'react-icons/io5'
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
        // <nav className="navbar navbar-light bg-light">
        //     <div className="container-fluid d-flex justify-content-between">

        //         <Link className="navbar-brand col" to="/home">
        //             <img src="logo-sm.png" alt="" width="35" height="35" />
        //             Silph Road
        //         </Link>

        //         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        //             <span className="navbar-toggler-icon"></span>
        //         </button>

        //         <div className="collapse navbar-collapse" id="navbarSupportedContent">
        //             {
        //                 trainer
        //                     ?
        //                     <>
        //                         <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

        //                             <li className="nav-item">
        //                                 <Link className="nav-link" to={`/trainer/${trainer._id}`}>Profile</Link>
        //                             </li>

        //                             <li className="nav-item">
        //                                 <Link className="nav-link" to={'/pokemon'}>Pokedex</Link>
        //                             </li>

        //                             <li className="nav-item">
        //                                 <Link className="nav-link" onClick={handleLogOut} to="/">Logout</Link>
        //                             </li>

        //                             <li className="nav-item">
        //                                 <p>Logged in as {trainer.trainerName}</p>
        //                             </li>
        //                         </ul>
        //                     </>
        //                     :
        //                     <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        //                         <li className="nav-item">
        //                             <Link className="nav-link" to="/signup">Sign Up</Link>
        //                         </li>
        //                         <li className="nav-item">
        //                             <Link className="nav-link" to="/login">Login</Link>
        //                         </li>
        //                     </ul>
        //             }
        //         </div>
        //     </div>
        // </nav>
        <>
            <div className="navbar">
                <Link to="#" className="menu-bars">
                    <TiThMenu onClick={showSideBar}/>
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
                                        <VscAccount/> 
                                        <span className="nav-text-span">Profile</span>
                                    </Link>
                                </li>

                                <li className="nav-text">
                                    <Link to="/pokemon">
                                        <MdCatchingPokemon/>
                                    </Link>
                                    <span className="nav-text-span">Pok&eacute;dex</span>
                                </li>

                                <li className="nav-text">
                                    <Link to="#">
                                        <BsChatDots/>
                                    </Link>
                                    <span className="nav-text-span">Messages</span>
                                </li>

                                <li className="nav-text">
                                    <Link to="#">
                                        <IoNotificationsSharp/>
                                    </Link>
                                    <span className="nav-text-span">Notifications</span>
                                </li>

                                <li className="nav-text">
                                    <Link to="#">
                                        <IoMdTrendingUp/>
                                        <span className="nav-text-span">Trending</span>
                                    </Link>
                                </li>

                                <li className="nav-text">
                                    <Link to="#">
                                        <IoSettingsOutline/>
                                    </Link>
                                    <span className="nav-text-span">Account</span>
                                </li>

                                <li className="nav-text">
                                    <Link onClick={handleLogOut} to="/">
                                        <AiOutlineLogout/>
                                    </Link>
                                    <span className="nav-text-span">Log Out</span>
                                </li>
                            </>
                            :
                            <>
                              <li className="nav-text">
                                    <Link to="/login">
                                        <AiOutlineLogin/>
                                    </Link>
                                    <span className="nav-text-span">Log In</span>
                                </li>

                                <li className="nav-text">
                                    <Link to="/">
                                        <AiOutlineUserAdd/>
                                    </Link>
                                    <span className="nav-text-span">Sign Up</span>
                                </li>  
                            </>
                    }
                </ul>
            </nav>

        </>
    );
}

export default Nav;
