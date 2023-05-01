import './styles.css';

const ProfileImage = ({ folder, image }) => {
  return (
    <div className="profile-image">
      <img src={`/assets/profiles/${folder}/${image}`} alt={image} />
    </div>
  );
};

export default ProfileImage;
