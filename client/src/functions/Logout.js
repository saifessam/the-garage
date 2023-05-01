import Cookies from 'universal-cookie';

const Logout = (navigate) => {
  const cookies = new Cookies();
  cookies.remove('token');
  navigate('/');
  window.location.reload(false);
};

export default Logout;
