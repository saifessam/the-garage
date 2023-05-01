import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../graphql/Query';
import { DELETE_USER } from '../graphql/Mutation';
import Loader from '../components/loader/Loader';
import Container from '../components/container/Container';
import Navbar from '../components/navbar/Navbar';
import Navigator from '../components/navigator/Navigator';
import Content from '../components/content/Content';
import Wrapper from '../components/wrapper/Wrapper';
import Table from '../components/table/Table';
import Button from '../components/button/Button';
import Footer from '../components/footer/Footer';
import { ReactComponent as TrashSVG } from '../assets/svgs/trash.svg';

const DashboardUsersPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const { loading: queryLoading } = useQuery(GET_ALL_USERS, {
    onCompleted(data) {
      setData(data.getAllUsers);
    },
    onError(error) {
      console.error(error);
    },
  });

  const [deleteUser, { loading: deleteUserLoading }] = useMutation(DELETE_USER, {
    onCompleted(data) {
      window.location.reload(false);
    },
    onError(error) {
      console.error(error);
    },
  });

  const renderData = () => {
    if (data?.length > 0) {
      return data?.map((user) => {
        return (
          <tr key={user.id}>
            <td style={{ textTransform: 'none' }}>{user.id}</td>
            <td>{user.name}</td>
            <td style={{ textTransform: 'none' }}>{user.email}</td>
            <td className="wrapped" style={{ textTransform: 'none' }}>
              {user.password}
            </td>
            <td className="wrapped" style={{ textTransform: 'none' }}>
              {user.image}
            </td>
            <td>{user.phone}</td>
            <td>{user.location}</td>
            <td>{user.isAdmin ? 'True' : 'False'}</td>
            <td>
              <div className="table-action-buttons">
                <Button action={() => deleteUser({ variables: { userId: user.id } })} type={'button'} data={'danger'}>
                  <TrashSVG />
                </Button>
              </div>
            </td>
          </tr>
        );
      });
    } else {
      return <tr></tr>;
    }
  };

  const renderLoader = () => {
    if (queryLoading || deleteUserLoading) return <Loader />;
  };

  return (
    <>
      {renderLoader()}
      <Container>
        <Navbar />
        <Navigator>
          <Button
            type={'button'}
            action={() => navigate('/admin/dashboard/service-providers')}
            data={'/admin/dashboard/service-providers'}
          >
            Services Providers
          </Button>
          <Button type={'button'} action={() => navigate('/admin/dashboard/users')} data={'/admin/dashboard/users'}>
            Users
          </Button>
          <Button type={'button'} action={() => navigate('/admin/dashboard/ads')} data={'/admin/dashboard/ads'}>
            Ads
          </Button>
        </Navigator>
        <Content>
          <Wrapper vertical={true}>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>E-mail</th>
                  <th>Pawssord</th>
                  <th>Image</th>
                  <th>Phone</th>
                  <th>Location</th>
                  <th>isAdmin</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{renderData()}</tbody>
            </Table>
          </Wrapper>
        </Content>
        <Footer />
      </Container>
    </>
  );
};

export default DashboardUsersPage;
