import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./redux/cartSlice";
import { FaStar } from "react-icons/fa"; // Import the star icon

function PizzaCard({
  name,
  description,
  isVeg,
  rating,
  price,
  imageUrl,
  size,
  toppings,
}) {
  const dispatch = useDispatch();
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);

  const pizzaCardStyle = {
    backgroundColor: "#ffffe0",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    width: "300px",
    overflow: "hidden",
    position: "relative",
    transition: "box-shadow 0.3s ease",
    cursor: "pointer",
  };

  const imageStyle = {
    position: "relative",
    width: "100%",
    height: "200px",
    overflow: "hidden",
  };

  const ratingOverlayStyle = {
    position: "absolute",
    top: "10px",
    left: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "white",
    padding: "4px 8px",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
  };

  const badgeStyle = {
    position: 'absolute',
    top: '8px',
    right: '8px',
    backgroundColor: 'white',
    color: 'white',
    padding: '4px',
    borderRadius: '4px',
    height: '13px',
    backgroundRepeat: 'no-repeat',
    width: '13px',
    fontSize: '12px',
    lineHeight: '1',
    backgroundImage: isVeg?'url(https://freesvg.org/img/1531813273.png)':'url(https://freesvg.org/img/1531813245.png)',
    backgroundSize: 'contain',
  };

  const textStyle = {
    padding: "16px",
  };

  const buttonStyle = {
    backgroundColor: "green",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    fontSize: "0.9rem",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
    marginTop: "10px",
  };

  const popupStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "20px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    borderRadius: "8px",
    zIndex: "9999",
  };

  const popupHeadingStyle = {
    marginTop: "0",
  };

  const popupButtonStyle = {
    backgroundColor: "green",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "background-color 0.3s ease",
  };

  const popupButtonHoverStyle = {
    backgroundColor: "darkgreen",
  };

  const backdropStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: "9998",
  };

  const handleAddToCartClick = () => {
    setPopupOpen(true);
  };

  const handleConfirmClick = () => {
    if (selectedSize && selectedToppings.length > 0) {
      dispatch(
        addToCart({
          name,
          price,
          size: selectedSize,
          toppings: selectedToppings,
        })
      );
      setPopupOpen(false);
      setSelectedSize(null);
      setSelectedToppings([]);
    }
  };

  const renderSizeOptions = () => {
    return size[0]?.items.map((item, index) => (
      <div key={index}>
        <input
          type="radio"
          name="size"
          value={item.size}
          checked={selectedSize === item.size}
          onChange={() => setSelectedSize(item.size)}
        />
        {item.size}
      </div>
    ));
  };

  const renderToppingsOptions = () => {
    return toppings[0]?.items.map((item, index) => (
      <div key={index}>
        <input
          type="checkbox"
          value={item.name}
          checked={selectedToppings.includes(item.name)}
          onChange={() => handleToppingChange(item.name)}
        />
        {item.name}
      </div>
    ));
  };

  const handleToppingChange = (toppingName) => {
    if (selectedToppings.includes(toppingName)) {
      setSelectedToppings(
        selectedToppings.filter((name) => name !== toppingName)
      );
    } else {
      setSelectedToppings([...selectedToppings, toppingName]);
    }
  };

  const renderRatingStars = () => {
    return (
      <FaStar color="#FFD700" size={16} />
    );
  };

  return (
    <div style={pizzaCardStyle}>
      <div style={imageStyle}>
        <img
          src={imageUrl}
          alt="Pizza"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={ratingOverlayStyle}>
          {renderRatingStars()}
          <span style={{ marginLeft: "5px" }}>{rating}</span>
        </div>
      </div>
      <div style={textStyle}>
        <h3>{name}</h3>
        <div style={badgeStyle}></div>
        <p>{description}</p>
        <div>${price}</div>
        <button style={buttonStyle} onClick={handleAddToCartClick}>
          Add to Cart
        </button>
      </div>
      {popupOpen && (
        <>
          <div style={backdropStyle} onClick={() => setPopupOpen(false)}></div>

          <div style={popupStyle}>
            {/* Size and Toppings selection here */}
            <h3 style={popupHeadingStyle}>Choose Size:</h3>
            {renderSizeOptions()}
            <h3 style={popupHeadingStyle}>Choose Toppings:</h3>
            {renderToppingsOptions()}
            <button
              style={{ ...popupButtonStyle, ...popupButtonHoverStyle }}
              onClick={handleConfirmClick}
            >
              Confirm
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default PizzaCard;
