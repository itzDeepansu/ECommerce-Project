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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { addItem } from "@/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import ItemCart from "@/components/ItemCart";
import { toast } from "sonner";

const page = ({ params }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [input, setinput] = useState("");
  const [search, setSearch] = useState([]);
  useEffect(() => {
    async function getdata() {
      let a = await fetch("https://dummyjson.com/products");
      let b = await a.json();
      setData(b.products.filter((item) => item.category === params.slug));
    }
    getdata();
  }, []);
  useEffect(() => {
    setSearch(data.filter((item) => item.category === params.slug));
  }, [data]);

  const handleChange = (value) => {
    setinput(value);
    setSearch(
      data.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      )
    );
  };
  const handleCartAddition = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addItem(product));
    toast.success("Item Added to Cart", {
      duration: 1000,
      position: "bottom-center",
    });
  };
  const handleCategoryChange = (val) => {
    setSearch(data.filter((item) => item.category === val));
  };
  // if (search.length === 0) {
  //   return (
  //     <div className="flex justify-center items-center text-4xl h-[60vh]">
  //       No Items for {params.slug} category
  //     </div>
  //   );
  // }
  return (
    <div className="w-4/5 gap-6 mx-auto flex flex-col items-center">
      <ItemCart />
      <div className="flex relative w-full justify-center">
        <input
          className="border-2 border-gray-300 bg-white h-10 rounded-lg text-sm focus:outline-none w-96 px-4"
          type="text"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search"
        />
        <DropdownMenu>
          <DropdownMenuTrigger className="absolute right-7">
            Open Categories
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/shoppingarea/smartphones">Smartphones</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/shoppingarea/laptops">Laptops</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/shoppingarea/fragrances">Fragrances</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/shoppingarea/skincare">SkinCare</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/shoppingarea/groceries">Groceries</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/shoppingarea/home-decoration">Home Decoration</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ul className="flex flex-wrap gap-4 justify-evenly">
        {search.map((product) => (
          <li key={product.id}>
            <Link href={`/shoppingarea/items/${product.id}`}>
              <Card className="h-[420px] w-[370px] overflow-hidden flex flex-col relative hover:bg-slate-100 mb-4">
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
