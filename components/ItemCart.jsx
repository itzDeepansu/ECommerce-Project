"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import MdiCart from "@/components/ui/cart";
import { addItem, removeItem, dropItem } from "@/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";
import PajamasRemove from "@/components/ui/remove";
import IcTwotonePlus from "@/components/ui/plus";
import IcTwotoneMinus from "./ui/minus";
import { toast } from "sonner";

const ItemCart = () => {
  const dispatch = useDispatch();
  const cartItemsList = useSelector((state) => state.cart.cartItems);
  const totalprice = useSelector((state) => state.cart.cartValue);
  function findfinalprice(item) {
    return Math.floor(
      item.price - (item.discountPercentage * item.price) / 100
    );
  }
  const handleCartAddition = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addItem(product));
  };
  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
    toast.error("Item Removed SuccessFully", {
      duration: 1000,
      position: "bottom-center",
      style:{
        backgroundColor:"red"
      }
    });
  };
  const handledropItem = (id) => {
    dispatch(dropItem(id));
    toast.error("Item Dropped Successfully", {
      duration: 1000,
      position: "bottom-center",
      style:{
        backgroundColor:"red",
      },
    });
  };
  return (
    <div>
      <Sheet>
        <SheetTrigger className="bg-slate-400 fixed right-4 bottom-4 rounded-full h-16 w-16 flex items-center justify-center">
          <MdiCart />
        </SheetTrigger>
        <SheetContent className="p-2">
          <SheetHeader className="mb-4">
            <SheetTitle>Your Cart :</SheetTitle>
            <SheetDescription>
              It contains all the items that you want to buy
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[80vh] rounded-md border px-3">
            {cartItemsList?.length == 1 && (
              <div className="mt-4">Your Cart is Empty</div>
            )}
            {cartItemsList?.slice(1).map((item) => (
              <Card key={item.id} className="mt-4">
                <CardHeader className="flex flex-row gap-4 items-center">
                  <img
                    src={item.details.thumbnail}
                    alt=""
                    className="h-14 w-14"
                  />
                  <CardTitle className="flex flex-col text-sm">
                    {item.details.title}
                    <CardDescription>
                      {item.details.stock > 0 ? (
                        <div className="text-green-500 flex gap-4">
                          In stock
                          <IcTwotoneMinus
                            onClick={() => handleRemoveItem(item.id)}
                          />
                          <span>{item.quantity}</span>
                          <IcTwotonePlus
                            onClick={(e) => handleCartAddition(item.details, e)}
                          />
                        </div>
                      ) : (
                        <div className="text-red-500">Out of Stock</div>
                      )}
                    </CardDescription>
                    <div>${findfinalprice(item.details)}</div>
                  </CardTitle>
                  <Button
                    className="ml-auto h-full"
                    onClick={() => handledropItem(item.id)}
                  >
                    <PajamasRemove />
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </ScrollArea>
          <div className="pt-4">
            <SheetTitle>Total Price :{totalprice}</SheetTitle>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ItemCart;
