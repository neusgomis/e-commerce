import React from 'react';

const Menu = ({ dispatch }) => {

  const menuItems = [
    {
      id: 1,
      name: 'Churros',
      description: 'Try a fresh spin on doughnuts by piping them Spanish-style and serving with a thick and indulgent homemade dark chocolate sauce.',
      image: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1051458_11-b045bbc.jpg?quality=90&webp=true&resize=440,400',
      price: 8
    },
    {
      id: 2,
      name: 'Paella',
      description: 'Choose the freshest ingredients for a world-class paella with our ultimate recipe. Serve this classic Spanish seafood dish in the pan to impress your guests',
      image: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/paella-308c905.jpg?quality=90&webp=true&resize=440,400',
      price: 25
    },
    {
      id: 3,
      name: 'Torrijas',
      description: 'Torrijas are basically Spanish ‘French toast’, or eggy bread in English! Serve with honey and yogurt for breakfast, or fruit and ice cream for dessert',
      image: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/torrijas-with-sherry-261eb72.jpg?quality=90&webp=true&resize=440,400',
      price: 25
    },
    {
      id: 4,
      name: 'Patatas Bravas',
      description: 'Make this classic tapas dish part of your cooking repertoire – simply potatoes in a spicy tomato sauce.',
      image: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-373482_12-3705798.jpg?quality=90&webp=true&resize=440,400',
      price: 13
    },
    {
      id: 5,
      name: 'Tortilla',
      description: 'Make a classic Spanish omelette filled with pan-fried potatoes and onion. It makes a delicious light vegetarian meal or an easy tapas dish',
      image: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/spanish-tortilla-4493c5b.jpg?quality=90&webp=true&resize=440,400',
      price: 15
    }
  ];

  const handleAddToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item, quantity: 1 });
  };

  return (
    <div>
      <h1 className="text-center text-3xl">Menu</h1>
      <div className="cards">
        {menuItems.map(item => (
          <div key={item.id} className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
            <img className="h-48 w-full object-cover object-center" src={item.image} alt={item.name}></img>
            <div className="p-4">
              <h2 className="mb-2 text-lg font-medium dark:text-white text-red-700">{item.name}</h2>
              <p className="mb-2 long-description text-base dark:text-gray-300 text-gray-500">{item.description}</p>
              <div className="flex items-center">
                <p className="mr-2 text-lg font-semibold text-red-800 dark:text-white">${item.price}</p>
                <button
                  onClick={()=> handleAddToCart(item)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-auto">
                    Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Menu;
