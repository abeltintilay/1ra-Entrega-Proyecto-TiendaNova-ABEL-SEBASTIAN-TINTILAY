import { useState, useContext, createContext } from "react";

export const CartContext = createContext();

// Custom hook para usar el contexto del carrito- hook personalizado para acceder al contexto del carrito

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};
// aqui comprobamos si el contexto esta siendo usado dentro de un proveedor, si no, lanzamos un error para evitar problemas de uso incorrecto del hook.


// proveedor del carrito- componente que envuelve a los componentes que necesitan acceder al contexto del carrito
export const CartProvider = ({ children }) => {
      const [cart, setCart] = useState([]);
      
      const addToCart = (product, quantity) => {
      
        // si el producto existe en el carrito, actualizamos su cantidad, si no, lo agregamos al carrito con la cantidad especificada.
        const itemInCart = cart.find(item => item.id === product.id);
              if (itemInCart) {
                  const updatedCart = cart.map(item =>
                      item.id === product.id
                      ? { ...item, quantity: item.quantity + quantity }
                      : item  // los : es si es falso la condicion, entonces se mantiene el item sin cambios
                      );
                          setCart(updatedCart);
              } else {
                      setCart(prevCart => [...prevCart, { ...product, quantity }]);
              }
      };


      // para vaciar el carrito
      const clearCart = () => {
            setCart([]);
      };

      // total de productos en el carrito, sumando las cantidades de cada item. El acc es el acumulador que va sumando las cantidades, y el item es cada producto en el carrito. El 0 es el valor inicial del acumulador, es decir, si el carrito esta vacio, la cantidad total sera 0.
      const getCartQuantity = () => {
            return cart.reduce((acc, item) => acc + item.quantity, 0);};

// Funcion de reduccion, es para saber la cantidad total de productos en el carrito, sumando las cantidades de cada item. El acc es el acumulador que va sumando las cantidades, y el item es cada producto en el carrito.
// acc es el acumulador que va sumando las cantidades, y el item es cada producto en el carrito. El 0 es el valor inicial del acumulador, es decir, si el carrito esta vacio, la cantidad total sera 0.
      
      // este es la cantidad total del carrito, sumando el precio de cada producto multiplicado por su cantidad. El acc es el acumulador que va sumando los totales, y el item es cada producto en el carrito. El 0 es el valor inicial del acumulador, es decir, si el carrito esta vacio, el total sera 0.
      const getCartTotal = () => {
            return cart.reduce((acc, item) => acc + item.precio * item.quantity,0);
            };

//**********  Cantidad actual total de un producto  */

const getCantidadActual = (productId) => {
      const item = cart.find(item => item.id === productId);
      return item ? item.quantity : 0;}



      return (
              <CartContext.Provider
                        value={{ 
                              cart,
                              addToCart,
                              clearCart,
                              getCartQuantity,
                              getCartTotal,
                              getCantidadActual
                        }}>

                      {children}
              </CartContext.Provider>
              );
};
