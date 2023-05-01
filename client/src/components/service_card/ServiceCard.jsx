import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';
import './styles.css';

const ServiceCard = ({ path, image, title, text }) => {
  const navigate = useNavigate();

  return (
    <div className="service">
      <div className="service-image">
        <img src={`/assets/images/${image}.jpg`} alt={image} />
        <h5 className="service-title">{title}</h5>
      </div>
      <div className="service-body">
        <p className="service-text">{text}</p>
        <Button type={'button'} action={() => navigate(path)}>
          Show
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;
