"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import IcTwotonePlus from "@/components/ui/plus";
import IcTwotoneMinus from "@/components/ui/minus";
import { addItem, removeItem, dropItem } from "@/features/cart/cartSlice";
import { toast } from "sonner";

const page = () => {
  const cartItems = useSelector((state) => state.cart.cartItems).slice(1);
  const cartValue = useSelector((state) => state.cart.cartValue);
  const shippingfee = 0;
  const dispatch = useDispatch();
  function findfinalprice(item) {
    return Math.floor(
      item.price - (item.discountPercentage * item.price) / 100
    );
  }
  const handleCartAddition = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addItem(product));
    toast("Item added successfully", {
      duration: 1000,
      position: "bottom-center",
      style: {
        backgroundColor: "red",
      },
    });
  };
  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
    toast.error("Item Removed SuccessFully", {
      duration: 1000,
      position: "bottom-center",
      style: {
        backgroundColor: "red",
      },
    });
  };
  const handledropItem = (id) => {
    dispatch(dropItem(id));
    toast.error("Item Dropped Successfully", {
      duration: 1000,
      position: "bottom-center",
      style: {
        backgroundColor: "red",
      },
    });
  };
  return (
    <div>
      <Navbar />
      <div className="flex flex-col w-4/5 mx-auto">
        <div className="my-5">Home / Cart</div>
        <ul className="grid grid-cols-4 gap-60 mb-5">
          <li>Product</li>
          <li>Price</li>
          <li>Quantity</li>
          <li>SubTotal</li>
        </ul>
        <div className="flex flex-col gap-5 h-[350px] overflow-y-scroll">
          {cartItems?.map((item) => (
            <Card className="grid grid-cols-4 gap-60 rounded-none">
              <div className="flex items-center">
                <img src={item.details.thumbnail} alt="" className="h-20" />
                {item.details.title}
              </div>
              <div className="flex items-center">{item.details.price}</div>
              <div className="text-green-500 flex gap-4 items-center">
                <IcTwotoneMinus onClick={() => handleRemoveItem(item.id)} />
                <span>{item.quantity}</span>
                <IcTwotonePlus
                  onClick={(e) => handleCartAddition(item.details, e)}
                />
              </div>
              <div className="flex items-center">
                {findfinalprice(item.details)}
              </div>
            </Card>
          ))}
        </div>
        <div className="border-2 p-4 border-black w-96 ml-auto flex flex-col mt-2 gap-1">
          <div className="font-medium text-lg">Cart Total</div>
          <div className="border-b flex">
            Subtotal:<div className="ml-auto">{cartValue}</div>
          </div>
          <div className="border-b flex">
            Shipping:<div className="ml-auto">{shippingfee}</div>
          </div>
          <div className="flex">
            Total :<div className="ml-auto">{cartValue + shippingfee}</div>
          </div>
          <Button>Proceed to Checkout</Button>
        </div>
      </div>
    </div>
  );
};

export default page;
