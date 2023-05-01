import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../button/Button';
import { ReactComponent as SearchSVG } from '../../assets/svgs/search.svg';
import './styles.css';

const Search = () => {
  const [active, setActive] = useState(false);
  const [query, setQuery] = useState(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!active) {
      setActive(true);
    } else {
      if (query) {
        navigate(`/search/${pathname.split('/')[1]}/${query}`);
      } else {
        setActive(false);
      }
    }
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search"
        className={active ? 'active' : null}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button data={'action'} action={() => handleClick()}>
        <SearchSVG />
      </Button>
    </div>
  );
};

export default Search;
