import Dropdown from '../dropdown/Dropdown';
import './styles.css';

const Input = ({ label, error, type, name, placeholder, action, options, value, checkboxs }) => {
  const renderInputs = () => {
    if (type === 'text') {
      return <input type={type} name={name} placeholder={placeholder} value={value} onChange={action} />;
    } else if (type === 'password') {
      return <input type={type} name={name} placeholder={placeholder} value={value} onChange={action} />;
    } else if (type === 'phone') {
      return <input type={type} name={name} placeholder={placeholder} value={value} onChange={action} />;
    } else if (type === 'select') {
      return <Dropdown name={name} options={options} label={label} action={action} />;
    } else if (type === 'checkbox') {
      return (
        <div className="checkboxs">
          {checkboxs?.map((checkbox) => {
            return (
              <div className="checkbox" key={checkbox.value}>
                <input type="checkbox" name={name} defaultValue={checkbox.value} onChange={action} />
                <label>{checkbox.label}</label>
              </div>
            );
          })}
        </div>
      );
    } else if (type === 'time') {
      return <input type="time" name={name} onChange={action} defaultValue={value} />;
    } else if (type === 'number') {
      return <input type="number" name={name} value={value} onChange={action} min="0" max="5" />;
    } else if (type === 'textarea') {
      return <textarea name={name} placeholder={placeholder} rows={6} value={value} onChange={action}></textarea>;
    } else if (type === 'file') {
      return <input type="file" name={name} onChange={action} />;
    }
  };

  return (
    <div className="input-wrapper">
      <div className="input-wrapper-title">
        <label htmlFor={name}>{label}</label>
        <span>{error}</span>
      </div>
      {renderInputs()}
    </div>
  );
};

export default Input;
