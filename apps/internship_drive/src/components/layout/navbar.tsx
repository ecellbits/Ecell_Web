"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import {
  Menu,
  X,
  Bell,
  User,
  LogOut,
  LayoutDashboard,
  Briefcase,
  FileText,
  Users,
  Settings,
  Send,
  Building2,
  ChevronDown,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const studentNav: NavItem[] = [
  { label: "Dashboard", href: "/student", icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Browse Listings", href: "/student/listings", icon: <Briefcase className="w-4 h-4" /> },
  { label: "My Applications", href: "/student/applications", icon: <FileText className="w-4 h-4" /> },
  { label: "Profile", href: "/student/profile", icon: <User className="w-4 h-4" /> },
];

const companyNav: NavItem[] = [
  { label: "Dashboard", href: "/company", icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "My Listings", href: "/company/listings", icon: <Briefcase className="w-4 h-4" /> },
  { label: "Profile", href: "/company/profile", icon: <Building2 className="w-4 h-4" /> },
];

const adminNav: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Companies", href: "/admin/companies", icon: <Building2 className="w-4 h-4" /> },
  { label: "Listings", href: "/admin/listings", icon: <Briefcase className="w-4 h-4" /> },
  { label: "Students", href: "/admin/students", icon: <Users className="w-4 h-4" /> },
  { label: "Season", href: "/admin/season", icon: <Settings className="w-4 h-4" /> },
  { label: "Broadcast", href: "/admin/broadcast", icon: <Send className="w-4 h-4" /> },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user, signOut, loading } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    if (!user) return;

    const supabase = createClient();

    // Fetch initial unread count
    const fetchUnread = async () => {
      const { count } = await supabase
        .from("notifications")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("read", false);
      if (count !== null) setUnreadCount(count);
    };

    fetchUnread();

    // Subscribe to new notifications
    const channel = supabase
      .channel("realtime-notifications")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications", filter: `user_id=eq.${user.id}` },
        (payload) => {
          const newNotif = payload.new;
          setUnreadCount((prev) => prev + 1);
          
          if (newNotif.type === "error") {
            toast.error(newNotif.title + ": " + newNotif.body, { duration: 5000 });
          } else if (newNotif.type === "success" || newNotif.type === "approval") {
            toast.success(newNotif.title + ": " + newNotif.body, { duration: 5000 });
          } else {
            toast(newNotif.title + "\n" + newNotif.body, { icon: "🔔", duration: 5000 });
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "notifications", filter: `user_id=eq.${user.id}` },
        (payload) => {
          if (payload.new.read === true && payload.old.read === false) {
            setUnreadCount((prev) => Math.max(0, prev - 1));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const navItems = user?.role === "admin"
    ? adminNav
    : user?.role === "company"
    ? companyNav
    : studentNav;

  const roleLabel = user?.role === "admin"
    ? "Admin Panel"
    : user?.role === "company"
    ? "Company Portal"
    : "Student Portal";

  return (
    <nav className="sticky top-0 z-40 w-full">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-bg-primary/60 backdrop-blur-xl border-b border-border-default" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link href={user ? `/${user.role}` : "/"} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[var(--radius-md)] bg-accent-lime flex items-center justify-center">
              <span className="text-black font-bold text-sm font-[family-name:var(--font-heading)]">
                ID
              </span>
            </div>
            <div className="hidden sm:block">
              <span className="text-sm font-bold text-text-primary font-[family-name:var(--font-heading)]">
                Internship Drive
              </span>
              {user && (
                <span className="block text-[10px] text-text-muted uppercase tracking-wider">
                  {roleLabel}
                </span>
              )}
            </div>
          </Link>

          {/* Desktop Navigation */}
          {user && (
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href ||
                  (item.href !== `/${user.role}` && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-[var(--radius-lg)] text-sm font-medium transition-all duration-200",
                      "font-[family-name:var(--font-ui)]",
                      isActive
                        ? "bg-accent-lime/10 text-accent-lime"
                        : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                    )}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                );
              })}
            </div>
          )}

          {/* Right side */}
          <div className="flex items-center gap-2">
            {user && (
              <>
                {/* Notifications */}
                <Link
                  href={`/${user.role}/notifications`}
                  className="relative p-2 rounded-[var(--radius-lg)] text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-error rounded-full border border-bg-primary"></span>
                  )}
                </Link>

                {/* Profile dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 p-2 rounded-[var(--radius-lg)] text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-accent-purple/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-accent-purple" />
                    </div>
                    <ChevronDown className="w-3 h-3 hidden sm:block" />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-bg-card border border-border-default rounded-[var(--radius-xl)] shadow-[var(--shadow-elevated)] py-2 animate-[slide-down_0.2s_ease-out]">
                      <div className="px-4 py-2 border-b border-border-default">
                        <p className="text-sm font-medium text-text-primary truncate">
                          {user.email}
                        </p>
                        <p className="text-xs text-text-muted capitalize">{user.role}</p>
                      </div>
                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          signOut();
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-error hover:bg-error/5 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {!user && !loading && (
              <div className="hidden sm:flex items-center gap-3">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm">
                    Register
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-[var(--radius-lg)] text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border-default py-4 animate-[slide-down_0.2s_ease-out]">
            {user ? (
              <div className="space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href ||
                    (item.href !== `/${user.role}` && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-[var(--radius-lg)] text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-accent-lime/10 text-accent-lime"
                          : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                      )}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  );
                })}
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    signOut();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-[var(--radius-lg)] text-sm font-medium text-error hover:bg-error/5 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 px-4">
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="md" className="w-full">
                    Log In
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)}>
                  <Button variant="primary" size="md" className="w-full">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
