import { useContext, useState } from 'react';
import { UserToken } from '../context/UserToken';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ORDERS } from '../graphql/Query';
import Container from '../components/container/Container';
import Navbar from '../components/navbar/Navbar';
import Navigator from '../components/navigator/Navigator';
import Button from '../components/button/Button';
import Content from '../components/content/Content';
import Wrapper from '../components/wrapper/Wrapper';
import Footer from '../components/footer/Footer';
import Logout from '../functions/Logout';
import Loader from '../components/loader/Loader';
import EmptyMessage from '../components/empty_message/EmptyMessage';
import CartItem from '../components/cart_item/CartItem';

const OrdersPage = () => {
  const { id, isAdmin } = useContext(UserToken);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const { loading: queryLoading } = useQuery(GET_ORDERS, {
    variables: { getOrdersId: id },
    onCompleted(data) {
      console.log(data);
      setData(data.getOrders);
    },
    onError(error) {
      console.error(error);
    },
  });

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

  const renderData = () => {
    if (data?.length > 0) {
      return data?.map((order) => {
        return (
          <CartItem
            id={order.id}
            itemId={order.itemId}
            image={order.image}
            title={order.title}
            quantity={order.quantity}
            price={order.price}
            key={order.id}
          />
        );
      });
    } else {
      <EmptyMessage message={'no data available'} />;
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
        <Content>
          <Wrapper start>{renderData()}</Wrapper>
        </Content>
        <Footer />
      </Container>
    </>
  );
};

export default OrdersPage;
