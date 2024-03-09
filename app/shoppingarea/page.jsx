"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { addItem, removeItem } from "@/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import ItemCart from "@/components/ItemCart";
import { toast } from "sonner"

const page = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const cartItemsList = useSelector((state) => state.cartItems);
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((json) => setData(json.products));
  }, []);
  const handleCartAddition = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addItem(product));
    toast.success("Item Added to Cart",{duration:1000 , position:"bottom-center"})
  };
  return (
    <div className="w-4/5 m-auto">
      <ItemCart />
      <ul className="flex flex-wrap gap-4">
        {data.map((product) => (
          <li key={product.id}>
            <Link href={`/shoppingarea/items/${product.id}`}>
              <Card className="h-[420px] w-[370px] overflow-hidden flex flex-col relative hover:bg-slate-100">
                <CardHeader>
                  <img src={product.thumbnail} alt="" className="h-[200px]" />
                  <CardTitle>{product.title}</CardTitle>
                </CardHeader>
                <CardContent className="h-10 overflow-hidden">
                  <CardDescription>{product.description}</CardDescription>
                </CardContent>
                <CardFooter className="absolute bottom-0">
                  <div>${product.price}</div>
                  <Button
                    className="ml-40 hover:bg-blue-400"
                    variant="outline"
                    onClick={(e) => handleCartAddition(product, e)}
                  >
                    Add To Cart
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default page;
