import './styles.css';
import { ReactComponent as DangerSVG } from '../../assets/svgs/danger.svg';

const EmptyMessage = ({ message }) => {
  return (
    <div className="empty-message">
      <DangerSVG />
      <span>{message}</span>
    </div>
  );
};

export default EmptyMessage;
