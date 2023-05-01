import './styles.css';

const Button = ({ children, type, action, data = null, fit = false, disabled = false }) => {
  return (
    <button type={type} onClick={action} data-info={data} style={{ width: fit ? 'fit-content' : null }} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
