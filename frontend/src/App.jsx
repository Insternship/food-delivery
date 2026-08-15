import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [foods, setFoods] = useState([]);
  

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
            <h3>{food.name}</h3>

            <p>
              <strong>Price:</strong> ₹{food.price}
            </p>

            <p>
              <strong>Category:</strong> {food.category}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;