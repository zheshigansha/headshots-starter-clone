import { AvatarIcon } from "@radix-ui/react-icons";
import { Camera } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ThemeToggle } from "./homepage/theme-toggle";
import ClientSideUser from "./realtime/ClientSideUser";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-[100] w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Camera className="h-5 w-5 text-primary" />
          <span>Headshots AI</span>
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <ClientSideUser />
        </div>
      </div>
    </header>
  );
}
