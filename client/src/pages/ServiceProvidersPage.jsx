import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_APPROVED_SERVICE_PROVIDERS } from '../graphql/Query';
import Loader from '../components/loader/Loader';
import Container from '../components/container/Container';
import Navbar from '../components/navbar/Navbar';
import Navigator from '../components/navigator/Navigator';
import Button from '../components/button/Button';
import Content from '../components/content/Content';
import Wrapper from '../components/wrapper/Wrapper';
import EmptyMessage from '../components/empty_message/EmptyMessage';
import Card from '../components/card/Card';
import Footer from '../components/footer/Footer';

const ServiceProvidersPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const { loading: queryLoading } = useQuery(GET_APPROVED_SERVICE_PROVIDERS, {
    onCompleted(data) {
      setData(data.getApprovedServiceProviders);
    },
    onError(error) {
      console.error(error);
    },
  });

  const renderData = () => {
    if (data?.length > 0) {
      return data?.map((serviceProvider) => {
        return (
          <Card
            id={serviceProvider.id}
            type={serviceProvider.type}
            image={serviceProvider.images[0]}
            name={serviceProvider.name}
            detail1={serviceProvider.branches.location}
            detail2={`+2${serviceProvider.branches.phone}`}
            data={serviceProvider}
            key={serviceProvider.id}
          />
        );
      });
    } else {
      return <EmptyMessage message={'no data available'} />;
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
          <Button type={'button'} action={() => navigate('/service-providers/all')} data={'/service-providers/all'}>
            Services Providers
          </Button>
          <Button type={'button'} action={() => navigate('/cars/all')} data={'/cars/all'}>
            New & Used Cars
          </Button>
          <Button type={'button'} action={() => navigate('/cars-rental/all')} data={'/cars-rental/all'}>
            Cars Rental
          </Button>
          <Button type={'button'} action={() => navigate('/spare-parts/all')} data={'/spare-parts/all'}>
            Spare Parts
          </Button>
        </Navigator>
        <Content>
          <Wrapper start>{renderData()}</Wrapper>
        </Content>
        <Footer />
      </Container>
    </>
  );
};

export default ServiceProvidersPage;
