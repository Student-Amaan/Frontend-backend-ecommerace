import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (!userId) {
      navigate("/");
      return;
    }
    api.get(`/cart/${userId}`).then((res) => setCart(res.data));
    api.get(`/address/${userId}`).then((res) => {
      setAddresses(res.data);
      setSelectedAddress(res.data[0]);
    });
  }, []);

  if (!cart) return <div className="p-6">Loading...</div>;

  const total = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0,
  );

  
    const placeOrder = async () => {
      try {
        if (!selectedAddress) {
          alert("Please select an address");
          return;
        }

        const res = await api.post("/order/place", {
          userId,
          address: selectedAddress,
        });

        console.log(res.data);

        navigate(`/order-success/${res.data.order}`);
        res.status(201).json({
          message: "order placed successfully",
          order: order._id,
        });
      } catch (error) {
        console.log("Order Error:", error.response?.data);
        console.log(error.response?.data?.message || "Order failed");
      }
    };
    
      
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <h2 className="font-semibold mb-2">Select Delivery Address</h2>

      <div className="space-y-3">
        {addresses.map((addr) => (
          <label
            key={addr._id}
            className="block border p-3 rounded cursor-pointer"
          >
            <input
              type="radio"
              name="address"
              checked={selectedAddress?._id === addr._id}
              onChange={() => setSelectedAddress(addr)}
              className="mr-2"
            />
            <strong>{addr.fullName}</strong>
            <p className="text-sm">
              {addr.addressLine}, {addr.city},{addr.state} - {addr.pincode}
            </p>
            <p className="text-sm">📞 {addr.phone}</p>
          </label>
        ))}
      </div>
      <h2 className="font-semibold mt-6 mb-2">Order Summary</h2>
      <p className="text-lg font-bold">Total : ${total}</p>

      <button
        onClick={placeOrder}
        className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Place order
      </button>
    </div>
  );
};

export default CheckOut;
