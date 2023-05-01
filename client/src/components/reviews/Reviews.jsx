import EmptyMessage from '../empty_message/EmptyMessage';
import Review from '../review/Review';
import { ReactComponent as StarSVG } from '../../assets/svgs/star.svg';
import './styles.css';

const Reviews = ({ reviews, avgRating }) => {
  const renderRatingStars = () => {
    var stars = [];
    for (let i = 0; i < avgRating; i++) {
      stars.push(<StarSVG key={i} />);
    }
    return stars;
  };

  const renderReviews = () => {
    if (reviews.length > 0) {
      return reviews?.map((review) => {
        return (
          <Review
            image={review.user.image}
            rate={review.rate}
            title={review.title}
            name={review.user.name}
            message={review.message}
            key={review.id}
          />
        );
      });
    } else {
      return <EmptyMessage message={'no reviews yet'} />;
    }
  };

  return (
    <div className="reviews">
      <div className="reviews-title">
        <h2>Reviews</h2>
        <span>Average rating &nbsp; {renderRatingStars()}</span>
        <span>Based on {reviews.length} ratings</span>
      </div>
      {renderReviews()}
    </div>
  );
};

export default Reviews;
