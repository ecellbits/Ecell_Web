import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

// Keep-alive endpoint — pings Supabase to prevent free-tier auto-pause
export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("drive_seasons")
      .select("id")
      .limit(1)
      .single();

    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      supabase: error ? "error" : "connected",
    });
  } catch {
    return NextResponse.json(
      { status: "error", timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}
