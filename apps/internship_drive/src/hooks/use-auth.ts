"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@/types/database";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [authUser, setAuthUser] = useState<{ id: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      try {
        const { data: { user: authData } } = await supabase.auth.getUser();
        if (authData) {
          setAuthUser({ id: authData.id, email: authData.email! });
          const { data: userData } = await supabase
            .from("users")
            .select("*")
            .eq("id", authData.id)
            .single();
          if (userData) setUser(userData as User);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    }
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setAuthUser({ id: session.user.id, email: session.user.email! });
          const { data: userData } = await supabase
            .from("users")
            .select("*")
            .eq("id", session.user.id)
            .single();
          if (userData) setUser(userData as User);
        } else {
          setUser(null);
          setAuthUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setAuthUser(null);
    window.location.href = "/login";
  };

  return { user, authUser, loading, signOut, supabase };
}
