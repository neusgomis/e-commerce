import React, { useReducer } from 'react';

import Menu from './components/Menu';
import Checkout from './components/Checkout';

const initialState = {
  cartItems: [],
  total: 0
};

/* Helper Function to Update Cart */
function updateCartItems(cartItems, newItem, quantityChange) {
  const existingItemIndex = cartItems.findIndex(item => item.name === newItem.name);
  if (existingItemIndex !== -1) {
    return cartItems.map((item, index) => {
      if (index === existingItemIndex) {
        return {...item, quantity: item.quantity + quantityChange };
      }
      return item;
    });
  } else {
    return [...cartItems, {...newItem, quantity: 1 }];
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      const newItemToAdd = action.payload;
      const addedItemPrice = newItemToAdd.price;
      return {
        ...state,
        cartItems: updateCartItems(state.cartItems, newItemToAdd, 1),
        total: state.total + addedItemPrice
      };
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
      const newItemToAddMore = action.payload;
      const addedItemPriceToAddMore = newItemToAddMore.price;
      return {
        ...state,
        cartItems: updateCartItems(state.cartItems, newItemToAddMore, 1),
        total: state.total + addedItemPriceToAddMore
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
