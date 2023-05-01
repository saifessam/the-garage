import { useState } from 'react';
import Container from '../components/container/Container';
import Navbar from '../components/navbar/Navbar';
import Content from '../components/content/Content';
import Form from '../components/form/Form';
import Footer from '../components/footer/Footer';
import { REGISTER_SERVICES_PROVIDER } from '../graphql/Mutation';
import types from '../data/Types.json';
import locations from '../data/Locations.json';
import days from '../data/Days.json';
import Dropdown from '../components/dropdown/Dropdown';
import Checkbox from '../components/checkbox/Checkbox';
import FileUpload from '../components/file_upload/FileUpload';
import PasswordInput from '../components/password_input/PasswordInput';

const SubmitPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [branch, setBranch] = useState({
    location: '',
    phone: '',
  });
  const [images, setImages] = useState([]);
  const [type, setType] = useState('');
  const [workTime, setWorkTime] = useState({
    open: '09:00',
    close: '17:00',
  });
  const [offDays, setOffDays] = useState([]);
  const [description, setDescription] = useState('');

  const getOffDays = (e) => {
    let updatedList = [...offDays];
    if (e.target.checked) {
      updatedList = [...offDays, e.target.value];
    } else {
      updatedList.splice(offDays.indexOf(e.target.value), 1);
    }
    setOffDays(updatedList);
  };

  const variables = {
    serviceProviderData: {
      name,
      email,
      password,
      branch,
      images,
      type,
      workTime,
      offDays,
      description,
      approved: false,
    },
  };

  return (
    <Container>
      <Navbar />
      <Content>
        <Form
          mutation={REGISTER_SERVICES_PROVIDER}
          variables={variables}
          prev="/account/register"
          title={'Submition'}
          next="/account/login"
          buttonLabel={'Submit'}
        >
          <div className="input-wrapper">
            <div className="input-wrapper-title">
              <label htmlFor="name">Name</label>
              <span></span>
            </div>
            <input type="text" name="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="input-wrapper">
            <div className="input-wrapper-title">
              <label htmlFor="email">E-mail</label>
              <span></span>
            </div>
            <input
              type="email"
              name="email"
              placeholder="Enter e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <div className="input-wrapper-title">
              <label htmlFor="password">Password</label>
              <span></span>
            </div>
            <PasswordInput
              name={'password'}
              placeholder={'Enter password'}
              value={password}
              action={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="inputs-row">
            <div className="input-wrapper">
              <div className="input-wrapper-title">
                <label>Main branch</label>
                <span></span>
              </div>
              <Dropdown
                name="location"
                options={locations}
                label="Location"
                action={setBranch}
                current={branch}
                property={'location'}
              />
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
                value={branch.phone}
                onChange={(e) => setBranch({ ...branch, [e.target.name]: e.target.value })}
              />
            </div>
          </div>

          <div className="input-wrapper">
            <div className="input-wrapper-title">
              <label htmlFor="image">Image</label>
              <span></span>
            </div>
            <FileUpload name={'images'} action={setImages} multiple={true} />
          </div>

          <div className="input-wrapper">
            <div className="input-wrapper-title">
              <label htmlFor="type">Type</label>
              <span></span>
            </div>
            <Dropdown name="type" options={types} label="Organization type" action={setType} />
          </div>

          <div className="inputs-row">
            <div className="input-wrapper">
              <div className="input-wrapper-title">
                <label htmlFor="openingTime">Opening time</label>
                <span></span>
              </div>
              <input
                type="time"
                name="open"
                onChange={(e) => setWorkTime({ ...workTime, [e.target.name]: e.target.value })}
                defaultValue={workTime.open}
              />
            </div>

            <div className="input-wrapper">
              <div className="input-wrapper-title">
                <label htmlFor="closingTime">Closing time</label>
                <span></span>
              </div>
              <input
                type="time"
                name="close"
                onChange={(e) => setWorkTime({ ...workTime, [e.target.name]: e.target.value })}
                defaultValue={workTime.close}
              />
            </div>
          </div>

          <div className="input-wrapper">
            <div className="input-wrapper-title">
              <label htmlFor="offDays">Off days</label>
              <span></span>
            </div>
            <Checkbox checkboxs={days} name={'offDays'} action={(e) => getOffDays(e)} />
          </div>

          <div className="input-wrapper">
            <div className="input-wrapper-title">
              <label htmlFor="description">Description</label>
              <span></span>
            </div>
            <textarea
              name="description"
              placeholder="Give a brief description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </Form>
      </Content>
      <Footer />
    </Container>
  );
};

export default SubmitPage;
