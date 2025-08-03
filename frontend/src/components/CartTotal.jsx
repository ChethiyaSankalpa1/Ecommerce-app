import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title"; // ✅ Added import for Title

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <Title text1={"CART"} text2={" TOTAL"} />
      <div className="space-y-4 mt-4 text-sm text-gray-700">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency}
            {subtotal}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping fee</p>
          <p>
            {currency}
            {delivery_fee}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between font-semibold text-lg">
          <b>Total</b>
          <b>
            {currency}
            {total}.00
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
