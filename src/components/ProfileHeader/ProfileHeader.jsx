import { useNavigate} from 'react-router-dom'

const ProfileHeader = ({ trainer }) => {
    const navigate = useNavigate()

    return (
        <div id="header-container" className="h-auto d-inline-flex align-items-center">

            <div id="profile-picture">
                <img src={trainer.picture} />
            </div>

            <div id="name-handle">
                <h4>{trainer.trainerName}</h4>
                <small>@{trainer.trainerHandle}</small>
            </div>

            <div id="follow">
                <h6>Following</h6>
                <h6>Followers</h6>
            </div>

            <button 
                className="btn btn-outline-primary btn-sm"
                onClick={() => navigate(`trainer/${trainer._id}/edit`, { state: trainer })}>
                    Edit Profile
            </button>

        </div>
    );
}

export default ProfileHeader;
