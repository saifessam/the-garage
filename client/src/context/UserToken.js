import { createContext, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';

export const UserToken = createContext();

const UserTokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [image, setImage] = useState(null);
  const [phone, setPhone] = useState(null);
  const [location, setLocation] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const cookies = new Cookies();
    const cookie = cookies.get('token');
    if (cookie) {
      setToken(cookie);
    }
  }, []);

  useEffect(() => {
    if (token !== null) {
      const decoded = jwt_decode(token);
      setId(decoded.id);
      setName(decoded.name);
      setEmail(decoded.email);
      setImage(decoded.image);
      setPhone(decoded.phone);
      setLocation(decoded.location);
      setIsAdmin(decoded.isAdmin);
    }
  }, [token]);

  const values = { token, id, name, email, image, phone, location, isAdmin };

  return <UserToken.Provider value={values}>{children}</UserToken.Provider>;
};

export default UserTokenProvider;
