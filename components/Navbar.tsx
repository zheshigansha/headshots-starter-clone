"use client";

import { AvatarIcon } from "@radix-ui/react-icons";
import { Camera } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ThemeToggle } from "./homepage/theme-toggle";
import ClientSideUser from "./realtime/ClientSideUser";
import { Button } from "./ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import { useI18n } from "@/lib/i18n";

export default function Navbar() {
  const { t } = useI18n();
  
  return (
    <header className="sticky top-0 z-[100] w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Camera className="h-5 w-5 text-primary" />
          <span translate="no">{t('nav.brand')}</span>
        </Link>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <ThemeToggle />
          <ClientSideUser />
        </div>
      </div>
    </header>
  );
}
