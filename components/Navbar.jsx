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
import ItemCart from "./ItemCart";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  return (
    <div className="mb-4">
      <Menubar className="flex justify-around">
        <MenubarMenu>Logo</MenubarMenu>
        <MenubarMenu>
          <Menubar className="flex justify-around w-96 rounded-none">
            <Link href="/">Home</Link>
            <Link href="/shoppingarea">Shopping Area</Link>
            <Link href="/about">About</Link>
          </Menubar>
        </MenubarMenu>
        <MenubarMenu>
          <Sheet>
            <SheetTrigger>Cart</SheetTrigger>
          </Sheet>
          </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default Navbar;
