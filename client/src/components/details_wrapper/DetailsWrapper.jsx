import './styles.css';

const DetailsWrapper = ({ svg = null, title, heading = false, caps = false, small = false }) => {
  const renderClassNames = () => {
    const className = ['details-wrapper'];
    if (heading) {
      className.push('heading');
    }
    if (caps) {
      className.push('caps');
    }
    if (small) {
      className.push('small');
    }
    return className;
  };
  return (
    <span className={renderClassNames().join(' ')}>
      {svg} {title}
    </span>
  );
};

export default DetailsWrapper;
