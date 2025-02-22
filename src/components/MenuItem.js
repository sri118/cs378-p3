import React from "react";
import "../App.css";

const MenuItem = ({ id, title, description, imageName, price, count, updateCart }) => {
  return (
    <div className="menu-item">
      <div className="menu-img-wrapper">
        <img src={`${process.env.PUBLIC_URL}/images/${imageName}`} alt={title} className="menu-img" />
      </div>

      <div className="menu-text">
        <h3 className="menu-title">{title}</h3>
        <p className="menu-desc">{description}</p>
        <div className="menu-footer">
          <span className="menu-price">${price.toFixed(2)}</span>
          <div className="menu-controls">
            <button className="btn btn-secondary" onClick={() => updateCart(id, -1)}>-</button>
            <span className="menu-count">{count}</span>
            <button className="btn btn-primary" onClick={() => updateCart(id, 1)}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
