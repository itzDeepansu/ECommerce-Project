import React from "react";
import Link from "next/link";
import {
  Menubar,
  MenubarMenu,
} from "@/components/ui/menubar";
import { Button } from "./ui/button";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div>
      <Menubar className="flex justify-evenly h-12">
        <MenubarMenu className="hover:bg-slate-500">Logo</MenubarMenu>
        <MenubarMenu>
          <Menubar className="flex justify-around w-96 rounded-none h-12 ">
            <Link href="/" className="hover:bg-orange-400 p-2 rounded-md">Home</Link>
            <Link href="/shoppingarea" className="hover:bg-orange-400 p-2 rounded ">Shopping Area</Link>
            <Link href="/about" className="hover:bg-orange-400 p-2 rounded ">About</Link>
            <Link href="/cart" className="hover:bg-orange-400 p-2 rounded ">Cart</Link>
          </Menubar>
        </MenubarMenu>
        <MenubarMenu>
          <div className="flex gap-10">
            <Button variant="outline" className="h-10">
              Github Repo
            </Button>
            <div className="absolute right-5 flex justify-start items-center">
              <UserButton />
            </div>
          </div>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default Navbar;
