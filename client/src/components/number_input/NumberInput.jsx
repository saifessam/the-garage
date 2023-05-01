import Button from '../button/Button';
import { ReactComponent as AddSVG } from '../../assets/svgs/add.svg';
import { ReactComponent as MinusSVG } from '../../assets/svgs/minus.svg';
import './styles.css';
const NumberInput = ({ state, setter, max = 100 }) => {
  const increase = () => {
    if (state < max) {
      setter(state++);
    } else {
      return;
    }
  };

  const decrease = () => {
    if (state > 0) {
      setter(state--);
    } else {
      return;
    }
  };

  return (
    <div className="number-input">
      <Button type={'button'} action={() => decrease()} fit={true}>
        <MinusSVG />
      </Button>
      <input type="number" value={state} onChange={setter} readOnly />
      <Button type={'button'} action={() => increase()} fit={true}>
        <AddSVG />
      </Button>
    </div>
  );
};

export default NumberInput;
