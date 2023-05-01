import './styles.css';

const Message = ({ children, data }) => {
  return (
    <span className="message" data-info={data}>
      {children}
    </span>
  );
};

export default Message;
