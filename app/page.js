"use client"
import React , {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemindata } from "@/features/item/itemSlice";
import Link from "next/link";
export default function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
      fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((json) => {
          dispatch(addItemindata(json.products))
        });
    }, []);
    const data = useSelector((state)=> state.item.items)
  return (
    <div className="flex border-t justify-center mt-8">
      <div className="w-1/4 flex justify-center items-center border-r text-l font-medium">
        <ul className="h-[70vh] flex flex-col justify-between">
          <li>Men's Fashion</li>
          <li>Women's Fashion</li>
          <li>Medicine</li>
          <li>Smartphones</li>
          <li>Laptops</li>
          <li>Fragrances</li>
          <li>Skincare</li>
          <li>Groceries</li>
          <li>Home-Decoration</li>
        </ul>
      </div>
      <div className="h-[80vh] flex justify-center items-center mx-auto">
        <img src="/iphone14.jpg" alt="" className="h-[70vh]" />
      </div>
    </div>
  );
}
