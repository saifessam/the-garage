import './styles.css';

const Wrapper = ({ children, vertical, start, separated, centered, bottom }) => {
  const handleClassNames = () => {
    const classNames = ['wrapper'];
    if (vertical) {
      classNames.push('wrapper-vertical');
    }
    if (start) {
      classNames.push('wrapper-start');
    }
    if (separated) {
      classNames.push('wrapper-separated');
    }
    if (centered) {
      classNames.push('wrapper-centered');
    }
    if (bottom) {
      classNames.push('wrapper-bottom');
    }
    return classNames;
  };

  return <div className={handleClassNames().join(' ')}>{children}</div>;
};

export default Wrapper;
