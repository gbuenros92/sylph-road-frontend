import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";

const Profile = ({ trainer }) => {
    return (
        <div id="profile-container">
            <ProfileHeader trainer={trainer} />
        </div>
    );
}

export default Profile;
