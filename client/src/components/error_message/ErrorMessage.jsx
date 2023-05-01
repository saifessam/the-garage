import './styles.css';
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';

const ErrorMessage = () => {
  const navigate = useNavigate();
  return (
    <div className="error-message">
      <h1>Error 404 | Page not found</h1>
      <Button action={() => navigate(-1)} type={'button'}>
        Leave this page
      </Button>
    </div>
  );
};

export default ErrorMessage;
