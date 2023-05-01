import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserToken } from '../../context/UserToken';
import Button from '../button/Button';
import { ReactComponent as CartSVG } from '../../assets/svgs/cart.svg';
import { ReactComponent as UserSVG } from '../../assets/svgs/user.svg';
import './styles.css';
import Search from '../search/Search';

const Navbar = () => {
  const navigate = useNavigate();
  const { token } = useContext(UserToken);
  const { pathname } = useLocation();

  const renderSearchButton = () => {
    const pages = ['service-providers', 'cars', 'cars-rental', 'spare-parts'];
    if (pages.includes(pathname.split('/')[1])) {
      return <Search />;
    } else {
      return null;
    }
  };

  return (
    <nav className="navbar">
      <Link to={'/'} className="navbar-logo">
        <h4>THE GARAGE</h4>
      </Link>
      <div className="navbar-buttons">
        {token && (
          <Button type={'button'} action={() => navigate('/cart/items')}>
            <CartSVG />
          </Button>
        )}
        <Button type={'button'} action={() => navigate(token ? '/account/profile/account-details' : '/account/login')}>
          <UserSVG />
        </Button>
        {renderSearchButton()}
      </div>
    </nav>
  );
};

export default Navbar;
