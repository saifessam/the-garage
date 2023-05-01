import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_SERVICE_PROVIDERS } from '../graphql/Query';
import { DELETE_SERVICES_PROVIDER, SERVICES_PROVIDERS_APPROVAL } from '../graphql/Mutation';
import Container from '../components/container/Container';
import Navbar from '../components/navbar/Navbar';
import Navigator from '../components/navigator/Navigator';
import Content from '../components/content/Content';
import Wrapper from '../components/wrapper/Wrapper';
import Loader from '../components/loader/Loader';
import Table from '../components/table/Table';
import Button from '../components/button/Button';
import Footer from '../components/footer/Footer';
import To24hrFormat from '../functions/To24hrFormat';
import { ReactComponent as TicktSVG } from '../assets/svgs/tick.svg';
import { ReactComponent as CloseSVG } from '../assets/svgs/close.svg';
import { ReactComponent as TrashSVG } from '../assets/svgs/trash.svg';

const DashboardServiceProvidersPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const { loading: queryLoading } = useQuery(GET_ALL_SERVICE_PROVIDERS, {
    onCompleted(data) {
      setData(data.getAllServiceProviders);
    },
    onError(error) {
      console.error(error);
    },
  });

  const [approval, { loading: approvalLoading }] = useMutation(SERVICES_PROVIDERS_APPROVAL, {
    onCompleted(data) {
      const status = Object.entries(data)[0][1].status;
      const response = Object.entries(data)[0][1].response;
      if (status) {
        window.location.reload(false);
      } else {
        console.log({ status, response });
      }
    },
    onError(error) {
      console.error(error);
    },
  });

  const [deleteServiceProvider, { loading: deleteServiceProviderLoading }] = useMutation(DELETE_SERVICES_PROVIDER, {
    onCompleted(data) {
      window.location.reload(false);
    },
    onError(error) {
      console.error(error);
    },
  });

  const renderData = () => {
    if (data?.length > 0) {
      return data?.map((serviceProvider) => {
        return (
          <tr key={serviceProvider.id}>
            <td style={{ textTransform: 'none' }}>{serviceProvider.id}</td>
            <td>{serviceProvider.name}</td>
            <td style={{ textTransform: 'none' }}>{serviceProvider.email}</td>
            <td className="wrapped" style={{ textTransform: 'none' }}>
              {serviceProvider.images.join(', ')}
            </td>
            <td>{serviceProvider.type}</td>
            <td>{To24hrFormat(serviceProvider.workTime.open)}</td>
            <td>{To24hrFormat(serviceProvider.workTime.close)}</td>
            <td>{serviceProvider.offDays.join(', ')}</td>
            <td>{serviceProvider.branches.location}</td>
            <td>{serviceProvider.branches.phone}</td>
            <td>{serviceProvider.description}</td>
            <td>
              {serviceProvider.approved ? (
                <span className="table-data-green">True</span>
              ) : (
                <span className="table-data-red">False</span>
              )}
            </td>
            <td>
              <div className="table-action-buttons">
                <Button
                  action={() => approval({ variables: { serviceProviderId: serviceProvider.id } })}
                  type={'button'}
                  fit={true}
                >
                  {serviceProvider.approved ? <CloseSVG /> : <TicktSVG />}
                </Button>
                <Button
                  action={() => deleteServiceProvider({ variables: { serviceProviderId: serviceProvider.id } })}
                  type={'button'}
                  data={'danger'}
                >
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
    if (queryLoading || approvalLoading || deleteServiceProviderLoading) return <Loader />;
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
                  <th>Images</th>
                  <th>Type</th>
                  <th>Opens at</th>
                  <th>Closes at</th>
                  <th>Off days</th>
                  <th>Location</th>
                  <th>Phone</th>
                  <th>Description</th>
                  <th>Approved</th>
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

export default DashboardServiceProvidersPage;
