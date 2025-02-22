import React from "react";
import "../App.css";

const OrderModal = ({ orderItems, total, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Order Placed!</h2>
        <ul className="order-list">
          {orderItems.map((item) => (
            <li key={item.id}>
              {item.title} x {item.quantity} = ${item.totalPrice.toFixed(2)}
            </li>
          ))}
        </ul>
        <h3>Total: ${total}</h3>
        <button className="btn btn-primary" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default OrderModal;
