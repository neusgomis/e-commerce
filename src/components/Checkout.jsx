import React from 'react';

const Checkout = ({cartItems, total, dispatch}) => {

  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  const handleRemoveItem = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item});
  };

  const handleAddItem = (item) => {
    dispatch({ type: 'ADD_MORE_TO_CART', payload: item});
  };

  return (
    <div className="my-20 ml-5 relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
      <h1 className="text-center text-2xl">Your Order</h1>
      <ul className="w-full">
        {cartItems.map(item => (
          <li key={item.id} className="flex items-center justify-between border-b-2 border-neutral-100 border-opacity-100 p-4  dark:border-white/10">
            <div className="flex items-center">
              <p className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                {item.name}
              </p>
                {item.quantity && <p className="bg-red-500 text-white font-bold rounded px-1">{item.quantity}</p>}
            </div>
            <div className="flex">
              <svg onClick={() => handleAddItem(item)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#16a34a" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <svg onClick={() => handleRemoveItem(item)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#dc2626" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-around">
        <h4 className="font-bold">Total: <span>${total}</span></h4>
          <div className="checkout-buttons">
          <button className="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 m-4 rounded ml-auto" onClick={handleReset}>Reset</button>
          <button className="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-auto">Order</button>
        </div>
      </div>
    </div>
  )
}

export default Checkout;
