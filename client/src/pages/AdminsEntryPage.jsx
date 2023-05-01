import { useState } from 'react';
import Container from '../components/container/Container';
import Navbar from '../components/navbar/Navbar';
import Content from '../components/content/Content';
import Form from '../components/form/Form';
import { REGISTER_USER } from '../graphql/Mutation';
import PasswordInput from '../components/password_input/PasswordInput';
import Dropdown from '../components/dropdown/Dropdown';
import locations from '../data/Locations.json';
import FileUpload from '../components/file_upload/FileUpload';
import Footer from '../components/footer/Footer';

const AdminsEntryPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');

  const variables = {
    userData: {
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      image: image || 'user_default.jpg',
      location,
      phone,
      password,
      type: 'consumer',
      isAdmin: true,
    },
  };

  return (
    <Container>
      <Navbar />
      <Content>
        <Form mutation={REGISTER_USER} variables={variables} title={'Registeration'} buttonLabel={'Register'}>
          <div className="input-wrapper">
            <div className="input-wrapper-title">
              <label htmlFor="name">Name</label>
              <span></span>
            </div>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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

          <div className="inputs-row">
            <div className="input-wrapper">
              <div className="input-wrapper-title">
                <label>Main branch</label>
                <span></span>
              </div>
              <Dropdown name="location" options={locations} label="Location" action={setLocation} />
            </div>

            <div className="input-wrapper">
              <div className="input-wrapper-title">
                <label>&nbsp;</label>
                <span></span>
              </div>
              <input
                type="text"
                name="phone"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="input-wrapper">
            <div className="input-wrapper-title">
              <label htmlFor="image">Image</label>
              <span></span>
            </div>
            <FileUpload name={'image'} action={setImage} />
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

export default AdminsEntryPage;
