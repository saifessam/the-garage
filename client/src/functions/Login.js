import Cookies from 'universal-cookie';

const Login = (token, navigate) => {
  const cookies = new Cookies();
  cookies.set('token', token, { path: '/' });
  setTimeout(() => {
    navigate('/');
    window.location.reload(false);
  }, 2000);
};

export default Login;
