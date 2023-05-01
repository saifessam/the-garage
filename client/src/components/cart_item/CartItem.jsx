import { Link } from 'react-router-dom';
import Button from '../button/Button';
import { ReactComponent as TrashSVG } from '../../assets/svgs/trash.svg';
import './styles.css';
import NumberFormat from '../../functions/NumberFormat';
import Spinner from '../spinner/Spinner';
import { DELETE_CART_ITEM } from '../../graphql/Mutation';
import { useMutation } from '@apollo/client';

const CartItem = ({ id, itemId, image, title, quantity, price }) => {
  const [deleteCartItem, { loading }] = useMutation(DELETE_CART_ITEM, {
    onCompleted(data) {
      window.location.reload(false);
    },
    onError(error) {
      console.error(error);
    },
  });

  if (loading) <Spinner />;

  return (
    <div className="cart-item">
      <Link to={`/spare-parts/${itemId}`} className="cart-item-image">
        <img src={`/assets/spare/${image}`} alt="Cart item" />
      </Link>
      <div className="cart-item-details">
        <h4>{title}</h4>
        <span>Qunatity: {quantity}</span>
        <span>Price: {NumberFormat(price)} EGP</span>
        <span id="finalPrice">Final price: {price * quantity} EGP</span>
      </div>
      <div className="cart-item-actions">
        <Button type={'button'} action={() => deleteCartItem({ variables: { deleteCartItemId: id } })} data={'danger'} fit>
          <TrashSVG />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
