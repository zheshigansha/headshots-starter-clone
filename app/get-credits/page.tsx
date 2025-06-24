// import StripePricingTable from "@/components/stripe/StripeTable";

export const dynamic = "force-dynamic";

export default async function Index() {
  // const supabase = createServerComponentClient({ cookies });

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user) {
  //   return redirect("/login");
  // }

  return (
    <div className="flex flex-1 flex-col w-full items-center justify-center p-8">
      <p className="text-muted-foreground">Payment functionality is temporarily disabled. Please check back later.</p>
    </div>
  );
}
