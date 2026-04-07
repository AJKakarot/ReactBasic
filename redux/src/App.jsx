// // App.jsx
// import { useSelector, useDispatch } from "react-redux";
// import { increment, decrement } from "./slice/counterSlice";

// function App() {
//   const count = useSelector((state) => state.counter.value);
//   const dispatch = useDispatch();

//   return (
//     <div>
//       <h1>{count}</h1>
//       <button onClick={() => dispatch(increment())}>+</button>
//       <button onClick={() => dispatch(decrement())}>-</button>
//     </div>
//   );
// }

// export default App;

import { useDispatch, useSelector } from "react-redux";

import { addToCart, removeFromCart } from "./slice/cartSlice";

/* ----------- MAIN UI ----------- */
export default function App() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const products = [
    { id: 1, name: "Shoes" },
    { id: 2, name: "T-Shirt" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛒 Simple Cart</h1>

      {/* Products */}
      <h2>Products</h2>
      {products.map((item) => (
        <div key={item.id}>
          {item.name}
          <button onClick={() => dispatch(addToCart(item))}>
            Add
          </button>
        </div>
      ))}

      <hr />

      {/* Cart */}
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id}>
            {item.name}
            <button onClick={() => dispatch(removeFromCart(item.id))}>
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}




// I implemented Add to Cart using Redux Toolkit. 
// I created a slice where I manage cart state globally.
//  When user clicks add, 
//  I dispatch an action that pushes the item into the cart array. 
//  For removal,
//  I filter out the item using its ID.

// Store → where data is stored
// Slice → logic (reducers + actions)
// Action → what to do
// useDispatch → send action
// useSelector → read data