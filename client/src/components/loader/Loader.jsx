import Spinner from '../spinner/Spinner';
import './styles.css';

const Loader = () => {
  return (
    <div className="loader">
      <h1>Processing your request</h1>
      <span>
        Please wait
        <Spinner />
      </span>
    </div>
  );
};

export default Loader;
