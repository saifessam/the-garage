import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_ADS } from '../graphql/Query';
import { ADS_APPROVAL, DELETE_AD } from '../graphql/Mutation';
import Container from '../components/container/Container';
import Navbar from '../components/navbar/Navbar';
import Navigator from '../components/navigator/Navigator';
import Content from '../components/content/Content';
import Wrapper from '../components/wrapper/Wrapper';
import Loader from '../components/loader/Loader';
import Table from '../components/table/Table';
import Button from '../components/button/Button';
import Footer from '../components/footer/Footer';
import NumberFormat from './../functions/NumberFormat';
import { ReactComponent as TicktSVG } from '../assets/svgs/tick.svg';
import { ReactComponent as CloseSVG } from '../assets/svgs/close.svg';
import { ReactComponent as TrashSVG } from '../assets/svgs/trash.svg';

const DashboardAdsPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const { loading: queryLoading } = useQuery(GET_ALL_ADS, {
    onCompleted(data) {
      setData(data.getAllAds);
    },
    onError(error) {
      console.error(error);
    },
  });

  const [approval, { loading: approvalLoading }] = useMutation(ADS_APPROVAL, {
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

  const [deleteAd, { loading: deleteAdLoading }] = useMutation(DELETE_AD, {
    onCompleted(data) {
      window.location.reload(false);
    },
    onError(error) {
      console.error(error);
    },
  });

  const renderData = () => {
    if (data?.length > 0) {
      return data?.map((ad) => {
        return (
          <tr key={ad.id}>
            <td style={{ textTransform: 'none' }}>{ad.id}</td>
            <td>{ad.title}</td>
            <td className="wrapped" style={{ textTransform: 'none' }}>
              {ad.images.join(', ')}
            </td>
            <td>{NumberFormat(ad.price)} EGP</td>
            <td>
              {ad.avilability ? (
                <span className="table-data-green">Available</span>
              ) : (
                <span className="table-data-red">Unavailable</span>
              )}
            </td>
            <td className="wrapped">{ad.description}</td>
            <td>{ad.adType}</td>
            <td>{ad.make}</td>
            <td>{ad.model}</td>
            <td>{ad.year}</td>
            <td>{ad.color}</td>
            <td>{ad.transmission}</td>
            <td>{ad.condition}</td>
            <td>{ad.carType}</td>
            <td>{ad.features.join(', ')}</td>
            <td>{ad.location}</td>
            <td>
              {ad.approved ? <span className="table-data-green">True</span> : <span className="table-data-red">False</span>}
            </td>
            <td>
              <div className="table-action-buttons">
                <Button action={() => approval({ variables: { adId: ad.id } })} type={'button'} fit={true}>
                  {ad.approved ? <CloseSVG /> : <TicktSVG />}
                </Button>
                <Button action={() => deleteAd({ variables: { adId: ad.id } })} type={'button'} data={'danger'}>
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
    if (queryLoading || approvalLoading || deleteAdLoading) return <Loader />;
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
                  <th>Title</th>
                  <th>Images</th>
                  <th>Price</th>
                  <th>Avilability</th>
                  <th className="wrapped">Description</th>
                  <th>AdType</th>
                  <th>Make</th>
                  <th>Model</th>
                  <th>Year</th>
                  <th>Color</th>
                  <th>Transmission</th>
                  <th>Condition</th>
                  <th>CarType</th>
                  <th>Features</th>
                  <th>Location</th>
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

export default DashboardAdsPage;
