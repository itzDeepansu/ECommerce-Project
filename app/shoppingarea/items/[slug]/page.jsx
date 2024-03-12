"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { addItem } from "@/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import ItemCart from "@/components/ItemCart";

const page = ({ params }) => {
  const dispatch = useDispatch();
  const [images, setimages] = useState([]);
  const [data, setData] = useState({});
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${params.slug}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setimages(json.images);
      });
  }, []);
  const handleCartAddition = () => {
    dispatch(addItem(data));
  };
  return (
    <div>
      <Navbar />
      <div className="w-4/5 min-h-[89vh] m-auto flex gap-32">
        <div className="h-[89vh] w-4/12">
          <Carousel className="h-[89vh]  flex items-center">
            <CarouselContent>
              {images.map((imagelink) => (
                <CarouselItem key={imagelink}>
                  <img
                    src={imagelink}
                    alt="item picture"
                    className="max-h-[89vh]"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="flex flex-col pt-20 w-8/12 gap-2">
          <div className="text-4xl">{data?.title}</div>
          <div className="text-xl border-b">{data?.description}</div>
          <div className="text-xl ">
            <span className="text-red-500">-{data?.discountPercentage}% </span>
            <span className="text-2xl">
              {"       "}$
              {Math.floor(
                data.price - (data.discountPercentage * data.price) / 100
              )}
            </span>
          </div>
          <div className="text-xl">
            In Stock :<span className="text-green-500">{data?.stock}</span>
          </div>
          <div className="text-xl">Brand:{data?.brand}</div>
          <div className="text-xl">Category:{data?.category}</div>
          <Button
            className="mt-24 h-12 w-28 hover:bg-blue-400"
            variant="outline"
            onClick={handleCartAddition}
          >
            Add To Cart
          </Button>
        </div>
        <ItemCart />
      </div>
    </div>
  );
};

export default page;
