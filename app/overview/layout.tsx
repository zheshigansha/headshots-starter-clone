import Login from "../login/page";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Navbar from '@/components/Navbar';

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <Login />;
  }

  // Updated to ensure compatibility with new layout
  return (
    <body className="min-h-screen bg-background">
      <Navbar />
      <div className="flex w-full flex-col px-4 lg:px-40 py-6">
        {children}
      </div>
    </body>
  );
}
