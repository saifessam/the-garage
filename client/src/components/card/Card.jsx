import { Link, useLocation, useNavigate } from 'react-router-dom';
import './styles.css';

const Card = ({ id, type, condition = null, image, name, detail1, detail2, detail3, detail4 }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const renderImage = () => {
    if (type === 'vehicle') {
      return <img src={`/assets/${type}/${condition}/${image}`} />;
    } else if (type === null) {
      return <img src={`/assets/${type}/${image}`} />;
    } else {
      return <img src={`/assets/${type}/${image}`} />;
    }
  };

  return (
    <div className="card">
      <Link to={`/${pathname.split('/')[1]}/${id}`} className="card-image">
        {renderImage()}
      </Link>
      <div className="card-text">
        <h4>{name}</h4>
        <span>{detail1}</span>
        <span>{detail2}</span>
        <span>{detail3}</span>
        <span>{detail4}</span>
      </div>
    </div>
  );
};

export default Card;
