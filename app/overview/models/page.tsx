import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ModelsTable from "@/components/ModelsTable";
import { Database } from "@/types/supabase";
import { modelRowWithSamples } from "@/types/utils";

export const dynamic = "force-dynamic";

export default async function Models() {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>Not logged in</div>;
  }

  const { data: models, error } = await supabase
    .from("models")
    .select(
      `
      id,
      name,
      type,
      status,
      samples (
        id,
        uri
      )
    `
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching models:", error);
    return <div>Error loading models.</div>;
  }

  return <ModelsTable models={models as modelRowWithSamples[]} />;
} 