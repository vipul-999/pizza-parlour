import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './redux/cartSlice';
import PizzaCard from "./PizzaCard";
import './App.css'; // Import your CSS file

function App() {
  const [pizzaData, setPizzaData] = useState([]);
  const [showVegOnly, setShowVegOnly] = useState(false);
  const [sortType, setSortType] = useState(""); // New state for sorting
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart.cart);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://run.mocky.io/v3/ec196a02-aaf4-4c91-8f54-21e72f241b68"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();

        let sortedPizzas = showVegOnly
          ? jsonData.filter(pizza => pizza.isVeg)
          : jsonData;

        if (sortType === "priceLowToHigh") {
          sortedPizzas = sortedPizzas.sort((a, b) => a.price - b.price);
        } else if (sortType === "priceHighToLow") {
          sortedPizzas = sortedPizzas.sort((a, b) => b.price - a.price);
        } else if (sortType === "rating") {
          sortedPizzas = sortedPizzas.sort((a, b) => b.rating - a.rating);
        }

        setPizzaData(sortedPizzas);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [showVegOnly, sortType]);

  return (
    <div className="App">
      <header>
        <label>
          <input
            type="checkbox"
            checked={showVegOnly}
            onChange={() => setShowVegOnly(!showVegOnly)}
          />
          Show Veg Only
        </label>
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="priceLowToHigh">Price Low to High</option>
          <option value="priceHighToLow">Price High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </header>
      <main>
        <h2>Pizza Menu</h2>
        <div className="pizza-list">
          {pizzaData.map((pizza) => (
            <PizzaCard
              key={pizza.id}
              id={pizza.id}
              name={pizza.name}
              description={pizza.description}
              isVeg={pizza.isVeg}
              rating={pizza.rating}
              price={pizza.price}
              imageUrl={pizza.img_url}
              {...pizza}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
