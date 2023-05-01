import { useState } from 'react';
import Container from './../components/container/Container';
import Navbar from './../components/navbar/Navbar';
import Content from './../components/content/Content';
import Form from '../components/form/Form';
import { LOGIN_USER } from './../graphql/Mutation';
import PasswordInput from '../components/password_input/PasswordInput';
import Footer from './../components/footer/Footer';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const variables = {
    loginData: {
      email,
      password,
    },
  };

  return (
    <Container>
      <Navbar />
      <Content>
        <Form
          mutation={LOGIN_USER}
          variables={variables}
          prev="/account/submit"
          title={'Login'}
          next="/account/register"
          buttonLabel={'Login'}
        >
          <div className="input-wrapper">
            <div className="input-wrapper-title">
              <label htmlFor="name">E-mail</label>
              <span></span>
            </div>
            <input
              type="email"
              name="email"
              placeholder="Enter your e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <div className="input-wrapper-title">
              <label htmlFor="name">Password</label>
              <span></span>
            </div>
            <PasswordInput
              name={'password'}
              placeholder={'Enter your password'}
              value={password}
              action={(e) => setPassword(e.target.value)}
            />
          </div>
        </Form>
      </Content>
      <Footer />
    </Container>
  );
};

export default LoginPage;
