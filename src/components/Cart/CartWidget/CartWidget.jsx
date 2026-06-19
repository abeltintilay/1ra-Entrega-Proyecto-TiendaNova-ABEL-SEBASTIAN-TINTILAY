import {useCart} from '../../../context/CartContext';
import {Link} from 'react-router-dom';

function CartWidget() {
  const { cart } = useCart();

  const cantidadProductos = cart.reduce((acc, item) => acc + item.quantity, 0); 

  return (
    <Link to="/carrito">
      🛒 {cantidadProductos}
    </Link>
  );
}

export default CartWidget;