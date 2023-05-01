import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './styles.css';

const Navigator = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const buttons = document.querySelectorAll('.navigator .navigator-buttons button');
    buttons.forEach((button) => {
      if (button.getAttribute('data-info') === location.pathname) {
        button.classList.add('activePage');
      }
    });
  }, []);

  return (
    <div className="navigator">
      <div className="navigator-buttons">{children}</div>
    </div>
  );
};

export default Navigator;
