import './styles.css';

const Content = ({ children, horizontal }) => {
  const renderClassNames = () => {
    const classNames = ['content'];
    if (horizontal) {
      classNames.push('content-horizontal');
    }
    return classNames;
  };
  return <div className={renderClassNames().join(' ')}>{children}</div>;
};

export default Content;
