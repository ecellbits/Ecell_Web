import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Users, GraduationCap, Eye, FileText } from "lucide-react";

export default async function AdminStudentsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profiles } = await supabase
    .from("student_profiles")
    .select("*, user:users(email, is_active)")
    .order("created_at", { ascending: false });

  const items = profiles || [];

  return (
    <div className="animate-[fade-in_0.3s_ease-out,slide-up_0.3s_ease-out] space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Student Directory</h1>
        <p className="text-text-secondary text-sm mt-1">{items.length} registered students</p>
      </div>

      {items.length === 0 ? (
        <Card variant="outlined" padding="lg" className="text-center py-16">
          <Users className="w-10 h-10 text-text-muted mx-auto mb-3" />
          <p className="text-sm text-text-secondary">No students registered yet.</p>
        </Card>
      ) : (
        <div className="space-y-2">
          {items.map((profile: any) => (
            <Card key={profile.id} variant="solid" padding="md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-accent-lime/10 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-accent-lime">
                      {(profile.full_name || "?")[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-text-primary text-sm truncate">
                      {profile.full_name || "Unnamed"}
                    </p>
                    <p className="text-xs text-text-muted truncate">
                      {profile.user?.email} • {profile.college_name || "No college"} • {profile.branch || "No branch"} • {profile.graduation_year || "—"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {(profile.skills || []).slice(0, 3).map((skill: string) => (
                    <Badge key={skill} variant="default" className="text-[10px]">{skill}</Badge>
                  ))}
                  {profile.profile_complete ? (
                    <Badge variant="success">Complete</Badge>
                  ) : (
                    <Badge variant="warning">Incomplete</Badge>
                  )}
                  {profile.resume_url && (
                    <a href={profile.resume_url} target="_blank" rel="noopener noreferrer" className="text-accent-lime hover:text-accent-lime-hover">
                      <FileText className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
