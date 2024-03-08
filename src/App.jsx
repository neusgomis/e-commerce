import React, { useReducer } from 'react';

import Menu from './components/Menu';
import Checkout from './components/Checkout';

const initialState = {
  cartItems: [],
  total: 0
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      const newItem = action.payload;
      const existingItemIndex = state.cartItems.findIndex(item => item.name === newItem.name);
      /* If the item being added is already in the cart, increase its quantity */
      if (existingItemIndex !== -1) {
        const updatedCartItems = state.cartItems.map((item, index) => {
          if (index === existingItemIndex) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        return {
          ...state,
          cartItems: updatedCartItems,
          total: state.total + newItem.price
        };
      } else {
        /* If not in the cart, set quantity to 1 and add to the list */
        return {
          ...state,
          cartItems: [...state.cartItems, { ...newItem, quantity: 1 }],
          total: state.total + newItem.price
        };
      }
    case 'REMOVE_FROM_CART':
      /* If item removed from cart decrease quantity */
      const updatedCartItems = state.cartItems.map(item => {
        if (item.name === action.payload.name) {
          return { ...item, quantity: (item.quantity || 1) - 1 }; // Decrease quantity by 1, ensuring it's at least 1
        }
        return item;
      }).filter(item => item.quantity !== 0); // Remove items with quantity 0
      const removedItem = state.cartItems.find(item => item.name === action.payload.name);
      const itemToRemovePrice = removedItem ? removedItem.price : 0;
      return {
        ...state,
        cartItems: updatedCartItems,
        total: state.total - itemToRemovePrice
      };
    case 'ADD_MORE_TO_CART':
      /* If extra item added increase quantity */
      return {
        ...state,
        cartItems: state.cartItems.map(item => {
          if (item.name === action.payload.name) {
            return { ...item, quantity: (item.quantity || 1) + 1 }; // Increase quantity by 1, ensuring it's at least 1
          }
          return item;
        }),
        total: state.total + action.payload.price
      };
    case 'RESET':
      /* Reset cart back to 0 */
      return {
        ...state,
        cartItems: [],
        total: 0
      };
    default:
      return state;
  }
}


const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="flex justify-center main-container">
      {/* Render Menu Component */}
      <div className="menu">
        <Menu dispatch={dispatch} />
      </div>
      {/* Render Checkout Component */}
      <div className="checkout">
        <Checkout dispatch = {dispatch} cartItems={state.cartItems} total={state.total}/>
      </div>
    </div>
  )
}

export default App;
