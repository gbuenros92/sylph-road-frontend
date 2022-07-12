import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";

const Profile = ({ trainer }) => {
    return (
        <div id="profile-container" className="d-flex flex-column align-items-center">
            <ProfileHeader trainer={trainer} />
        </div>
    );
}

export default Profile;
