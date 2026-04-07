import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice";

const products = [
  { id: 1, name: "Shoes" },
  { id: 2, name: "T-Shirt" },
];

function Product() {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Products</h2>

      {products.map((item) => (
        <div key={item.id}>
          {item.name}
          <button onClick={() => dispatch(addToCart(item))}>
            Add
          </button>
        </div>
      ))}
    </div>
  );
}

export default Product;