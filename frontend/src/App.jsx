import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState([]);

  // Add food to cart
  const addToCart = (food) => {
    setCart([
      ...cart,
      {
        food: food._id,
        name: food.name,
        price: food.price,
        quantity: 1,
      },
    ]);
  };

  // Place order
  const placeOrder = async () => {
    try {
      const orderItems = cart.map((item) => ({
        food: item.food,
        quantity: item.quantity,
      }));

      const response = await axios.post(
        "http://localhost:5000/api/orders",
        {
          items: orderItems,
        }
      );

      console.log(response.data);

      alert("Order placed successfully!");

      setCart([]);
    } catch (error) {
      console.log(error);
      alert("Failed to place order");
    }
  };

  // Get foods from backend
  useEffect(() => {
    const getFoods = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/foods"
        );

        console.log(response.data);
        setFoods(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getFoods();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>🍔 Food Delivery</h1>

      <h2>Available Foods</h2>

      {foods.length === 0 ? (
        <p>No foods available</p>
      ) : (
        foods.map((food) => (
          <div
            key={food._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          >
            
            <img
  src={food.image}
  alt={food.name}
  width="200"
  height="150"
  style={{
    borderRadius: "8px",
    objectFit: "cover"
  }}
/>
<p>{food.image}</p>
            <h3>{food.name}</h3>

            <p>
              <strong>Price:</strong> ₹{food.price}
            </p>

            <p>
              <strong>Category:</strong> {food.category}
            </p>
            <p>
  <strong>Stock:</strong> {food.stock}
</p>

            <button onClick={() => addToCart(food)}>
              Add to Cart
            </button>
          </div>
        ))
      )}

      <hr />

      <h2>🛒 Cart</h2>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index}>
              <p>
                {item.name} - ₹{item.price} × {item.quantity}
              </p>
            </div>
          ))}

          <button onClick={placeOrder}>
            Place Order
          </button>
        </>
      )}
    </div>
    
  );
  
}


export default App;
