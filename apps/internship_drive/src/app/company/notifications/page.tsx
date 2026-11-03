import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { getTimeAgo } from "@/lib/utils";
import { Bell, CheckCircle, Info, AlertTriangle, XCircle, Briefcase, Calendar, Megaphone } from "lucide-react";
import { CompanyMarkReadButton } from "./mark-read-button";

const typeIcons: Record<string, React.ReactNode> = {
  info: <Info className="w-4 h-4 text-info" />,
  success: <CheckCircle className="w-4 h-4 text-success" />,
  warning: <AlertTriangle className="w-4 h-4 text-warning" />,
  error: <XCircle className="w-4 h-4 text-error" />,
  application: <Briefcase className="w-4 h-4 text-accent-purple" />,
  interview: <Calendar className="w-4 h-4 text-warning" />,
  approval: <CheckCircle className="w-4 h-4 text-success" />,
  broadcast: <Megaphone className="w-4 h-4 text-accent-lime" />,
};

export default async function CompanyNotificationsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: notifications } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50);

  const items = notifications || [];
  const unreadCount = items.filter((n) => !n.is_read).length;

  return (
    <div className="animate-[fade-in_0.3s_ease-out,slide-up_0.3s_ease-out] max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Notifications</h1>
          <p className="text-text-secondary text-sm mt-1">{unreadCount > 0 ? `${unreadCount} unread` : "All caught up!"}</p>
        </div>
        {unreadCount > 0 && <CompanyMarkReadButton />}
      </div>

      {items.length === 0 ? (
        <Card variant="outlined" padding="lg" className="text-center py-16">
          <Bell className="w-10 h-10 text-text-muted mx-auto mb-3" />
          <p className="text-sm text-text-secondary">No notifications yet</p>
        </Card>
      ) : (
        <div className="space-y-2">
          {items.map((notif) => (
            <Card key={notif.id} variant="solid" padding="md" className={notif.is_read ? "opacity-60" : "border-l-2 border-l-accent-purple"}>
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{typeIcons[notif.type] || typeIcons.info}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary">{notif.title}</p>
                  {notif.body && <p className="text-xs text-text-secondary mt-1">{notif.body}</p>}
                  <p className="text-xs text-text-muted mt-1.5">{getTimeAgo(notif.created_at)}</p>
                </div>
                {!notif.is_read && <span className="w-2 h-2 rounded-full bg-accent-purple shrink-0 mt-1.5" />}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
