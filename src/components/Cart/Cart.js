import { ShoppingCartIcon } from "@heroicons/react/outline";
import React from "react";

export default function Cart({ user }) {
  return (
    <div className="w-8 h-8 cursor-pointer relative">
      <ShoppingCartIcon />
      {user.tickets.length > 0 && (
        <div className="absolute -top-2 -right-1 font-semibold h-4 w-4 rounded-full border-red-500 bg-blue-400 text-center text-xs">
          {user?.tickets.length}
        </div>
      )}
    </div>
  );
}
