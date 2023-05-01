import { useState } from 'react';
import { ReactComponent as EyeSVG } from '../../assets/svgs/eye.svg';
import { ReactComponent as EyeSlashSVG } from '../../assets/svgs/eye-slash.svg';
import './styles.css';
import Button from '../button/Button';

const PasswordInput = ({ name, placeholder, value, action }) => {
  const [visible, setVisible] = useState(false);

  const togglePassword = () => {
    setVisible(!visible);
  };

  return (
    <div className="password-input">
      <input type={visible ? 'text' : 'password'} name={name} placeholder={placeholder} value={value} onChange={action} />
      <Button type={'button'} action={togglePassword} data={'transparent'}>
        {visible ? <EyeSlashSVG /> : <EyeSVG />}
      </Button>
    </div>
  );
};

export default PasswordInput;
