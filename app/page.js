"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemindata } from "@/features/item/itemSlice";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ItemCard from "@/components/ItemCard";
import ItemCart from "@/components/ItemCart";
export default function Home() {
  const [d, setd] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((json) => {
        setd(json.products);
        dispatch(addItemindata(json.products));
      });
  }, []);
  const data = useSelector((state) => state.item.items);
  function generaterandomnumber() {
    return Math.floor(Math.random() * 10);
  }
  return (
    <>
      <ItemCart/>
      <div className="flex border-t justify-center mt-8">
        <div className="w-1/4 flex justify-center items-center border-r text-l font-medium">
          <ul className="h-[70vh] flex flex-col justify-between">
            <Link href="/shoppingarea/men">Men's Fashion</Link>
            <Link href="/shoppingarea/women">Women's Fashion</Link>
            <Link href="/shoppingarea/medicine">Medicine</Link>
            <Link href="/shoppingarea/smartphones">Smartphones</Link>
            <Link href="/shoppingarea/laptops">Laptops</Link>
            <Link href="/shoppingarea/fragrances">Fragrances</Link>
            <Link href="/shoppingarea/skincare">SkinCare</Link>
            <Link href="/shoppingarea/groceries">Groceries</Link>
            <Link href="/shoppingarea/home-decoration">Home Decoration</Link>
          </ul>
        </div>
        <div className="h-[80vh] flex justify-center items-center mx-auto">
          <img src="/iphone14.jpg" alt="" className="h-[70vh]" />
        </div>
      </div>
      <div className="w-5/6 mx-auto flex flex-col mt-14 gap-6 mb-10">
        <div className="text-red-600">Today's</div>
        <div className="text-5xl font-medium">Flash Sales</div>
        <div className="flex flex-nowrap overflow-x-scroll gap-2 no-scrollbar ">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="w-64">
              <ItemCard product={d[generaterandomnumber()]} />
            </div>
          ))}
        </div>
        <Link href="/shoppingarea" className="flex items-center">
          <Button className="bg-red-500 text-white rounded-none h-12 mx-auto">View All Products</Button>
        </Link>
      </div>
    </>
  );
}
