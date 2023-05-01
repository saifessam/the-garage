import { useMutation } from '@apollo/client';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { UserToken } from '../../context/UserToken';
import Table from '../table/Table';
import NumberFormat from '../../functions/NumberFormat';
import { CLEAR_CART, PLACE_ORDERS } from '../../graphql/Mutation';
import Button from '../button/Button';
import './styles.css';

const Receipt = ({ items = 0, totalItems = 0, data }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const { id: userId, isAdmin } = useContext(UserToken);

  const [clearCart] = useMutation(CLEAR_CART, {
    onCompleted(data) {
      window.location.reload(false);
    },
    onError(error) {
      console.error(error);
    },
  });

  const [placeOrders] = useMutation(PLACE_ORDERS, {
    onCompleted(data) {
      if (data.placeOrders.status) {
        clearCart({ variables: { clearCartId: userId } });
      } else {
        console.log(data.placeOrders.response);
      }
    },
    onError(error) {
      console.error(error);
    },
  });

  const handleSubmit = () => {
    console.log(data);
    if (data) {
      const variables = {
        orderData: {
          itemId: data[0]?.itemId,
          image: data[0]?.image,
          title: data[0]?.title,
          quantity: data[0]?.quantity,
          price: data[0]?.price,
          status: 'waiting',
          userId: isAdmin !== undefined ? userId : null,
          serviceProviderId: isAdmin === undefined ? userId : null,
        },
      };
      console.log(variables);
      placeOrders({ variables });
    } else {
      console.error('Unable to get mutation data');
    }
  };

  const getTotalPrice = () => {
    const itemFinalPrice = document.querySelectorAll('#finalPrice');
    let totalPrice = 0;
    itemFinalPrice.forEach((item) => {
      totalPrice += parseInt(item.innerHTML.split(' ')[2]);
    });
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    getTotalPrice();
  });

  const getFinalPrice = () => {
    const finalPrice = totalPrice + totalPrice * 0.12 + totalPrice * 0.14 + 50 * totalItems;
    return NumberFormat(finalPrice);
  };

  return (
    <div className="receipt">
      <div className="receipt-header">
        <h4>Cart Receipt</h4>
      </div>
      <div className="receipt-details">
        <Table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Statement</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td align="center">1</td>
              <td>Items</td>
              <td>{items}</td>
            </tr>
            <tr>
              <td align="center">2</td>
              <td>Total Items</td>
              <td>{totalItems}</td>
            </tr>
            <tr>
              <td align="center">3</td>
              <td>Total Items price</td>
              <td>{NumberFormat(totalPrice)} EGP</td>
            </tr>
            <tr>
              <td align="center">4</td>
              <td>Tax</td>
              <td>12%</td>
            </tr>
            <tr>
              <td align="center">5</td>
              <td>VAT</td>
              <td>14%</td>
            </tr>
            <tr>
              <td align="center">6</td>
              <td>Shipping</td>
              <td>50 EGP/item</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2">Final price</td>
              <td>{getFinalPrice()} EGP</td>
            </tr>
          </tfoot>
        </Table>
      </div>
      <div className="receipt-actions">
        <Button type={'button'} action={() => clearCart({ variables: { clearCartId: userId } })}>
          Clear cart
        </Button>
        <Button type={'button'} action={() => handleSubmit()} data={'procced'}>
          Place order
        </Button>
      </div>
    </div>
  );
};

export default Receipt;
