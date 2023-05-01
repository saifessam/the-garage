import { GET_CART_ITEMS } from '../graphql/Query';
import Container from '../components/container/Container';
import Navbar from '../components/navbar/Navbar';
import Content from '../components/content/Content';
import Footer from '../components/footer/Footer';
import Wrapper from '../components/wrapper/Wrapper';
import CartItem from '../components/cart_item/CartItem';
import Receipt from '../components/receipt/Receipt';
import EmptyMessage from '../components/empty_message/EmptyMessage';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useContext } from 'react';
import { UserToken } from '../context/UserToken';
import Loader from '../components/loader/Loader';

const CartPage = () => {
  const { id } = useContext(UserToken);
  const [data, setData] = useState(null);
  const { loading: queryLoading } = useQuery(GET_CART_ITEMS, {
    variables: { getCartItemsId: id },
    onCompleted(data) {
      setData(data?.getCartItems);
    },
    onError(error) {
      console.error(error);
    },
  });

  const renderLoader = () => {
    if (queryLoading) return <Loader />;
  };

  const renderData = () => {
    if (data) {
      if (data.length > 0) {
        return data?.map((item) => {
          return (
            <CartItem
              id={item.id}
              itemId={item.itemId}
              image={item.image}
              title={item.title}
              quantity={item.quantity}
              price={item.price}
              key={item.id}
            />
          );
        });
      } else {
        return <EmptyMessage message={'your cart is empty'} />;
      }
    }
  };

  const getTotalItems = () => {
    let totalItems = 0;
    data?.forEach((item) => {
      totalItems += parseInt(item.quantity);
    });
    return totalItems;
  };

  return (
    <>
      {renderLoader()}
      <Container>
        <Navbar />
        <Content horizontal={true}>
          <Wrapper vertical={true}>{renderData()}</Wrapper>
          {data?.length > 0 ? <Receipt items={data?.length} totalItems={getTotalItems()} data={data} /> : null}
        </Content>
        <Footer />
      </Container>
    </>
  );
};

export default CartPage;
