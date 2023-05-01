import { useState } from 'react';
import Button from '../../components/button/Button';
import { ReactComponent as ArrowDownSVG } from '../../assets/svgs/arrow-down.svg';
import './styles.css';

const Dropdown = ({ options, name, label, action, current, property }) => {
  const [toggle, setToggle] = useState(false);

  const handleSelect = (e) => {
    if (current || property) {
      action({ ...current, [property]: e.target.dataset.value });
    } else {
      action(e.target.dataset.value);
    }
    document.querySelector(`.select[data-name=${name}] .select-selected .select-option`).innerText = e.target.outerText;
    setToggle((current) => !current);
  };

  return (
    <div className="select" data-name={name}>
      <div className="select-selected">
        <div className="select-option">{label}</div>
        <Button type={'button'} action={() => setToggle((current) => !current)} data={'transparent'}>
          <ArrowDownSVG className={toggle ? 'rotate' : undefined} />
        </Button>
      </div>
      <div className={toggle ? 'select-options active' : 'select-options'}>
        {options?.map((option) => {
          return (
            <div
              className="select-option"
              data-value={option.value || option}
              key={option.value || option}
              onClick={(e) => handleSelect(e)}
            >
              {option.label || option}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dropdown;
