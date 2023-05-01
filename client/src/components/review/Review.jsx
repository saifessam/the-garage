import { ReactComponent as StarSVG } from '../../assets/svgs/star.svg';
import { ReactComponent as StarSlashSVG } from '../../assets/svgs/star-slash.svg';
import './styles.css';

const Review = ({ image, rate, title, name, message }) => {
  const renderRatingStars = () => {
    var stars = [];
    for (let i = 0; i < rate; i++) {
      stars.push(<StarSVG key={i} />);
    }
    if (rate === 0) {
      return <StarSlashSVG />;
    } else {
      return stars;
    }
  };

  return (
    <div className="review">
      <div className="review-header">
        <div className="review-header-image">
          <img src={`/assets/profiles/users/${image}`} alt="user" />
        </div>
        <div className="review-header-title">
          <h4>{title}</h4>
          <h6>by {name}</h6>
          <div className="review-header-rate">{renderRatingStars()}</div>
        </div>
      </div>
      <div className="review-text">
        <p>{message}</p>
      </div>
      <div className="review-options hidden">
        <div className="btn btn-sm btn-dark w-100">Edit</div>
        <div className="btn btn-sm btn-danger">Delete</div>
      </div>
    </div>
  );
};

export default Review;
