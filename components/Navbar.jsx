import React from "react";
import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "./ui/button";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div>
      <Menubar className="flex justify-evenly h-12">
        <MenubarMenu className="hover:bg-slate-500">Logo</MenubarMenu>
        <MenubarMenu>
          <Menubar className="flex justify-around w-96 rounded-none h-12">
            <Link href="/">Home</Link>
            <Link href="/shoppingarea">Shopping Area</Link>
            <Link href="/about">About</Link>
            <Link href="/cart">Cart</Link>
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
