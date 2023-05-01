import { useContext, useState } from 'react';
import { UserToken } from '../context/UserToken';
import { useNavigate } from 'react-router-dom';
import Container from '../components/container/Container';
import Navbar from '../components/navbar/Navbar';
import Navigator from '../components/navigator/Navigator';
import Button from '../components/button/Button';
import Content from '../components/content/Content';
import Footer from '../components/footer/Footer';
import Logout from '../functions/Logout';
import Wrapper from '../components/wrapper/Wrapper';
import Form from '../components/form/Form';
import ProfileImage from '../components/profile_image/ProfileImage';
import { UPDATE_USER } from '../graphql/Mutation';
import { GET_OWNER_DETAILS } from '../graphql/Query';
import { useQuery } from '@apollo/client';
import Loader from '../components/loader/Loader';

const AccountDetailsPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [newName, setNewName] = useState(data?.name || null);
  const [newEmail, setNewEmail] = useState(data?.email || null);
  const [newPhone, setNewPhone] = useState(data?.phone || null);
  const [newLocation, setNewLocation] = useState(data?.location || null);
  const { id: userId, isAdmin } = useContext(UserToken);
  const { loading: queryLoading } = useQuery(GET_OWNER_DETAILS, {
    variables: { getOwnerDetailsId: userId },
    onCompleted(data) {
      console.log(data);
      setData(data.getOwnerDetails);
    },
    onError(error) {
      console.error(error);
    },
  });

  const variables = {
    userUpdateData: {
      id: userId,
      name: newName,
      email: newEmail,
      phone: newPhone,
      location: newLocation,
    },
  };

  const renderDashboard = () => {
    if (isAdmin) {
      return (
        <>
          <Button type={'button'} action={() => navigate('/admin/dashboard/service-providers')}>
            Dashboard
          </Button>
          <Button type={'button'} action={() => navigate('/admin')}>
            Register new admin
          </Button>
        </>
      );
    } else {
      return null;
    }
  };

  const decideFolder = () => {
    if (data?.image) {
      return 'users';
    } else if (data?.images) {
      return 'service_providers';
    }
  };

  const renderLoader = () => {
    if (queryLoading) return <Loader />;
  };

  return (
    <>
      {renderLoader()}
      <Container>
        <Navbar />
        <Navigator>
          <Button
            type={'button'}
            action={() => navigate('/account/profile/account-details')}
            data={'/account/profile/account-details'}
          >
            Account details
          </Button>
          <Button
            type={'button'}
            action={() => navigate('/account/profile/placed-ads')}
            data={'/account/profile/placed-ads'}
          >
            Placed ads
          </Button>
          <Button type={'button'} action={() => navigate('/account/profile/orders')} data={'/account/profile/orders'}>
            Orders
          </Button>
          {renderDashboard()}
          <Button type={'button'} action={() => Logout(navigate)}>
            Logout
          </Button>
        </Navigator>
        <Content horizontal={true}>
          <Wrapper centered={true}>
            <Form
              mutation={UPDATE_USER}
              variables={variables}
              title={'Account details'}
              buttonLabel={'Edit Profile'}
              noSubmit
            >
              <Wrapper>
                <Wrapper vertical={true}>
                  <div className="input-wrapper">
                    <div className="input-wrapper-title">
                      <label htmlFor="name">Name</label>
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={data?.name}
                      onChange={(e) => {
                        setNewName(e.target.value);
                      }}
                      disabled
                    />
                  </div>

                  <div className="input-wrapper">
                    <div className="input-wrapper-title">
                      <label htmlFor="email">E-mail</label>
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your e-mail"
                      value={data?.email}
                      onChange={(e) => {
                        setNewEmail(e.target.value);
                      }}
                      disabled
                    />
                  </div>

                  <div className="input-wrapper">
                    <div className="input-wrapper-title">
                      <label htmlFor="phone">Phone</label>
                    </div>
                    <input
                      type="text"
                      name="phone"
                      placeholder="Enter your phone"
                      value={data?.phone ? data?.phone : data?.branches.phone}
                      onChange={(e) => {
                        setNewPhone(e.target.value);
                      }}
                      disabled
                    />
                  </div>

                  <div className="input-wrapper">
                    <div className="input-wrapper-title">
                      <label htmlFor="location">Location</label>
                    </div>
                    <input
                      type="text"
                      name="location"
                      placeholder="Enter your location"
                      value={data?.location ? data?.location : data?.branches.location}
                      onChange={(e) => {
                        setNewLocation(e.target.value);
                      }}
                      disabled
                    />
                  </div>
                </Wrapper>
                <ProfileImage folder={decideFolder()} image={data?.image ? data?.image : data?.images[0]} />
              </Wrapper>
            </Form>
          </Wrapper>
        </Content>
        <Footer />
      </Container>
    </>
  );
};

export default AccountDetailsPage;
