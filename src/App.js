import React, { useState } from "react";
import "./App.css";
import MenuItem from "./components/MenuItem";
import OrderModal from "./components/OrderModal"; // Import the modal

const menuItems = [
  { id: 1, title: "Gyoza", description: "Japanese dumplings", imageName: "gyoza.png", price: 5.99 },
  { id: 2, title: "Sushi", description: "Japanese rice rolls", imageName: "sushi.png", price: 6.99 },
  { id: 3, title: "Ramen", description: "Japanese noodle soup", imageName: "ramen.png", price: 7.99 },
  { id: 4, title: "Matcha Cake", description: "Japanese green tea cake", imageName: "matcha-cake.png", price: 4.99 },
  { id: 5, title: "Mochi", description: "Japanese rice cake", imageName: "mochi.png", price: 3.99 },
  { id: 6, title: "Yakitori", description: "Japanese skewered chicken", imageName: "yakitori.png", price: 2.99 },
  { id: 7, title: "Takoyaki", description: "Japanese octopus balls", imageName: "takoyaki.png", price: 5.99 },
  { id: 8, title: "Sashimi", description: "Japanese raw fish", imageName: "sashimi.png", price: 8.99 },
  { id: 9, title: "Okonomiyaki", description: "Japanese savory pancake", imageName: "okonomiyaki.png", price: 6.99 },
  { id: 10, title: "Katsu Curry", description: "Japanese curry with fried pork", imageName: "katsu-curry.png", price: 9.99 }
];

function App() {
  const [cart, setCart] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);

  const updateCart = (id, change) => {
    setCart((prevCart) => {
      const updatedCount = (prevCart[id] || 0) + change;
      if (updatedCount < 0) return prevCart;
      return { ...prevCart, [id]: updatedCount };
    });
  };

  const calculateTotal = () => {
    return menuItems.reduce((total, item) => total + (cart[item.id] || 0) * item.price, 0).toFixed(2);
  };

  const handleOrder = () => {
    const orderedItems = menuItems
      .filter((item) => cart[item.id])
      .map((item) => ({
        id: item.id,
        title: item.title,
        quantity: cart[item.id],
        totalPrice: cart[item.id] * item.price
      }));

    if (orderedItems.length === 0) {
      alert("No items in cart.");
      return;
    }

    setOrderDetails(orderedItems);
    setIsModalOpen(true);
  };

  const clearCart = () => setCart({});

  return (
    <div className="container my-4">
      <header className="text-center">
        <img src={`${process.env.PUBLIC_URL}/images/jap.jpg`} alt="Japanese Cuisine Logo" className="logo img-fluid" />
        <h1 className="decorative-text">Authentic Japanese Cuisine</h1>
        <h2 className="subtitle-text">Experience the Art of Japanese Flavors!</h2>
      </header>

      <main className="menu">
        {menuItems.map((item) => (
          <MenuItem key={item.id} {...item} count={cart[item.id] || 0} updateCart={updateCart} />
        ))}
      </main>

      {/* Sticky Cart Bar */}
      <div className="cart-footer">
        <p>Subtotal: ${calculateTotal()}</p>
        <div className="cart-buttons">
          <button className="btn btn-primary" onClick={handleOrder}>Order</button>
          <button className="btn btn-secondary" onClick={clearCart}>Clear All</button>
        </div>
      </div>

      {/* Order Modal */}
      {isModalOpen && <OrderModal orderItems={orderDetails} total={calculateTotal()} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default App;
