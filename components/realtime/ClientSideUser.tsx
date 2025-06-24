"use client";

import { AvatarIcon } from "@radix-ui/react-icons";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Database } from "../../types/supabase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import ClientSideCredits from "./ClientSideCredits";
import { User } from "@supabase/supabase-js";

const cremIsConfigured = process.env.NEXT_PUBLIC_CREEM_IS_ENABLED === "true";
const packsIsEnabled = process.env.NEXT_PUBLIC_TUNE_TYPE === "packs";

export default function ClientSideUser() {
  const [user, setUser] = useState<User | null>(null);
  const [credits, setCredits] = useState<
    {
      id: number;
      user_id: string;
      credits: number;
      created_at: string;
    }[]
  >([]);
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  useEffect(() => {
    if (user) {
      const getCredits = async () => {
        const { data: credits } = await supabase
          .from("credits")
          .select("*")
          .eq("user_id", user?.id ?? "");
        if (credits) {
          setCredits(credits);
        }
      };
      getCredits();
    }
  }, [user, supabase]);

  if (!user) {
    return (
      <>
        <Link
          href="/login"
          className="hidden sm:block text-sm font-medium hover:text-primary transition-colors"
        >
          Login
        </Link>
        <Link href="/login">
          <Button>Create headshots</Button>
        </Link>
      </>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <nav className="hidden md:flex gap-6">
        <Link
          href="/overview"
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          Home
        </Link>
        {packsIsEnabled && (
          <Link
            href="/overview/packs"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Packs
          </Link>
        )}
        {cremIsConfigured && (
          <Link
            href="/get-credits"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Get Credits
          </Link>
        )}
      </nav>

      {cremIsConfigured && credits[0] && (
        <ClientSideCredits creditsRow={credits[0]} />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            <AvatarIcon className="h-6 w-6 text-primary" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 z-[101]">
          <DropdownMenuLabel className="text-primary text-center overflow-hidden text-ellipsis">
            {user.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <form action="/auth/sign-out" method="post">
            <Button
              type="submit"
              className="w-full text-left"
              variant="ghost"
            >
              Log out
            </Button>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
} 